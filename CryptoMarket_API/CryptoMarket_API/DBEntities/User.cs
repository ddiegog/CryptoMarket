using System;
using System.Collections.Generic;

namespace CryptoMarket_API.DBEntities;

public partial class User
{
    public string Wallet { get; set; } = null!;

    public string? Nick { get; set; }

    public string? Img { get; set; }

    public DateTime? LastLogin { get; set; }

    public int? Level { get; set; }

    public bool? Active { get; set; }

    public virtual ICollection<Transaction> TransactionFromWalletNavigations { get; set; } = new List<Transaction>();

    public virtual ICollection<Transaction> TransactionToWalletNavigations { get; set; } = new List<Transaction>();
}
