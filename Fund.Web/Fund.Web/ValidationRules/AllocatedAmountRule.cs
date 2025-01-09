using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFund.Utility;
using HFund.Data.Models;
using HFund.Repository;

namespace HFund.Web.ValidationRules
{
    public class AllocatedAmountRule : ValidationRule
    {
        public AllocatedAmountRule() : base() { }

        public ValidationResult Validate(int fundingDetailId)
        {
            UoW.Refresh();

            var fd = UoW.FundingDetailRepo.GetFundingDetailById(fundingDetailId);
            if (fd == null) return new ValidationResult(false, "System Error");
            var pd = UoW.FundingDetailRepo.GetFundingDetailById(fd.FundingEntityID);
            if (fd.FundingEntityTypeID != SystemValues.FundingSourceTypeID && pd.FundingEntityTypeID != SystemValues.FundingSourceTypeID)
                if (fd.FundingEntityTypeID != SystemValues.FundingSourceTypeID)
            {
                if (UoW.IdentifiedFundingBucketRepo.GetAllIdentifiedFundingBucket_FilterByFundingDetailId(fundingDetailId).FirstOrDefault() == null)
                    return new ValidationResult(false, "No Funding Bucket Assigned");
            }

            if (fd.FundingEntityTypeID == SystemValues.ProjectTypeID)
            {
                //var bc = UoW.BusinessCaseRepo.GetBusinessCaseByFundingDetailId(fd.FundingEntityID);
                //var fr = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(fd.FundingEntityID);
                var pr = UoW.ProjectRepo.GetProjectById(fundingDetailId);
                if (pr == null) return new ValidationResult(false, "System Error");
                if (UoW.IdentifiedFundingTypeRepo.TotalAllocatedFundingAmount(fundingDetailId) != ((pr.AllocatedAmount == null) ? 0 : pr.AllocatedAmount))
                    return new ValidationResult(false, "Allocated Amount (Funding Type) Not Match Total Approved Amount");
                if (UoW.IdentifiedFundingBucketRepo.GetAllIdentifiedFundingBucket_FilterByFundingDetailId(fundingDetailId).AsEnumerable().Sum(amt => amt.AllocatedAmount) != ((pr.AllocatedAmount == null) ? 0 : pr.AllocatedAmount))
                    return new ValidationResult(false, "Allocated (Funding Bucket) Amount Not Match Total Approved Amount");
                if (UoW.IdentifiedFundingTypeRepo.TotalAllocatedProjectAmount(fd.FundingEntityID, fd.FiscalYear ?? SystemValues.CurrentFiscalYear) > UoW.IdentifiedFundingTypeRepo.TotalProjectFundingRequestAmount(fundingDetailId))
                    return new ValidationResult(false, "Total Allocated Amount ( to Projects) Exceeds Business Case Approved Amount");
              //if (UoW.IdentifiedFundingBucketRepo.TotalAllocatedProjectAmount(fd.FundingEntityID) > UoW.IdentifiedFundingBucketRepo.TotalProjectFundingRequestAmount(fundingDetailId))
              //    return new ValidationResult(false, "Total Approved Amount (Funding Bucket) Exceed Funding Request Approved Amount");

            }
            if (new[] { SystemValues.FundingRequestTypeID, SystemValues.SFFundingRequestTypeID}.Contains(fd.FundingEntityTypeID))
            {
                var fr = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(fundingDetailId);
                if (fr == null) return new ValidationResult(false, "System Error");
                if (UoW.IdentifiedFundingTypeRepo.TotalAllocatedFundingAmount(fundingDetailId) != ((fr.AllocatedFundingAmt == null)? 0 : fr.AllocatedFundingAmt))
                    return new ValidationResult(false, "Commitment Amount (Funding Type) Not Match Approved Amount");
                if (UoW.IdentifiedFundingBucketRepo.GetAllIdentifiedFundingBucket_FilterByFundingDetailId(fundingDetailId).AsEnumerable().Sum(amt => amt.AllocatedAmount) != ((fr.AllocatedFundingAmt == null) ? 0 : fr.AllocatedFundingAmt))
                    return new ValidationResult(false, "Commitment Amount (Funding Bucket) Not Match Approved Amount");
 
            }

            return base.Validate();
        }
    }
}