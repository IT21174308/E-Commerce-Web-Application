

using Ecommerce.Models;

namespace Ecommerce.Interfaces
{
    public interface IProductService
    {

        Task<Product> GetProductById(string id);

        Task<Product> CreateProduct(Product product);

        Task<Product> UpdateProduct(string id, Product updatedProduct);

        Task<Product> DeleteProduct(string id);

        Task<List<Product>> GetAllProducts();
    }
}