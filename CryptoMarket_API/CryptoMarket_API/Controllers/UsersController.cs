
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

        [HttpGet]
        public IActionResult Get() {
            return Ok(new { status = "Ok" });
        }

        [HttpGet("{wallet}")]
        public IActionResult Get(string wallet) 
        {
            try
            {
                User? user = _logicFactory.GetUserLogic().GetUser(wallet);

                if (user == null)
                    return NotFound();

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Ha ocurrido un error " + ex.Message });
            }
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
}
