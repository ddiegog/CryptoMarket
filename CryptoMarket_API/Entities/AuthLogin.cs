﻿using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class AuthLogin
    {
        public string Token { get; set; }
        public UserDTO User { get; set; }
    }
}
