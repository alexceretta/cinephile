using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Flurl;

public class ConfigurationService : IConfigurationService
{
    private readonly HttpClient httpClient;
    private readonly ApiSettings apiSettings;

    public ConfigurationService(HttpClient httpClient, IOptions<ApiSettings> apiSettings) { 
        this.httpClient = httpClient;
        this.apiSettings = apiSettings.Value;
    }

    public async Task<string> GetCurrent()
    {
        var url = this.apiSettings.BaseUrl
            .AppendPathSegment("configuration")
            .SetQueryParams(new {
                api_key = this.apiSettings.ApiKey
            });

        var response = await this.httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }    
}