using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Ecommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private static readonly List<string> Products = new List<string>
        {
            "User1", "User2", "User3"
        };

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return Products;
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            if (id >= Products.Count || id < 0)
            {
                return NotFound();
            }
            return Products[id];
        }

        [HttpPost]
        public IActionResult Post([FromBody] string product)
        {
            Products.Add(product);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string product)
        {
            if (id >= Products.Count || id < 0)
            {
                return NotFound();
            }
            Products[id] = product;
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id >= Products.Count || id < 0)
            {
                return NotFound();
            }
            Products.RemoveAt(id);
            return Ok();
        }
    }
}
