using System;
using System.Collections.Generic;

namespace HFund.EF.Library.Models
{
    public partial class Account
    {
        public Account()
        {
            this.AccountActivitiesOpenBalances = new List<AccountActivitiesOpenBalance>();
            this.AccountOpenBalances = new List<AccountOpenBalance>();
            this.AccountProgramOpenBalances = new List<AccountProgramOpenBalance>();
            this.AccountTPBEs = new List<AccountTPBE>();
            this.DeletedFundingDetails = new List<DeletedFundingDetail>();
            this.FundingDetails = new List<FundingDetail>();
            this.UserProfiles = new List<UserProfile>();
        }

        public int AccountID { get; set; }
        public string AccountNumber { get; set; }
        public Nullable<int> OrganizationType { get; set; }
        public string OrganizationtypeName { get; set; }
        public string Name { get; set; }
        public string TerritoryName { get; set; }
        public string CountyName { get; set; }
        public string SectorName { get; set; }
        public string SubsectorName { get; set; }
        public string ParentAccountName { get; set; }
        public Nullable<System.Guid> LHIN_AccountId { get; set; }
        public Nullable<System.Guid> LHIN_TerritoryId { get; set; }
        public Nullable<System.Guid> LHIN_CountyID { get; set; }
        public Nullable<System.Guid> LHIN_SectorId { get; set; }
        public Nullable<System.Guid> LHIN_SubsectorID { get; set; }
        public Nullable<System.Guid> LHIN_ParentAccountId { get; set; }
        public Nullable<System.DateTime> LHIN_ModifiedOn { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public Nullable<int> FundingLetterTemplateID { get; set; }
        public string BoardSalutation { get; set; }
        public string BoardFirstName { get; set; }
        public string BoardLastName { get; set; }
        public string BoardTitle { get; set; }
        public string BoardEmail { get; set; }
        public string CEOEDSalutation { get; set; }
        public string CEOEDFirstName { get; set; }
        public string CEOEDLastName { get; set; }
        public string CEOEDTitle { get; set; }
        public string CEOEDEmail { get; set; }
        public string PhoneNo { get; set; }
        public string FaxNo { get; set; }
        public string PreferredFormContact { get; set; }
        public string PLSCopy { get; set; }
        public string AlternateContact { get; set; }
        public string AlternateEmail { get; set; }
        public string AlternatePhoneNo { get; set; }
        public string MPPSalutation { get; set; }
        public string MPPFirstName { get; set; }
        public string MPPLastName { get; set; }
        public string MPPArea { get; set; }
        public string FinanceMGRCFO { get; set; }
        public string BoardPhoneNo { get; set; }
        public string BoardFaxNo { get; set; }
        public string CEOEDPhoneNo { get; set; }
        public string CEOEDFaxNo { get; set; }
        public string MPPPhoneNo { get; set; }
        public string MPPFaxNo { get; set; }
        public Nullable<int> DistrictID { get; set; }
        public string MPPEmail { get; set; }
        public string CEOEDFullName { get; set; }
        public Nullable<int> SubRegionID { get; set; }
        public virtual District District { get; set; }
        public virtual FundingLetterTemplate FundingLetterTemplate { get; set; }
        public virtual SubRegion SubRegion { get; set; }
        public virtual ICollection<AccountActivitiesOpenBalance> AccountActivitiesOpenBalances { get; set; }
        public virtual ICollection<AccountOpenBalance> AccountOpenBalances { get; set; }
        public virtual ICollection<AccountProgramOpenBalance> AccountProgramOpenBalances { get; set; }
        public virtual ICollection<AccountTPBE> AccountTPBEs { get; set; }
        public virtual ICollection<DeletedFundingDetail> DeletedFundingDetails { get; set; }
        public virtual ICollection<FundingDetail> FundingDetails { get; set; }
        public virtual ICollection<UserProfile> UserProfiles { get; set; }
    }
}
