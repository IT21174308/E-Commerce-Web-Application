using Ecommerce.Enums;
using System.Collections.Generic;

namespace Ecommerce.DTOs
{
    public class UserDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
        
        public List<string> Permissions { get; set; }

        public UserRole Role { get; set; }
    }
}
