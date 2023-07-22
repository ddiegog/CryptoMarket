using DataAccess.DBEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interfaces
{
    public interface ITransactionRepository
    {
        Transaction GetTransaction(Int64 id);
        Transaction AddTransaction(Transaction transactionDTO);
        List<Transaction> GetTransactions(string wallet, int q);
    }
}
