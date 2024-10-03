using Ecommerce.DTOs;
using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string id);

        Task<Product> UpdateProductAsync(Product updateProductDto);
        Task DeleteProductAsync(string id);
        Task<Product> CreateProductAsync(Product product);
    }
}
