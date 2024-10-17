using Ecommerce.Interfaces;
using Ecommerce.Models;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Ecommerce.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly IMongoCollection<Role> _roles;

        public RoleRepository(IMongoDatabase database)
        {
            _roles = database.GetCollection<Role>("Roles");
        }

        // Get all roles
        public async Task<List<Role>> GetAllRolesAsync()
        {
            return await _roles.Find(_ => true).ToListAsync();
        }

        // Get a role by its name
        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            return await _roles.Find(x => x.Name == roleName).FirstOrDefaultAsync();
        }
    }
}
