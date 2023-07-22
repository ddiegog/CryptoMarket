using Blockchain;
using DataAccess;
using DataAccess.DBEntities;
using Entities.DTO;
using Logic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Logic.Logics
{
    public class TransactionLogic : ITransactionLogic
    {
        private static TransactionLogic _instance;

        private readonly RepositoryFactory _repository;

        public static TransactionLogic GetInstance(RepositoryFactory repository)
        {
            if (_instance == null)
            {
                _instance = new TransactionLogic(repository);
            }
            return _instance;
        }

        private TransactionLogic(RepositoryFactory repository)
        {
            _repository = repository;
        }

        public TransactionDTO AddTransaction(TransactionDTO transactionDTO) {

            // ------------------------- Validations -------------------------
            if (transactionDTO == null)
                throw new ArgumentNullException("Null transaction");

            if (transactionDTO.Id > 0)
                throw new ArgumentNullException("A new transaction cant have id");

            if (!Regex.IsMatch(transactionDTO.ToWallet, @"^0x[a-fA-F0-9]{40}$"))
                throw new ArgumentException("The address is invalid!");

            if (transactionDTO.FromWallet == transactionDTO.ToWallet)
                throw new ArgumentException("The sender and the receiver cant be the same!");

            if (transactionDTO.Amount < 0.001 || transactionDTO.Amount > 10000000)
                throw new ArgumentException("You can only transfer between 0.001 and 10000000 Otts");

            //if (transactionDTO.Amount > transactionDTO.Balance)
            //    throw new ArgumentException("The amount to transfer must be equal or less than your balance!");

            if (transactionDTO.Id < 0)
                throw new ArgumentException("You have to provide an address to transfer!");
            // validate here that both wallets exists in database
            // from
            User? user = _repository.UserRepository().GetUser(transactionDTO.FromWallet);
            if (user == null)
                throw new ArgumentException("Sender doesnt exist in OtterMints");

            //to
            user = _repository.UserRepository().GetUser(transactionDTO.ToWallet);
            if (user == null)
                throw new ArgumentException("Receiver doesnt exist in OtterMints");

            // ---------------------------------------------------------------------------


            transactionDTO.Date = DateTime.Now;

            // add to blockchain
            // if added ok will add it to the db
            bool isValidSignature = CryptoHandler.ValidateSignature(transactionDTO.FromWallet, transactionDTO.Signature!, transactionDTO.SignedPayload!);

            if (isValidSignature)
            {
                // add to the smart contract
                CryptoHandler.Transfer(transactionDTO.FromWallet, transactionDTO.ToWallet, transactionDTO.Amount, transactionDTO.Message!);

                // add to bd
                var transaction = LogicUtils.DtoToTransaction(transactionDTO);
                var trans = _repository.TransactionRepository().AddTransaction(transaction);

                transactionDTO = LogicUtils.TransactionToDto(trans);
            }
            else
                throw new ArgumentException("The signature is invalid"); 

            return transactionDTO;
        }

        public TransactionDTO GetTransaction(long id)
        {
            throw new NotImplementedException();
        }

        public List<TransactionDTO> GetTransactions(int q)
        {
            var transactions = _repository.TransactionRepository().GetTransactions(LogicUtils.CurrentWallet!, q);

            var transactionsDTO = transactions.ConvertAll( t => LogicUtils.TransactionToDto(t) );

            return transactionsDTO;

        }
    }
}
