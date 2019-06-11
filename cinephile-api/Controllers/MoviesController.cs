using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api/movies")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    public MoviesController(IMovieService movieService) => _movieService = movieService;

    [HttpGet("{id}")]
    public async Task<IActionResult> Details(int id)
    {
        var movie = await _movieService.GetDetails(id);
        return Ok(movie);
    }

    [HttpGet("upcoming")]
    public async Task<IActionResult> Upcoming([FromQuery] int page = 1)
    {
        var movies = await _movieService.GetUpcoming(page);
        return Ok(movies);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int page = 1)
    {
        var movies = await _movieService.Search(query, page);
        return Ok(movies);
    }
}