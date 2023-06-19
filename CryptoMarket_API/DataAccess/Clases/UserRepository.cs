using DataAccess.DBEntities;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Clases
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbContextFactory<CryptoMarketContext> _context;
        public UserRepository(IDbContextFactory<CryptoMarketContext> contextFactory)
        {
            _context = contextFactory;
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
            using (var context = _context.CreateDbContext())
            {
                return context.Users.SingleOrDefault(u => u.Wallet == wallet);
            }
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
