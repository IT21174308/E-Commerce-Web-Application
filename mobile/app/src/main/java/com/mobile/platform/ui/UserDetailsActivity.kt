package com.mobile.platform.ui

import UserDetailsResponse
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.mobile.platform.R
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class UserDetailsActivity : BaseActivity()  {

    private lateinit var userNameTextView: TextView
    private lateinit var userEmailTextView: TextView
    private lateinit var userPhoneTextView: TextView
    private lateinit var logoutButton: Button

    private lateinit var sharedPref: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_details)

        // Initialize Views
        userNameTextView = findViewById(R.id.userNameTextView)
        userEmailTextView = findViewById(R.id.userEmailTextView)
        userPhoneTextView = findViewById(R.id.userPhoneTextView)
        logoutButton = findViewById(R.id.logoutButton)

        // Initialize SharedPreferences
        sharedPref = getSharedPreferences("user_prefs", MODE_PRIVATE)

        // Fetch user details
        val userId = sharedPref.getString("id", "0") // Get user ID from SharedPreferences
        if (userId != null) {
            fetchUserDetails(userId)
        }

        // Set logout button click listener
        logoutButton.setOnClickListener {
            logout()
        }
    }

    private fun fetchUserDetails(userId: String) {
        val call = RetrofitClient.apiService.getUserDetails(userId)

        call.enqueue(object : Callback<UserDetailsResponse> {
            override fun onResponse(call: Call<UserDetailsResponse>, response: Response<UserDetailsResponse>) {
                if (response.isSuccessful) {
                    val userDetails = response.body()
                    if (userDetails != null) {
                        // Set user details to TextViews
                        userNameTextView.text = "${userDetails.firstName} ${userDetails.lastName}"
                        userEmailTextView.text = userDetails.email
                        userPhoneTextView.text = userDetails.phone
                    } else {
                        Toast.makeText(this@UserDetailsActivity, "User details not found", Toast.LENGTH_SHORT).show()
                    }
                } else {
                    Toast.makeText(this@UserDetailsActivity, "Failed to fetch user details", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<UserDetailsResponse>, t: Throwable) {
                Toast.makeText(this@UserDetailsActivity, "Network error: ${t.message}", Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun logout() {
        val editor = sharedPref.edit()
        editor.clear() // Clear all stored values
        editor.apply() // Save changes asynchronously

        // Redirect to login activity or another screen
        val intent = Intent(this, LoginActivity::class.java) // Change to your login activity
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK // Clear the activity stack
        startActivity(intent)
        finish() // Finish current activity
    }
}
