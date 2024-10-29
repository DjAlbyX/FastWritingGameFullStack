using APIforReact;
using System;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using static System.Runtime.InteropServices.JavaScript.JSType;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
    {
        policyBuilder.AllowAnyOrigin();
        policyBuilder.AllowAnyMethod();
        policyBuilder.AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

var words = new List<string>();
int count = 0;


app.MapGet("/albert/count", () =>
{
    return Results.Ok(count);
});

app.MapGet("/albert/get", () =>
{
    if(words.Any())
    {
        return Results.Ok(new { Count = count, words });
    }
    return Results.BadRequest("Couldn't get list information.");
});

app.MapGet("/albert/getWord", () =>
{
    if (!words.Any())
        return Results.BadRequest("No words available");

    Random random = new();
    int randomWord = random.Next(0, words.Count);
    Console.WriteLine(words[randomWord]);
    return Results.Ok(words[randomWord]);
});

app.MapPost("/albert/add", (WordRequest wordRequest) =>
{
    words.Add(wordRequest.GetWord());
    count++;
    return Results.Ok(new { Count = count, Words = words });
});

app.MapPost("/albert/remove", () =>
{
    count = 0;
    words.Clear();
    return Results.Ok("List data has been removed.");
});


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();


app.Run();
