using Ecommerce.Interfaces;
using Ecommerce.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _userService;

        public UserController(IAuthService userService)
        {
            _userService = userService;
        }
        private static readonly List<string> Users = new List<string>
        {
            "User1", "User2", "User3"
        };

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            
            if (users == null || users.Count == 0)
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }


        [HttpGet("by-email/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers(string email)
        {
            var users = await _userService.GetUserByEmailAsync(email);

            if (users == null)
            {
                return NotFound("No users found.");
            }

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            if (id >= Users.Count || id < 0)
            {
                return NotFound();
            }
            return Users[id];
        }

        [HttpPost]
        public IActionResult Post([FromBody] string user)
        {
            Users.Add(user);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string user)
        {
            if (id >= Users.Count || id < 0)
            {
                return NotFound();
            }
            Users[id] = user;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int user)
        {
            if (user >= Users.Count || user < 0)
            {
                return NotFound();
            }
            Users.RemoveAt(user);
            return Ok();
        }
    }
}
