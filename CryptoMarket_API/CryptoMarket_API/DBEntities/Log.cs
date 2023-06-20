using System;
using System.Collections.Generic;

namespace CryptoMarket_API.DBEntities;

public partial class Log
{
    public long Id { get; set; }

    public int Type { get; set; }

    public string Text { get; set; } = null!;
}
