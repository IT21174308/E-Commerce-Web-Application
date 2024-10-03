using System.Text;
using Ecommerce.Repositories;
using Ecommerce.Interfaces;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Ecommerce.Models;
using Microsoft.AspNetCore.Identity;
using MongoDbSettings = Ecommerce.Config.MongoDbSettings;
var builder = WebApplication.CreateBuilder(args);

// Configure Swagger and other services
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// MongoDB configuration
// Load MongoDB settings from configuration
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDB"));

var mongoSettings = builder.Configuration.GetSection("MongoDB").Get<MongoDbSettings>();

if (mongoSettings == null)
{
    Console.WriteLine("MongoDBSettings is null. Please check your configuration.");
}

// Register MongoDB client and database
builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoSettings.ConnectionString));
builder.Services.AddScoped<IMongoDatabase>(provider =>
    provider.GetService<IMongoClient>().GetDatabase(mongoSettings.DatabaseName));

// Configure MongoDB Identity
builder.Services.AddIdentity<User, Role>(options =>
{
    options.User.RequireUniqueEmail = true;
})
.AddMongoDbStores<User, Role, Guid>(mongoSettings.ConnectionString, mongoSettings.DatabaseName)
.AddDefaultTokenProviders();

// JWT configuration
var jwtKey = builder.Configuration["Jwt:Key"];
var key = Encoding.ASCII.GetBytes(jwtKey);

// Configure authentication with JWT Bearer
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = true;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Register application services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddAuthorization();

builder.Services.AddControllers();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// // Configure the HTTP request pipeline
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.MapGet("/", () => "Server is running!");

app.UseHttpsRedirection();
app.UseAuthentication(); // Add authentication middleware
app.UseAuthorization(); // Add authorization middleware
app.UseCors("AllowAll"); // Use CORS policy

app.MapControllers();
app.Run();
