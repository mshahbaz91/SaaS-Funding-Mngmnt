using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFund.Data.DTO
{
    public class IdentifiedFundingIndicatorApiDTO
    {
        public int FundingDetailId;

        public List<IdentifiedFundingIndicatorCustomDTO> IdentifiedFundingIndicatorList;

    }


    public class IdentifiedFundingIndicatorCustomDTO
    {
        public int IdentifiedFundingIndicatorID { get; set; }

        public int FundingDetailID { get; set; }

        public int FundingIndicatorID { get; set; }

    }


}
