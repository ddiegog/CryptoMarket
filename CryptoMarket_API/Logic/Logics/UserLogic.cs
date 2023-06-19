﻿using DataAccess;
using DataAccess.DBEntities;
using Entities.DTO;
using Logic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Logics
{
    public class UserLogic : IUserLogic
    {
        private static UserLogic _instance;

        private readonly RepositoryFactory _repository;

        public static UserLogic GetInstance(RepositoryFactory repository)
        {
            if (_instance == null)
            {
                _instance = new UserLogic(repository);
            }
            return _instance;
        }

        private UserLogic(RepositoryFactory repository)
        {
            _repository = repository;
        }

        public User AddUser()
        {
            throw new NotImplementedException();
        }

        public bool DeleteUser(string wallet)
        {
            var user = _repository.UserRepository().GetUser(wallet);

            if (user == null) return false;

            _repository.UserRepository().DeleteUser(user);
            return true;
        }

        public UserDTO? GetUser(string wallet)
        {
            var user = _repository.UserRepository().GetUser(wallet);
            UserDTO userDTO = null;

            if (user != null) {
                userDTO = new UserDTO()
                {
                    Wallet = user.Wallet,
                    Nick = user.Nick,
                    Image = user.Img,
                    LastLogin = user.LastLogin,
                    Level = user.Level
                };
            }
            
            return userDTO;

        }

        public List<UserDTO> GetUsers(string nick, int level, int pageNumber, int pageSize)
        {
            var users = _repository.UserRepository().GetUsers(nick, level, pageNumber, pageSize);

            var usersDTO = new List<UserDTO>();
            usersDTO = users.ConvertAll(x => new UserDTO() { 
                Wallet = x.Wallet,
                Nick = x.Nick,
                Image = x.Img,
                LastLogin = x.LastLogin,
                Level = x.Level
            });

            return usersDTO;
        }

        public User UpdateUser()
        {
            throw new NotImplementedException();
        }
    }
}
