using Ecommerce.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Interfaces
{
    public interface IAuthService
    {
        Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO);
        Task<LoginResponseDto> Login(UserLoginDTO userLoginDTO);

        Task Logout();
    }
}
