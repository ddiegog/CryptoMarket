using CryptoMarket_API.ApiResponse;
using DataAccess.DBEntities;
using Logic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

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

//builder.Services.AddControllers(options =>
//{
//    options.Filters.Add<ApiResponseActionFilter>();
//});

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
