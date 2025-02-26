using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.EntityFrameworkCore;
using TodoApi;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// JWT configuration
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
//cors
builder.Services.AddCors(options =>
{
   options.AddPolicy("AllowAllOrigins", builder =>
   {
            builder.AllowAnyOrigin()
    //  WithOrigins("http://example.com")
            .AllowAnyMethod()
            .AllowAnyHeader();
   });
});

//contact to mysql
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration["ConnectionStrings__Tasks"],
                     new MySqlServerVersion(new Version(8, 0, 40))));
//Sugger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();                     
//jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtIssuer,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });
    builder.Services.AddSingleton<JwtService>();
    builder.Services.AddScoped<JwtService>();


var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
//cors
app.UseCors("AllowAllOrigins");

//שליפת ה-UserId מהטוקן
int? GetUserIdFromToken(HttpContext httpContext)
{
    var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
    return userIdClaim != null ? int.Parse(userIdClaim.Value) : (int?)null;
}

app.MapGet("/Tasks", async (ToDoDbContext context, HttpContext httpContext) =>
{
    var userId = GetUserIdFromToken(httpContext);
    if (userId == null) return Results.Unauthorized();

    var tasks = await context.Items.Where(t => t.UserId == userId).ToListAsync();
    return Results.Ok(tasks);
});


app.MapPost("/Task", async (Item item, ToDoDbContext context, HttpContext httpContext) =>
{
    var userId = GetUserIdFromToken(httpContext);
    if (userId == null) return Results.Unauthorized();

    item.UserId = userId.Value; // שמירה של ה-UserId
    context.Items.Add(item);
    await context.SaveChangesAsync();
    return Results.Created($"/tasks/{item.Id}", item);
});

app.MapPut("/Task/{id}", async (int id, bool isComplete, ToDoDbContext context, HttpContext httpContext) =>
{
    var userId = GetUserIdFromToken(httpContext);
    if (userId == null) return Results.Unauthorized();

    var item = await context.Items.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
    if (item == null) return Results.NotFound();

    item.IsComplete = isComplete;
    await context.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/Task/{id}", async (int id, ToDoDbContext context, HttpContext httpContext) =>
{
    var userId = GetUserIdFromToken(httpContext);
    if (userId == null) return Results.Unauthorized();

    var item = await context.Items.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
    if (item == null) return Results.NotFound();

    context.Items.Remove(item);
    await context.SaveChangesAsync();
    return Results.NoContent();
});

//Sugger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect to Swagger homepage
app.MapGet("/", () => Results.Redirect("/swagger"));

app.MapPost("/Login", async (UserLogin login, ToDoDbContext context, JwtService jwtService) =>
{
    var user = await context.Users.FirstOrDefaultAsync(u => u.Username == login.Username);
    if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
        return Results.Unauthorized();

    var token = jwtService.GenerateToken(user.Username, user.UserId); // להעביר גם את ה-UserId
    return Results.Ok(new { Token = token });
});

app.MapPost("/Register", async (User user, ToDoDbContext context) =>
{
    var existingUser = await context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);
    if (existingUser != null)
        return Results.BadRequest("Username already exists.");

    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
    context.Users.Add(user);
    await context.SaveChangesAsync();
    return Results.Ok("User registered successfully.");
});

app.Run();