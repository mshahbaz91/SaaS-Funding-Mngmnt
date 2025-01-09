using System;
using System.Collections.Generic;

namespace HFund.EF.Library.Models
{
    public partial class AccountActivitiesOpenBalance
    {
        public int AccountActivitiesOpenBalanceID { get; set; }
        public int AccountID { get; set; }
        public int FiscalYear { get; set; }
        public int FunctionalCenterID { get; set; }
        public int UnitofMeasureID { get; set; }
        public Nullable<decimal> BeginningVolume { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public virtual Account Account { get; set; }
        public virtual FiscalYear FiscalYear1 { get; set; }
        public virtual FunctionalCenter FunctionalCenter { get; set; }
        public virtual UnitofMeasure UnitofMeasure { get; set; }
    }
}
