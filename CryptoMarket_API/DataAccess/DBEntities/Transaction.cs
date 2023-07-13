using System;
using System.Collections.Generic;

namespace DataAccess.DBEntities;

public partial class Transaction
{
    public long Id { get; set; }

    public int Type { get; set; }

    public string FromWallet { get; set; } = null!;

    public string ToWallet { get; set; } = null!;

    public double Amount { get; set; }

    public DateTime Date { get; set; }

    public string Message { get; set; } = null!;

    public virtual User FromWalletNavigation { get; set; } = null!;

    public virtual User ToWalletNavigation { get; set; } = null!;
}
