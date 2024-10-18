using Ecommerce.DTOs;
using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string id);

        Task<Product> UpdateProductAsync(String id, Product updateProductDto);
        Task DeleteProductAsync(string id);
        Task<Product> CreateProductAsync(Product product);
    }
}
