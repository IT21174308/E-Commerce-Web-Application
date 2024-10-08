using Ecommerce.Interfaces;
using Ecommerce.Models;
using Ecommerce.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ecommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        // Dependancy Injection  ProductService
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // Get all products
        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products); // Return 200 with the list of products
        }

        // Get product by id
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(string id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound(); // Return 404 if product is not found
            }
            return Ok(product);
        }

        // Create product
        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromBody] Product product)
        {
            Console.WriteLine(product.Name);
            var createdProduct = await _productService.CreateProduct(product);
            return CreatedAtAction(nameof(Get), new { id = createdProduct.Id }, createdProduct); // Return 201 with location header
        }

        // Update product
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> Put(string id, [FromBody] Product product)
        {
            var updatedProduct = await _productService.UpdateProduct(id, product);
            if (updatedProduct == null)
            {
                return NotFound(); // Return 404 if product to update is not found
            }
            return Ok(updatedProduct);
        }

        // Delete product
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var product = await _productService.DeleteProduct(id);
            if (product == null)
            {
                return NotFound(); // Return 404 if product to delete is not found
            }
            return NoContent(); // Return 204 No Content if deletion is successful
        }
    }
}
