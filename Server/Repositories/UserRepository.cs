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
        private readonly IMongoCollection<User> _users;

        public UserRepository(UserManager<User> userManager, SignInManager<User> signInManager, IMongoDatabase database)
        {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._users = database.GetCollection<User>("Users");
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
       
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _users.Find(_ => true).ToListAsync(); // Get all users from MongoDB
        }

        public async Task UpdateUserAsync(User user)
        {
            // Update the user document in the MongoDB collection
            await _users.ReplaceOneAsync(u => u.Id == user.Id, user);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            // Find a user by their email
            return await _users.Find(user => user.Email == email).FirstOrDefaultAsync();
        }

    }
}
