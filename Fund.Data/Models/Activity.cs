using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HFund.Data.Models
{

    public partial class Activity
    {
        public int ActivityID { get; set; }
        public int FundingDetailID { get; set; }

        [Display(Name="Activity Sequence Number :")]
        public int ActivitySeqNo { get; set; }

        [Display(Name="Activity Description :")]
        public string ActivityDescription { get; set; }

        [Display(Name = "Planned Completed :")]
        public bool PlannedCompletedInd { get; set; }

        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public virtual FundingDetail FundingDetail { get; set; }
    }



}
