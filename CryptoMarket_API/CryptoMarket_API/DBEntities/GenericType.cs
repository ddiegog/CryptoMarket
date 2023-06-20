using System;
using System.Collections.Generic;

namespace CryptoMarket_API.DBEntities;

public partial class GenericType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int DataType { get; set; }
}
