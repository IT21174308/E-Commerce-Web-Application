import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.mobile.platform.R
import com.mobile.platform.ui.ProductDetailActivity

//import com.mobile.platform.ui.ProductDetailActivity

class ProductsAdapter(private val productList: List<Product>, private val context: Context) : RecyclerView.Adapter<ProductsAdapter.ProductViewHolder>() {

    class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val imageView: ImageView = itemView.findViewById(R.id.product_image)
        val titleView: TextView = itemView.findViewById(R.id.product_title)
        val priceView: TextView = itemView.findViewById(R.id.product_price)
        val categoryView: TextView = itemView.findViewById(R.id.product_category)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_item, parent, false)
        return ProductViewHolder(view)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = productList[position]
        holder.titleView.text = product.title
        holder.priceView.text = product.price.toString()
        holder.categoryView.text = product.category

        Glide.with(holder.itemView.context)
            .load("https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg")
            .into(holder.imageView)

        // Set click listener to navigate to ProductDetailActivity
        holder.itemView.setOnClickListener {
            val intent = Intent(context, ProductDetailActivity::class.java)
            intent.putExtra("productId", product.id)  // Pass the product ID
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int {
        return productList.size
    }
}


