using System.Threading.Tasks;

public interface IConfigurationService {
    Task<string> GetCurrent();
}