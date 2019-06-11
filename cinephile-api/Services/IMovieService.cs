using System.Threading.Tasks;

public interface IMovieService {
    Task<string> Search(string query, int page);

    Task<string> GetUpcoming(int page);

    Task<string> GetDetails(int id);
}