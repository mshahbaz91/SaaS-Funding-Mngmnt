using System;
using System.Collections.Generic;

namespace HFund.EF.Library.Models
{
    public partial class AccountOpenBalance
    {
        public int AccountOpenBalanceID { get; set; }
        public int AccountID { get; set; }
        public int FiscalYear { get; set; }
        public int SAASectorID { get; set; }
        public Nullable<int> RevenueLineID { get; set; }
        public Nullable<int> TPBEID { get; set; }
        public Nullable<decimal> OpenBalance { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public virtual Account Account { get; set; }
        public virtual FiscalYear FiscalYear1 { get; set; }
        public virtual RevenueLine RevenueLine { get; set; }
        public virtual SAASector SAASector { get; set; }
        public virtual TPBE TPBE { get; set; }
    }
}
