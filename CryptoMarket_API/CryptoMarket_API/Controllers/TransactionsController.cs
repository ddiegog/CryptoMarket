using CryptoMarket_API.ApiResponse;
using Entities.DTO;
using Logic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CryptoMarket_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    [ServiceFilter(typeof(ApiResponseActionFilter))]
    public class TransactionsController
    {
        private readonly LogicFactory _logicFactory;

        public TransactionsController(LogicFactory logicFactory)
        {
            _logicFactory = logicFactory;
        }

        [HttpPost()]
        public TransactionDTO Add([FromBody] TransactionDTO transactionDTO) {

            var transaction = _logicFactory.GetTransactionLogic().AddTransaction(transactionDTO);

            return transaction;
        }
    }
}
