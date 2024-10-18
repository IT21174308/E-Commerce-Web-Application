using AspNetCore.Identity.MongoDbCore.Models;
using Ecommerce.Enums;
using Microsoft.AspNetCore.Identity;
using MongoDbGenericRepository.Attributes;
using System;

namespace Ecommerce.Models
{
    [CollectionName("Users")]
    public class User : MongoIdentityUser<Guid>
    {
        [PersonalData]
        public string FirstName { get; set; }

        [PersonalData]
        public string LastName { get; set; }

        [PersonalData]
        public string Mobile { get; set; }

        [PersonalData]
        public UserRole Role { get; set; } = UserRole.Customer;

    }
}
