


using Ecommerce.Interfaces;
using Ecommerce.Models;

namespace Ecommerce.Services
{

    public class ProductService : IProductService
    {

        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product> CreateProduct(Product product)
        {
            return await _productRepository.CreateProductAsync(product);
        }

        public async Task<Product> DeleteProduct(string id)
        {
            Product product = await _productRepository.GetProductByIdAsync(id);
            await _productRepository.DeleteProductAsync(id);
            return product;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _productRepository.GetAllProductsAsync();
        }

        public async Task<Product> GetProductById(string id)
        {
            return await _productRepository.GetProductByIdAsync(id);
        }

        public Task<Product> UpdateProduct(string id, Product updatedProduct)
        {
            return _productRepository.UpdateProductAsync(id, updatedProduct);
        }
    }
}