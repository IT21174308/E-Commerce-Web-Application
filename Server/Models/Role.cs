using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace Ecommerce.Models
{
    [CollectionName("Roles")]
    public class Role : MongoIdentityRole<Guid>
    {
    }
}
