import com.mobile.platform.api.CartResponse
import com.mobile.platform.api.ProductsResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

// Retrofit API interface
interface ApiService {

    @POST("/auth/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>

    @GET("/products")
    fun getProducts(): Call<ProductsResponse>

    @GET("/products/{id}")
    fun getProductById(@Path("id") id: Int): Call<Product>

    @GET("/users/{id}/carts")
    fun getCartsByUserId(@Path("id") userId: String): Call<CartResponse>

    // Fetch details of a single user by ID
    @GET("/users/{id}")
    fun getUserDetails(@Path("id") userId: String): Call<UserDetailsResponse>



}
