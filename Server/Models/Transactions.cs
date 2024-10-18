using AspNetCore.Identity.MongoDbCore.Models;
using Ecommerce.Enums;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using System;

namespace Ecommerce.Models
{
    [CollectionName("Transactions")]
    public class Transaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        public double Value { get; set; }

        [BsonElement("productId")]
        public string ProductId { get; set; }

    }
}
