using System;
using Ecommerce.DTOs;
using Ecommerce.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Ecommerce.Models;



namespace Ecommerce.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO)
        {
            Console.WriteLine(userRegisterDTO.Email);
            var user = new Models.User
            {
                FirstName = userRegisterDTO.FirstName,
                LastName = userRegisterDTO.LastName,
                UserName = userRegisterDTO.Email,
                Mobile = userRegisterDTO.Mobile,
                Email = userRegisterDTO.Email
            };

            return await _userRepository.CreateUserAsync(user, userRegisterDTO.Password);
        }

        public async Task<string> Login(UserLoginDTO userLoginDTO)
        {
            User user = await _userRepository.FindByEmailAsync(userLoginDTO.Email);

            if (user != null && await _userRepository.CheckPasswordAsync(user, userLoginDTO.Password))
            {
                return GenerateJwtToken(user);
            }

            return null;
        }


        public async Task Logout()
        {
            await _userRepository.Logout();
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}