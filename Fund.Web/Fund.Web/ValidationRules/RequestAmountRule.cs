using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFund.Utility;
using HFund.Data.Models;
using HFund.Repository;

namespace HFund.Web.ValidationRules
{
    public class RequestAmountRule : ValidationRule
    {
        public RequestAmountRule() : base() { }

        public ValidationResult Validate(int fundingDetailId)
        {
            UoW.Refresh();

            var fd = UoW.FundingDetailRepo.GetFundingDetailById(fundingDetailId);
            if (fd == null) return new ValidationResult(false, "System Error");
            var pd = UoW.FundingDetailRepo.GetFundingDetailById(fd.FundingEntityID);
            if (fd.FundingEntityTypeID != SystemValues.FundingSourceTypeID && pd.FundingEntityTypeID != SystemValues.FundingSourceTypeID)
            {
                if (UoW.IdentifiedFundingBucketRepo.GetAllIdentifiedFundingBucket_FilterByFundingDetailId(fundingDetailId).FirstOrDefault() == null)
                    return new ValidationResult(false, "No Funding Bucket Assigned");
            }

            if (new[] { SystemValues.FundingRequestTypeID, SystemValues.SFFundingRequestTypeID }.Contains(fd.FundingEntityTypeID))
            {
                var fr = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(fundingDetailId);
                if (fr == null) return new ValidationResult(false, "System Error");
                if (UoW.IdentifiedFundingTypeRepo.TotalRequestedFundingAmount(fundingDetailId) != fr.RequestedFundingAmt)
                    return new ValidationResult(false, "Commitment Amount (Funding Type) Not Match Request Amount");
                if (UoW.IdentifiedFundingBucketRepo.GetAllIdentifiedFundingBucket_FilterByFundingDetailId(fundingDetailId).AsEnumerable().Sum(amt => amt.RequestedAmount) != fr.RequestedFundingAmt)
                    return new ValidationResult(false, "Commitment Amount (Funding Bucket) Not Match Request Amount");
            }

            if (fd.FundingEntityTypeID == SystemValues.ProjectTypeID)
            {
                var pr = UoW.ProjectRepo.GetProjectById(fundingDetailId);
                if (pr == null) return new ValidationResult(false, "System Error");
                if (UoW.IdentifiedFundingTypeRepo.TotalRequestedFundingAmount(fundingDetailId) != pr.RequestedAmount)
                    return new ValidationResult(false, "Allocated Amount (Funding Type) Not Match Request Amount");
                if (UoW.IdentifiedFundingBucketRepo.GetAllIdentifiedFundingBucket_FilterByFundingDetailId(fundingDetailId).AsEnumerable().Sum(amt => amt.RequestedAmount) != pr.RequestedAmount)
                    return new ValidationResult(false, "Allocated Amount (Funding Bucket) Not Match Request Amount");
            }

            return base.Validate();
        }
    }
}