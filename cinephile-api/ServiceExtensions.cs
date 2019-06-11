using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions;
using Microsoft.Extensions.Configuration;

public static class ServiceExtensions
{
    public static void AddHttpClients(this IServiceCollection services) {
        services.AddHttpClient<IMovieService, MovieService>();
    }

    public static void AddApiConfiguration(this IServiceCollection services, IConfiguration configuration) {
        services.Configure<ApiSettings>(configuration.GetSection("ApiSettings"));
    }
}