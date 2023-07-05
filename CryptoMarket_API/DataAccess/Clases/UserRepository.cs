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

        public User AddUser(string wallet)
        {
            using (var context = _context.CreateDbContext())
            {
                var user = new User { Wallet = wallet, Active = true, LastLogin = DateTime.Now };
                user = context.Users.Add(user).Entity;
                context.SaveChanges();

                return user;
            }
        }

        public void DeleteUser(User user)
        {
            using (var context = _context.CreateDbContext())
            {
                user.Active = false;
                context.Users.Update(user);
                context.SaveChanges();
            }
        }

        public User? GetUser(string wallet, bool active = true)
        {
            using (var context = _context.CreateDbContext())
            {
                var query = context.Users.AsQueryable();
                if(active) query = query.Where(u => u.Active);

                return query.SingleOrDefault(u => u.Wallet == wallet);
            }
        }

        public List<User> GetUsers(string nick, int level, int pageNumber, int pageSize)
        {
            using (var context = _context.CreateDbContext())
            {
                var query = context.Users.AsQueryable();

                query = query.Where(u => u.Active == true);

                if (level != -1)
                {
                    query = query.Where(u => u.Level == level);
                }

                if (!string.IsNullOrEmpty(nick))
                {
                    query = query.Where(u => u.Nick.Contains(nick));
                }

                // Paginado
                if (pageNumber > 0)
                {
                    query = query.Skip(pageSize * (pageNumber - 1));
                }

                return query.ToList();
            }
        }


        public User UpdateUser(User user)
        {
            using (var context = _context.CreateDbContext())
            {
                var existingUser = context.Users.Find(user.Wallet);

                if (existingUser != null)
                {
                    context.Entry(existingUser).CurrentValues.SetValues(user);
                    context.SaveChanges();
                }
                else
                    throw new Exception("User doesn't exist");

                return user;
            }
        }
    }
}
