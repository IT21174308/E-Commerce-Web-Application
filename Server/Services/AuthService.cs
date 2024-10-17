using System;
using Ecommerce.DTOs;
using Ecommerce.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Ecommerce.Models;
using Ecommerce.Repositories;
using Ecommerce.Enums;


namespace Ecommerce.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IRoleRepository _roleRepository;

        public AuthService(IUserRepository userRepository, IConfiguration configuration, IRoleRepository roleRepository)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _roleRepository = roleRepository;
        }

        // User Register Service
        public async Task<IdentityResult> Register(UserRegisterDTO userRegisterDTO)
        {
            Console.WriteLine(userRegisterDTO.Email);

            var userRole = await _roleRepository.GetRoleByNameAsync(userRegisterDTO.Role.ToString());

            if (userRole == null)
            {
                throw new Exception("Role not found.");
            }
            var user = new Models.User
            {
                FirstName = userRegisterDTO.FirstName,
                LastName = userRegisterDTO.LastName,
                UserName = userRegisterDTO.Email,
                Mobile = userRegisterDTO.Mobile,
                Email = userRegisterDTO.Email,
                Role = userRole,
            };

            return await _userRepository.CreateUserAsync(user, userRegisterDTO.Password);
        }


        // User Login Service
        public async Task<LoginResponseDto> Login(UserLoginDTO userLoginDTO)
        {
            LoginResponseDto loginResponseDto = new LoginResponseDto();
            User user = await _userRepository.FindByEmailAsync(userLoginDTO.Email);

            if (user != null && await _userRepository.CheckPasswordAsync(user, userLoginDTO.Password))
            {
                // Generate JWT Token
                loginResponseDto.Token = GenerateJwtToken(user);
            }

            // Set user role
            if (Enum.TryParse<UserRole>(user.Role.ToString(), out var userRole))
            {
                loginResponseDto.Role = userRole;
            }
            else
            {
                throw new Exception("Invalid role type.");
            }

            return loginResponseDto;
        }


        public async Task Logout()
        {
            await _userRepository.Logout();
        }


        // Generate JWT Token with user id and email
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

        public async Task<List<User>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();

            foreach (var user in users)
            {
                if (user.Role != null)
                {
                    var role = await _roleRepository.GetRoleByNameAsync(UserRole.Admin.ToString());
                    if (role != null)
                    {
                        user.Role = role; // Set the complex role object
                        await _userRepository.UpdateUserAsync(user); // Update the user document
                    }
                }
            }
            return await _userRepository.GetAllUsersAsync();
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            return user;
        }
    }
}