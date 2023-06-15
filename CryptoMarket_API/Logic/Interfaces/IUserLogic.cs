using DataAccess.DBEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Interfaces
{
    public interface IUserLogic
    {
        public User? GetUser(string wallet);
        public User GetUsers();
        public User AddUser();
        public User UpdateUser();
        public bool Deleteuser();

    }
}
