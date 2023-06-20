using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Filters
{
    public abstract class FilterBase
    {
        public T GetValue<T>(string propertyName, object defaultValue)
        {
            var property = GetType().GetProperty(propertyName);
            if (property == null)
                return (T)defaultValue;

            var value = property.GetValue(this);
            return (T)value ?? (T)defaultValue;
        }
    }
}
