using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityResult> CreateUserAsync(User user, string password);
        
        Task<User> FindByEmailAsync(string email);
        Task<bool> CheckPasswordAsync(User user, string password);
        Task Logout();
    }
}
