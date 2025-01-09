using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HFund.Data.Models
{
    public partial class AdminLetter
    {
        public int FundingDetailID { get; set; }
        public System.DateTime AdminLetterDate { get; set; }
        public string Description { get; set; }
        public System.DateTime ReceivedDate { get; set; }
        public decimal ReceivedAmount { get; set; }
        public Nullable<int> NumberFundingLetters { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string ReferenceNo { get; set; }

        public Nullable<bool> MultiYear { get; set; }

        public virtual FundingDetail FundingDetail { get; set; }
    }


}
