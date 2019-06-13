using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions;
using Microsoft.Extensions.Configuration;

public static class ServiceExtensions
{
    public static void AddHttpClients(this IServiceCollection services) {
        services.AddHttpClient<IMovieService, MovieService>();
        services.AddHttpClient<IConfigurationService, ConfigurationService>();
    }

    public static void AddApiConfiguration(this IServiceCollection services, IConfiguration configuration) {
        services.Configure<ApiSettings>(configuration.GetSection("ApiSettings"));
    }

    public static void AddCrossOriginConfiguration(this IServiceCollection services) {
        services.AddCors(options => {
            options.AddDefaultPolicy(builder => {
               builder.WithOrigins("http://localhost:4200", "null", null)
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });
    }
}