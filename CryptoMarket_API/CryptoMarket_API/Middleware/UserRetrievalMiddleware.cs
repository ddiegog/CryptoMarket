using Logic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CryptoMarket_API.Middleware
{
    public class UserRetrievalMiddleware
    {
        private readonly RequestDelegate _next;

        public UserRetrievalMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            string authHeader = context.Request.Headers["Authorization"]!;
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                string token = authHeader.Substring("Bearer ".Length).Trim();

                var handler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtToken = handler.ReadJwtToken(token);
                var claims = jwtToken.Claims;

                Claim userIdClaim = claims.FirstOrDefault(claim => claim.Type == "id")!;
                if (userIdClaim != null)
                {
                    //context.Items["Wallet"] = token;
                    LogicUtils.CurrentWallet = userIdClaim.Value;
                }

            }

            // No olvides llamar a _next(context) para que los siguientes middleware en el pipeline puedan procesar la solicitud
            await _next(context);
        }
    }
}
