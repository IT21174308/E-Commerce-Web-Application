using MongoDB.Driver;

namespace Ecommerce.Repositories;
public class ProductRepository
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

    public async Task<Product?> GetProductByIdAsync(string id)
    {
        return await _products.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateProductAsync(Product product)
    {
        await _products.InsertOneAsync(product);
    }

    public async Task UpdateProductAsync(string id, Product updatedProduct)
    {
        await _products.ReplaceOneAsync(x => x.Id == id, updatedProduct);
    }

    public async Task DeleteProductAsync(string id)
    {
        await _products.DeleteOneAsync(x => x.Id == id);
    }
}
