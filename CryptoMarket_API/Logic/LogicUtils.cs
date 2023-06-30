using DataAccess.DBEntities;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic
{
    public class LogicUtils
    {
        public static User DtoToUser(UserDTO user) {
            return new User {
                Wallet = user.Wallet,
                Nick = user.Nick,
                LastLogin = user.LastLogin,
                Img = user.Image,
                Active = true
            };
        }
        public static UserDTO UserToDto(User user)
        {
            return new UserDTO
            {
                Wallet = user.Wallet,
                Nick = user.Nick,
                LastLogin = user.LastLogin,
                Image = user.Img,
                Level = user.Level
            };
        }

    }
}
