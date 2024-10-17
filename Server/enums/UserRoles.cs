using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

//User Roles ENUM
namespace Ecommerce.Enums;
public enum UserRole
{
    [BsonRepresentation(BsonType.String)]
    Admin,
    [BsonRepresentation(BsonType.String)]
    Vendor,
    [BsonRepresentation(BsonType.String)]
    Customer,
    [BsonRepresentation(BsonType.String)]
    CSR
}
