namespace Aula8.Api
{
    public interface IAuthenticationService
    {
        string GetToken(User user);
    }
}