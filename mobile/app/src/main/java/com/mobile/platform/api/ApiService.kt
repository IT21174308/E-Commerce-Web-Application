import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

// Retrofit API interface
interface ApiService {
    @POST("/auth/login")
    fun login(@Body loginRequest: LoginRequest): Call<LoginResponse>
}
