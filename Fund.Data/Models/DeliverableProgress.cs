using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HFund.Data.Models
{

   
    public partial class DeliverableProgress
    {
        public int DeliverableProgressID { get; set; }
        public int FundingDetailID { get; set; }
        public Nullable<int> DeliverableID { get; set; }

        [Display(Name = "Actual Completeion Date :")]
        public Nullable<System.DateTime> ActualDate { get; set; }

        [Display(Name = "Explanation :")]
        public string Explanation { get; set; }

        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }

        [Display(Name = "Expected Completion Date :")]
        public Nullable<System.DateTime> ExpectedCompletionDate { get; set; }

        public string DeliverableDescription { get; set; }
        public Nullable<System.DateTime> TargetCompletionDate { get; set; }
        public Nullable<decimal> DeliverableCost { get; set; }
        public Nullable<decimal> PercentCompleted { get; set; }
        public virtual Deliverable Deliverable { get; set; }
        public virtual FundingDetail FundingDetail { get; set; }
    }

}
