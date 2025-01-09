using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFund.Data.Models;
using HFund.Repository;

namespace HFund.Web.ValidationRules
{
    public abstract class ValidationRule
    {
        HFundUnitOfWork _UoW = new HFundUnitOfWork();
        public HFundUnitOfWork UoW
        {
            get
            {
                if (_UoW == null) { _UoW = new HFundUnitOfWork(); }
                return _UoW;
            }

        }

        public ValidationRule()
        {
        }

        public ValidationResult Validate()
        {
            return new ValidationResult(true, null);
        }
    }
}