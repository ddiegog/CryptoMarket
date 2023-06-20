using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Filters
{
    public class UsersFilter : FilterBase
    {
        public string Nick { get; set; }
        public int? Level { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
    }
}
