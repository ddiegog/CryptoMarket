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
    public class TransactionRepository : Interfaces.ITransactionRepository
    {
        private readonly IDbContextFactory<CryptoMarketContext> _context;

        internal TransactionRepository(IDbContextFactory<CryptoMarketContext> contextFactory) {
            _context = contextFactory;
        }
        public Transaction AddTransaction(Transaction transaction)
        {
            Transaction trans = null;

            using (var context = _context.CreateDbContext())
            {
                trans = context.Transactions.Add(transaction).Entity;
                context.SaveChanges();
            }

            return trans;
        }

        public Transaction GetTransaction(long id)
        {
            throw new NotImplementedException();
        }

        public List<Transaction> GetTransactions()
        {
            throw new NotImplementedException();
        }
    }
}
