using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class TransactionDTO
    {
        public long Id { get; set; }

        public int Type { get; set; }

        public string FromWallet { get; set; } = null!;

        public string ToWallet { get; set; } = null!;

        public double Amount { get; set; }

        public string? Message { get; set; } = null!;

        public DateTime Date { get; set; }

    }
}
