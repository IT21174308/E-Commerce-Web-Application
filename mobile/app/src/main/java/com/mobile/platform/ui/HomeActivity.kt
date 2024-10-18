package com.mobile.platform.ui

import Product
import ProductsAdapter
import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.SearchView
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.mobile.platform.R
import com.mobile.platform.api.ProductsResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeActivity : BaseActivity()  {

    private lateinit var productsAdapter: ProductsAdapter
    private lateinit var recyclerView: RecyclerView
    private lateinit var searchView: SearchView
    private lateinit var categorySpinner: Spinner

    private var allProducts: List<Product> = listOf()  // To store the original list of products
    private var filteredProducts: List<Product> = listOf()  // To store filtered list

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        recyclerView = findViewById(R.id.recycler_view)
        searchView = findViewById(R.id.search_view)
        categorySpinner = findViewById(R.id.category_spinner)

        recyclerView.layoutManager = LinearLayoutManager(this)

        fetchProducts()

        setupSearchView()
        setupCategorySpinner()
    }

    private fun fetchProducts() {
        val call = RetrofitClient.apiService.getProducts()

        call.enqueue(object : Callback<ProductsResponse> {
            override fun onResponse(call: Call<ProductsResponse>, response: Response<ProductsResponse>) {
                if (response.isSuccessful) {
                    allProducts = response.body()?.products ?: emptyList()
                    filteredProducts = allProducts  // Initially set filteredProducts as allProducts
                    productsAdapter = ProductsAdapter(filteredProducts, this@HomeActivity)  // Pass context
                    recyclerView.adapter = productsAdapter
                }
            }

            override fun onFailure(call: Call<ProductsResponse>, t: Throwable) {
                Toast.makeText(this@HomeActivity, "Failed to load products", Toast.LENGTH_SHORT).show()
            }
        })
    }

    // Set up search functionality
    private fun setupSearchView() {
        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String?): Boolean {
                return false
            }

            override fun onQueryTextChange(newText: String?): Boolean {
                filterProducts(newText, categorySpinner.selectedItem.toString())
                return true
            }
        })
    }

    // Set up category filtering
    private fun setupCategorySpinner() {
        categorySpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
                filterProducts(searchView.query.toString(), categorySpinner.selectedItem.toString())
            }

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }
    }

    // Filter products based on search text and selected category
    private fun filterProducts(query: String?, category: String) {
        var filteredList = allProducts

        // Filter by search query
        if (!query.isNullOrEmpty()) {
            filteredList = filteredList.filter {
                it.title.contains(query, ignoreCase = true)
            }
        }

        // Filter by category
        if (category != "All Categories") {
            filteredList = filteredList.filter {
                it.category.equals(category, ignoreCase = true)
            }
        }

        // Update the filtered list in the adapter
        filteredProducts = filteredList
        productsAdapter = ProductsAdapter(filteredProducts, this@HomeActivity)  // Pass context
        recyclerView.adapter = productsAdapter
    }
}
