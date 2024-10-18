package com.mobile.platform.ui

import Product
import android.annotation.SuppressLint
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.mobile.platform.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProductDetailActivity : BaseActivity()  {

    private lateinit var productImageView: ImageView
    private lateinit var productTitleView: TextView
    private lateinit var productCategoryView: TextView
    private lateinit var productPriceView: TextView
    private lateinit var addToCartButton: Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_detail)

        productImageView = findViewById(R.id.product_detail_image)
        productTitleView = findViewById(R.id.product_detail_title)
        productCategoryView = findViewById(R.id.product_detail_category)
        productPriceView = findViewById(R.id.product_detail_price)
        addToCartButton = findViewById(R.id.add_to_cart_button)

        val productId = intent.getIntExtra("productId", -1)  // Retrieve productId

        if (productId != -1) {
            fetchProductDetails(productId)
        }

        addToCartButton.setOnClickListener {
            // Do nothing for now
            Toast.makeText(this, "Add to Cart button clicked", Toast.LENGTH_SHORT).show()
        }
    }

    private fun fetchProductDetails(productId: Int) {
        val call = RetrofitClient.apiService.getProductById(productId)

        call.enqueue(object : Callback<Product> {
            override fun onResponse(call: Call<Product>, response: Response<Product>) {
                if (response.isSuccessful) {
                    val product = response.body()
                    product?.let {
                        productTitleView.text = it.title
                        productCategoryView.text = it.category
                        productPriceView.text = it.price.toString()

                        Glide.with(this@ProductDetailActivity)
                            .load("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg")
                            .into(productImageView)
                    }
                }
            }

            override fun onFailure(call: Call<Product>, t: Throwable) {
                Toast.makeText(this@ProductDetailActivity, "Failed to load product details", Toast.LENGTH_SHORT).show()
            }
        })
    }
}
