
using Azure;
using CryptoMarket_API.ApiResponse;
using DataAccess.DBEntities;
using Logic;
using Microsoft.AspNetCore.Mvc;

namespace CryptoMarket_API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly LogicFactory _logicFactory;

        public UsersController(LogicFactory logicFactory)
        {
            _logicFactory = logicFactory;
        }

        [HttpGet("{wallet}")]
        public IActionResult Get(string wallet) 
        {
            try
            {
                User? user = _logicFactory.GetUserLogic().GetUser(wallet);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Ha ocurrido un error " + ex.Message });
            }
        }

        [HttpGet()]
        [ServiceFilter(typeof(ApiResponseActionFilter))]
        public List<User> GetUsers([FromQuery] UserFilter filtros)
        {
            string nick = filtros?.Nick ?? string.Empty;
            int level = filtros?.Level ?? -1;
            int pageNumber = filtros?.PageNumber ?? -1;
            int pageSize = filtros?.PageSize ?? -1;

            List<User> users = _logicFactory.GetUserLogic().GetUsers(nick, level, pageNumber, pageSize);

            return users;
        }

        [HttpPost]
        public IActionResult LogInRegister([FromBody] string wallet)
        {
            // Validar si existe
            if (false)
            {
                return Ok(new { status = "Ok" });
            }
            else {
                return Created(nameof(Get),new { status = "Created" });
            }
        }

    }

    public class UserFilter
    {
        public string Nick { get; set; }
        public int? Level { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }

}
