using DataAccess.DBEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface IUserRepository
    {
        public User? GetUser(string wallet);
        public User GetUsers();
        public User AddUser();
        public User UpdateUser();
        public bool Deleteuser();
    }
}
