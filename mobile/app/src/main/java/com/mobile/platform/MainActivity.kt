package com.mobile.platform

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.mobile.platform.ui.BaseActivity
import com.mobile.platform.ui.HomeActivity
import com.mobile.platform.ui.LoginActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Check if user is logged in
        val sharedPref = getSharedPreferences("user_prefs", MODE_PRIVATE)
        val id = sharedPref.getString("id", null)

        if (id != null) {
            // User is already logged in, redirect to HomeActivity or BaseActivity
            val intent = Intent(this, HomeActivity::class.java) // or HomeActivity
            startActivity(intent)
            finish() // Prevent going back to MainActivity
        } else {
            // User is not logged in, show LoginActivity
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
            finish() // Close MainActivity to avoid going back here
        }
    }
}
