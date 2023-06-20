using DataAccess.DBEntities;
using Entities;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Interfaces
{
    public interface IUserLogic
    {
        public UserDTO? GetUser(string wallet);
        public List<UserDTO> GetUsers(string nick, int level, int pageNumber, int pageSize);
        public AuthLogin LoginRegister(Login login);
        public User UpdateUser();
        public bool DeleteUser(string wallet);

    }
}
