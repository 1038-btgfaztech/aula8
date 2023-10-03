using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mime;
using System.Security.Claims;
using System.Text;

namespace Aula8.Api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticationService authenticationService;

        public AccountController(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Produces(MediaTypeNames.Application.Json)]
        //[DurationFilter]
        public IActionResult Login(User user)
        {
            var token = authenticationService.GetToken(user);

            if (string.IsNullOrEmpty(token))
                return BadRequest("Credenciais Inválidas");

            return Ok(new { token });
        }
    }
}
