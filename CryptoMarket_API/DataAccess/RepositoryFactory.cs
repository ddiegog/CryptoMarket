using DataAccess.Clases;
using DataAccess.DBEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class RepositoryFactory
    {
        private readonly IDbContextFactory<CryptoMarketContext> _context;

        public RepositoryFactory(IDbContextFactory<CryptoMarketContext> context) 
            => _context = context;

        public UserRepository UserRepository() => new UserRepository(_context);

    }
}
