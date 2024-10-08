using Ecommerce.Interfaces;
using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;

//User Repository
namespace Ecommerce.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public UserRepository(UserManager<User> userManager,SignInManager<User> signInManager)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
        }

        public async Task<IdentityResult> CreateUserAsync(User user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }

        public async Task<User> FindByEmailAsync(string email){
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<bool> CheckPasswordAsync(User user, string password)
        {   
            SignInResult result = await _signInManager.PasswordSignInAsync(user,password,false,false);
            
            if(result.Succeeded) return true;

            return false;
        }
         public async Task Logout()
        {   
          await _signInManager.SignOutAsync();
            
        }
       
 
    }
}
