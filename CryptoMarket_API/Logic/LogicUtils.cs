using DataAccess.DBEntities;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic
{
    public class LogicUtils
    {
        public static string? CurrentWallet { get; set; }

        public static User DtoToUser(UserDTO user) {
            return new User {
                Wallet = user.Wallet,
                Nick = user.Nick,
                LastLogin = user.LastLogin,
                Img = user.Image,
                Active = true,
                Level = user.Level
            };
        }
        public static UserDTO UserToDto(User user)
        {
            return new UserDTO
            {
                Wallet = user.Wallet,
                Nick = user.Nick,
                LastLogin = user.LastLogin,
                Image = user.Img,
                Level = user.Level
            };
        }

        public static Transaction DtoToTransaction(TransactionDTO transactionDTO) {
            return new Transaction
            {
                Id = transactionDTO.Id,
                Amount = transactionDTO.Amount,
                Date = transactionDTO.Date,
                FromWallet = transactionDTO.FromWallet,
                ToWallet = transactionDTO.ToWallet,
                Type = transactionDTO.Type,
                Message = transactionDTO.Message
            };
        }

        public static TransactionDTO TransactionToDto(Transaction transaction)
        {
            return new TransactionDTO
            {
                Id = transaction.Id,
                Amount = transaction.Amount,
                Date = transaction.Date,
                FromWallet = transaction.FromWallet,
                ToWallet = transaction.ToWallet,
                Type = transaction.Type,
                Message = transaction.Message
            };
        }


    }
}
