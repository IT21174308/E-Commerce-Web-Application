using Ecommerce.Interfaces;
using Ecommerce.Models;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Ecommerce.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public ProductRepository(IMongoDatabase database)
        {
            _products = database.GetCollection<Product>("Products");
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _products.Find(_ => true).ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            return await _products.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task CreateProductAsync(Product product)
        {
            await _products.InsertOneAsync(product);
        }

        public async Task UpdateProductAsync(string id, Product updatedProduct)
        {
            var result = await _products.ReplaceOneAsync(x => x.Id == id, updatedProduct);
            if (result.MatchedCount == 0)
            {
                // Handle case where no matching product is found
                throw new KeyNotFoundException($"Product with Id {id} not found");
            }
        }

        public async Task DeleteProductAsync(string id)
        {
            var result = await _products.DeleteOneAsync(x => x.Id == id);
            if (result.DeletedCount == 0)
            {
                // Handle case where no matching product is found
                throw new KeyNotFoundException($"Product with Id {id} not found");
            }
        }

        // Implementations for interface-specific methods

        async Task<Product> IProductRepository.CreateProductAsync(Product product)
        {
            await CreateProductAsync(product); // Reuse existing method
            return product; // Return the created product
        }

        async Task<Product> IProductRepository.UpdateProductAsync(string id, Product updateProductDto)
        {
            await UpdateProductAsync(id, updateProductDto); // Reuse existing method
            return updateProductDto; // Return the updated product
        }
    }
}
