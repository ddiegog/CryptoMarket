using DataAccess;
using DataAccess.DBEntities;
using Logic.Interfaces;
using Logic.Logics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic
{
    public class LogicFactory
    {
        private readonly RepositoryFactory _repository;

        public LogicFactory(RepositoryFactory repository)
        {
            _repository = repository;
        }

        public IUserLogic GetUserLogic() => UserLogic.GetInstance(_repository);
    }
}
