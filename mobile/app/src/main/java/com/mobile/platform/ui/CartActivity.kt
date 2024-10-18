package com.mobile.platform.ui

import CartAdapter
import Product
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.mobile.platform.R
import com.mobile.platform.api.CartResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CartActivity : BaseActivity() {

    private lateinit var cartAdapter: CartAdapter
    private lateinit var recyclerView: RecyclerView
    private lateinit var totalPriceTextView: TextView
    private lateinit var checkoutButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cart)

        recyclerView = findViewById(R.id.recyclerView)
        totalPriceTextView = findViewById(R.id.totalPriceTextView)
        checkoutButton = findViewById(R.id.checkoutButton)

        // Get userId from SharedPreferences
        val sharedPref = getSharedPreferences("user_prefs", MODE_PRIVATE)
//        val userId = sharedPref.getString("id", "")
        val userId = "6"

        if (userId != null) {
            fetchCartItems(userId)
        }

        checkoutButton.setOnClickListener {
            Toast.makeText(this, "Proceeding to Checkout", Toast.LENGTH_SHORT).show()
            // Handle checkout logic here
        }
    }

//    private fun fetchCartItems(userId: String) {

    private fun fetchCartItems(userId: String) {
        RetrofitClient.apiService.getCartsByUserId(userId).enqueue(object : Callback<CartResponse> {
            override fun onResponse(call: Call<CartResponse>, response: Response<CartResponse>) {
                if (response.isSuccessful) {
                    val cartResponse = response.body()
                    cartResponse?.carts?.let { carts ->
                        val products = carts.flatMap { it.products }
                        displayCartItems(products)
                        calculateTotal(products)
                    }
                }
            }

            override fun onFailure(call: Call<CartResponse>, t: Throwable) {
                // Handle failure
                Toast.makeText(this@CartActivity, "Failed to fetch cart items", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun displayCartItems(products: List<Product>) {
        cartAdapter = CartAdapter(products)
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = cartAdapter
    }

    private fun calculateTotal(products: List<Product>) {
        var totalPrice = 0.0
        for (product in products) {
            totalPrice += product.price
        }
//        totalPriceTextView.text = "Total: $totalPrice"

        totalPriceTextView.text = "Total: $totalPrice"
    }
}