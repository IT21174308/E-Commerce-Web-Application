using System;
using System.ComponentModel.DataAnnotations;
using Ecommerce.Enums;

namespace Ecommerce.DTOs
{
    public class UserRegisterDTO
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Mobile { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public UserRole Role { get; set; }

    }
}