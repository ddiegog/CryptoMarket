using CryptoMarket_API.ApiResponse;
using CryptoMarket_API.Middleware;
using DataAccess.DBEntities;
using Logic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContextFactory<DataAccess.DBEntities.CryptoMarketContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CryptoMarketConnection"),
    sqlServerOptionsAction: sqlOptions =>
    {
        sqlOptions.EnableRetryOnFailure(maxRetryCount: 1);
    })
);


builder.Services.AddScoped<DataAccess.RepositoryFactory>();
builder.Services.AddScoped<LogicFactory>();
builder.Services.AddScoped<ApiResponseActionFilter>();

builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
        .AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("649w7dod4jW7fASZ8mjrTaB")),
                ValidateIssuer = false,
                ValidateAudience = false,
            };
        });

builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseMiddleware<UserRetrievalMiddleware>();

app.UseHttpsRedirection();

app.UseCors("Policy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
