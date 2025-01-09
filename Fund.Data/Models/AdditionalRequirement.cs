using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HFund.Data.Models
{
    public partial class AdditionalRequirement
    {
        public int AdditionalRequirementID { get; set; }
        public int FundingDetailID { get; set; }

        [Display (Name="Sequence Number :")]
        public Nullable<int> SeqNo { get; set; }

        [Display(Name = "Requirement :")]
        [StringLength(150)]
        public string Requirement { get; set; }

        [Display(Name = "Description :")]
        public string Description { get; set; }

        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<int> OrigAdditionalRequirementID { get; set; }
        public virtual FundingDetail FundingDetail { get; set; }
    }
}
