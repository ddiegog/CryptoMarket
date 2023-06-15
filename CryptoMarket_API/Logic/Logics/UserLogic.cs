using DataAccess;
using DataAccess.DBEntities;
using Logic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public bool Deleteuser()
        {
            throw new NotImplementedException();
        }

        public User? GetUser(string wallet)
        {
            return _repository.UserRepository().GetUser(wallet);
        }

        public User GetUsers()
        {
            throw new NotImplementedException();
        }

        public User UpdateUser()
        {
            throw new NotImplementedException();
        }
    }
}
