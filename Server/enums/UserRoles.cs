using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Ecommerce.Enums;
public enum UserRole
{
    [BsonRepresentation(BsonType.String)]
    Admin,
    [BsonRepresentation(BsonType.String)]
    Vendor,
    [BsonRepresentation(BsonType.String)]
    Customer
}
