using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Flurl;

public class MovieService : IMovieService
{
    private readonly HttpClient httpClient;
    private readonly ApiSettings apiSettings;

    public MovieService(HttpClient httpClient, IOptions<ApiSettings> apiSettings) { 
        this.httpClient = httpClient;
        this.apiSettings = apiSettings.Value;
    }

    public async Task<string> GetUpcoming(int page)
    {
        var url = this.apiSettings.BaseUrl
            .AppendPathSegments("movie", "upcoming")
            .SetQueryParams(new {
                api_key = this.apiSettings.ApiKey,
                page = page
            });

        var response = await this.httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> GetDetails(int id) {
        // Adds all the required parameters
        var url = this.apiSettings.BaseUrl
            .AppendPathSegments("movie", id)
            .SetQueryParams(new {
                api_key = this.apiSettings.ApiKey,
                append_to_response = "credits"
            });

        var response = await this.httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }

    public async Task<string> Search(string query, int page)
    {
        // Adds all the required parameters
        var url = this.apiSettings.BaseUrl
            .AppendPathSegments("search", "movie")
            .SetQueryParams(new {
                api_key = this.apiSettings.ApiKey,
                query = query
            });

        var response = await this.httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}