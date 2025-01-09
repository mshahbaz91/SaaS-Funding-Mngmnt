using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HFund.Web.Models
{
    public class FundingDetailViewModel
    {
        public int FundingDetailID { get; set; }
        public int TaskID { get; set; }
        public string StatusComment { get; set; }
        public int[] DocumentIds { get; set; }
        public bool CheckedUpload { get; set; }
    }
}