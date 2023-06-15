using DataAccess.DBEntities;
using DataAccess.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Clases
{
    public class UserRepository : IUserRepository
    {
        private readonly CryptoMarketContext _context;
        public UserRepository(CryptoMarketContext context)
        {
            _context = context;
        }

        public User AddUser()
        {
            throw new NotImplementedException();
        }

        public bool Deleteuser()
        {
            throw new NotImplementedException();
        }

        public User? GetUser(string wallet)
        {
            return _context.Users.SingleOrDefault(u => u.Wallet == wallet);
        }

        public User GetUsers()
        {
            throw new NotImplementedException();
        }

        public User UpdateUser()
        {
            throw new NotImplementedException();
        }
    }
}
