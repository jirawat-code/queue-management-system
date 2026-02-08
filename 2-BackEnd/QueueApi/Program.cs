using Microsoft.Data.SqlClient;
using Dapper;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

const string connStr = "Server=localhost\\SQLEXPRESS;Database=QueueManagementDB;Trusted_Connection=True;TrustServerCertificate=True;";

app.UseCors("AllowAngular");
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

app.MapPost("/api/queue/generate", async () => {
    using IDbConnection db = new SqlConnection(connStr);
    var result = await db.QuerySingleOrDefaultAsync("sp_GetNextQueue", commandType: CommandType.StoredProcedure);
    return Results.Ok(result);
});

app.MapPost("/api/queue/current", async () => {
    using IDbConnection db = new SqlConnection(connStr);
    var result = await db.QuerySingleOrDefaultAsync("sp_GetCurrentQueue", commandType: CommandType.StoredProcedure);
    return Results.Ok(result);
});

app.MapPost("/api/queue/reset", async () => {
    using IDbConnection db = new SqlConnection(connStr);
    await db.ExecuteAsync("sp_ResetQueue", commandType: CommandType.StoredProcedure);
    return Results.Ok(new { message = "Reset successful" });
});

app.Run();