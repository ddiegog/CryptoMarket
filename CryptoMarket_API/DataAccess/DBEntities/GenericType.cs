using System;
using System.Collections.Generic;

namespace DataAccess.DBEntities;

public partial class GenericType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int DataType { get; set; }
}
