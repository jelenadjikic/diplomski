using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Models;


namespace DiplomskiWebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(p =>
            {
                p.AddPolicy("CORS", builder =>
                {
                    builder.WithOrigins(new string[]
                                {
                                    "http://localhost:5500",
                                    "http://127.0.0.1:5500",
                                    "https://localhost:5500",
                                    "https://127.0.0.1:5500",
                                    "https://localhost:5001",
                                    "https://localhost:5000",
                                    "http://localhost:5000",
                                    "https://localhost:5001",
                                    "http://127.0.0.1:5500/",
                                    "http://localhost:5001",
                                    "http://127.0.0.1:5501",
                                    "https://localhost:5501",
                                    "http://127.0.0.1:5501"
                                })
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Template", Version = "v1" });
            });
             services.AddDbContextPool<KeywordsDbContext>(options =>
            {
                var connetionString = Configuration.GetConnectionString("Conn");
                options.UseMySql(connetionString, ServerVersion.AutoDetect(connetionString));
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Template v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CORS");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
