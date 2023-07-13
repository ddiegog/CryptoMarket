using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Interfaces
{
    public interface ITransactionLogic
    {
        TransactionDTO GetTransaction(Int64 id);
        TransactionDTO AddTransaction(TransactionDTO transactionDTO);
        List<TransactionDTO> GetTransactions();

    }
}
