﻿using CryptoMarket_API.ApiResponse;
using Entities;
using Entities.DTO;
using Entities.Filters;
using Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CryptoMarket_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [ServiceFilter(typeof(ApiResponseActionFilter))]
    public class UsersController : ControllerBase
    {

        private readonly LogicFactory _logicFactory;

        public UsersController(LogicFactory logicFactory)
        {
            _logicFactory = logicFactory;
        }

        [HttpGet("{wallet}")]
        public UserDTO? Get(string wallet)
        {
            if (string.IsNullOrEmpty(wallet)) return null;

            var user = _logicFactory.GetUserLogic().GetUser(wallet);

            return user;
        }

        [HttpPut("{wallet}")]
        public UserDTO? Update(UserDTO userUpdate)
        {
            if (userUpdate == null || string.IsNullOrEmpty(userUpdate.Wallet)) return null;

            var user = _logicFactory.GetUserLogic().UpdateUser(userUpdate);

            return user;
        }

        [HttpGet()]
        public List<UserDTO> GetUsers([FromQuery] UsersFilter filtros)
        {
            string nick = filtros.GetValue<string>("Nick", string.Empty);
            int level = filtros.GetValue<int>("Level", -1);
            int pageNumber = filtros.GetValue<int>("PageNumber", -1);
            int pageSize = filtros.GetValue<int>("PageNumber", -1);

            List<UserDTO> users = _logicFactory.GetUserLogic().GetUsers(nick, level, pageNumber, pageSize);
            return users;
        }

        [HttpDelete("{wallet}")]
        public bool Delete(string wallet)
        {
            if (string.IsNullOrEmpty(wallet)) return false;

            return _logicFactory.GetUserLogic().DeleteUser(wallet);
        }

        [HttpGet("balance/{wallet}")]
        public double GetBalance() {
            return 99;
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public AuthLogin LogInRegister([FromBody] Login login)
        {
            var auth = _logicFactory.GetUserLogic().LoginRegister(login);

            return auth;
        }

    }

}
