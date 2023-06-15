using System;
using System.Collections.Generic;

namespace DataAccess.DBEntities;

public partial class Log
{
    public long Id { get; set; }

    public int Type { get; set; }

    public string Text { get; set; } = null!;
}
