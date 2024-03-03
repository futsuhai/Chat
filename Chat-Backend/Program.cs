using Chat_Backend.Mappers;
using Chat_Backend.Models.Options;
using Chat_Backend.Repositories.AccountRepository;
using Chat_Backend.Services.AccountService;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Repositoryes
builder.Services.AddSingleton<IAccountRepository, AccountRepository>();

//Mapper
builder.Services.AddAutoMapper(typeof(AppMappingProfile));

// Options
builder.Services.AddSingleton<CryptoOptions>();
builder.Services.AddSingleton<JwtOptions>();
builder.Services.Configure<DatabaseOptions>(
    builder.Configuration.GetSection("DatabaseOptions"));

// Services
builder.Services.AddSingleton<IAccountService, AccountService>();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "http://localhost:4200");
    });
}
app.UseCors(options =>
{
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
