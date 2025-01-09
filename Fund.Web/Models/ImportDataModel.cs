using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFund.Web.ValidationRules;

namespace HFund.Web.Models
{
    public class ImportDataModel
    {
        public int              LineNo;
        public ValidationResult LineResult;
    }

    public class FundingSourceImport : ImportDataModel
    {
        public int               AccountID;
        public String            AccountNumber;
        public String            AccountName;
        public int               TPBEID;
        public String            TPBEShortName;
        public int?              ProgramID;
        public String            ProgramDescription;
        public String            FiscalYearDescription;
        public String            FundingLetterDeliverables;
        public Nullable<Decimal> OneTimeFundingAmount;
        public Nullable<Decimal> BaseFundingAmount;
        public Nullable<Decimal> BaseAnnualizedAmount;
        public String            FundingLetterEnclosure;
        public String            FundingLetterComment1;
        public String            FundingLetterComment2;
    }
}