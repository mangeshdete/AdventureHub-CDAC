
using AdventureHub_DotNet_Admin.Models;
using Steeltoe.Discovery.Client;

namespace AdventureHub_DotNet_Admin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddDbContext<p14_adventurehubContext>();
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDiscoveryClient(builder.Configuration);


            var app = builder.Build();

            // Use Steeltoe Discovery Client
            app.UseDiscoveryClient();

            //app.UseCors(builder =>
            //    builder.AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
