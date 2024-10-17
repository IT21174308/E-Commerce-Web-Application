
using System;
using System.ComponentModel.DataAnnotations;
using Ecommerce.Enums;

namespace Ecommerce.DTOs
{
    public class LoginResponseDto
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public UserRole Role { get; set; }

    }
}