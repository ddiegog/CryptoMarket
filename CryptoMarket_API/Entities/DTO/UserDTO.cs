using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class UserDTO
    {
        public string Wallet { get; set; }
        public string? Nick { get; set; }
        public string? Image { get; set; }
        public DateTime? LastLogin { get; set; }
        public int? Level { get; set; }
    }
}
