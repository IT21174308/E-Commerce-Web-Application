using Ecommerce.DTOs;
using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO);
        Task<LoginResponseDto> Login(UserLoginDTO userLoginDTO);

        Task Logout();

        Task<List<User>> GetAllUsersAsync();

        Task<User> GetUserByEmailAsync(string email);
    }
}
