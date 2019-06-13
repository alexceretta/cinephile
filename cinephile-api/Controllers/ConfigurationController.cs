using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api/configuration")]
[ApiController]
public class ConfigurationController : ControllerBase
{
    private readonly IConfigurationService _configurationService;

    public ConfigurationController(IConfigurationService configurationService) => _configurationService = configurationService;

    [HttpGet("")]
    public async Task<IActionResult> Get()
    {
        var configuration = await _configurationService.GetCurrent();
        return Ok(configuration);
    }    
}