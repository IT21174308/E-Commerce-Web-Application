package com.mobile.platform.ui

import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.ecommerceapp.ProductAdapter
import com.mobile.platform.R
import com.mobile.platform.api.Product
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class HomeActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var productAdapter: ProductAdapter
    private val productList = ArrayList<Product>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        recyclerView = findViewById(R.id.recyclerView)
        productAdapter = ProductAdapter(this, productList)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = productAdapter

        fetchProducts()
    }

    @SuppressLint("NotifyDataSetChanged")
    private fun fetchProducts() {
        val url = "https://dummyjson.com/products"

        val queue: RequestQueue = Volley.newRequestQueue(this)
        val jsonObjectRequest = JsonObjectRequest(
            Request.Method.GET, url, null,
            { response ->
                try {
                    val products: JSONArray = response.getJSONArray("products")
                    for (i in 0 until products.length()) {
                        val product: JSONObject = products.getJSONObject(i)
                        val image = product.getString("imglink")
                        val title = product.getString("title")
                        productList.add(Product(image, title))
                    }
                    productAdapter.notifyDataSetChanged()
                } catch (e: JSONException) {
                    Toast.makeText(this, "Error parsing JSON", Toast.LENGTH_SHORT).show()
                }
            },
            { error: VolleyError ->
                Toast.makeText(this, "Error fetching data", Toast.LENGTH_SHORT).show()
            }
        )

        queue.add(jsonObjectRequest)
    }
}
