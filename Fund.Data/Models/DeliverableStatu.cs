using System;
using System.Collections.Generic;

namespace HFund.Data.Models
{
    public partial class DeliverableStatu
    {
        public int DeliverableStatusID { get; set; }
        public int DeliverableID { get; set; }
        public int FiscalYear { get; set; }
        public int Period { get; set; }
        public string Explanation { get; set; }
        public Nullable<decimal> PercentCompleted { get; set; }
        public Nullable<System.DateTime> TargetCompletionDate { get; set; }
        public Nullable<int> LeadActivityStatusID { get; set; }
        public bool IsSubmitted { get; set; }
        public Nullable<System.DateTime> SubmittedDate { get; set; }
        public string SubmittedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public virtual Deliverable Deliverable { get; set; }
        public virtual FiscalYear FiscalYear1 { get; set; }
        public virtual LeadActivityStatu LeadActivityStatu { get; set; }
    }


}
