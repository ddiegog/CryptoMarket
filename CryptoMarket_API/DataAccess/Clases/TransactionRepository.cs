using DataAccess.DBEntities;
using DataAccess.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            Transaction trans = null!;

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

        public List<Transaction> GetTransactions(string wallet, int q)
        {
            var list = new List<Transaction>();

            using (var context = _context.CreateDbContext())
            {
                list = context.Transactions
                    .Where(t => t.FromWallet == wallet || t.ToWallet == wallet)
                    .OrderByDescending(t => t.Id)
                    .Take(q)
                    .ToList();

            }

            return list;
        }
    }
}
