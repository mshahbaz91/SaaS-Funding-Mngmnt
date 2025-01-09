using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HFund.Utility;
using HFund.Data.Models;
using HFund.Repository;

namespace HFund.Web.ValidationRules
{
    public class ActionRule : ValidationRule
    {
        public ActionRule() : base() { }

        public ValidationResult Validate(int? UserProfileID, FundingDetail fd)
        {
            if (fd != null)
            {
                Boolean? CommentRequired = UoW.TaskRepo.GetTaskById((int) fd.TaskID)?.CommentRequired;
                if ((CommentRequired ?? false) && String.IsNullOrEmpty(fd.StatusComment)) return new ValidationResult(false, "Comment is required");
                return Validate(UserProfileID, fd.FundingDetailID, fd.TaskID);
            } else return new ValidationResult(false, "Action is required");
        }

        public ValidationResult Validate(int? UserProfileID, int? id, int? TaskID)
        {
            UoW.Refresh();

            if (TaskID == null || id == null || UserProfileID == null) return new ValidationResult(false, "Action is required");

            if (!UoW.FundingDetailRepo.ActionAllowed(UserProfileID, id, TaskID))
                return new ValidationResult(false, "Action is not allowed");

            if (new[] { SystemValues.BusinessCaseSubmitApprovalTask,   SystemValues.ApproveBusinessCaseTask,
                        SystemValues.NFBusinessCaseSubmitApprovalTask, SystemValues.ApproveNFBusinessCaseTask,
                        SystemValues.SFSubmitPrioritizationTask,       SystemValues.SFApproveFundingTask}.Contains((int)TaskID))
            {
                ValidationResult result = ValidateBusinessCase((int)id);
                if (!result.IsValid) return result;
            }

            if (new[] { SystemValues.BusinessCaseSubmitApprovalTask, SystemValues.ApproveBusinessCaseTask}.Contains((int)TaskID))
            {
                ValidationResult result = ValidateApproveBusinessCase((int)id);
                if (!result.IsValid) return result;
            }

            if (new[] { SystemValues.ProjectSubmitApprovalTask, SystemValues.ApproveProjectFundingTask }.Contains((int)TaskID))
            {
                ValidationResult result = ValidateRequestAmount((int)id);
                if (!result.IsValid) return result;
            }

            if (new[] { SystemValues.ProjectSubmitApprovalTask, SystemValues.ApproveProjectFundingTask }.Contains((int)TaskID))
            {
                ValidationResult result = ValidateProjectSubmitApproval((int)id);
                if (!result.IsValid) return result;
            }

            if (TaskID == SystemValues.ApproveProjectFundingTask)
            {
                ValidationResult result = ValidateApproveProject((int)id);
                if (!result.IsValid) return result;
            }

            if (new [] {SystemValues.SubmitForApprovalTask, SystemValues.ApproveFundingTask, SystemValues.SFApproveFundingTask }.Contains((int) TaskID)) 
            {
                ValidationResult result = ValidateSubmitAproval((int)id);
                if (!result.IsValid) return result;
            }

            if (TaskID == SystemValues.CreateReplacementCharterTask)
            {
                if (!ValidateCreateReplacementCharter((int)id)) return new ValidationResult(false, "Project Charter Not Required");
            }

            if (new[] { SystemValues.ApproveFundingTask, SystemValues.SFApproveFundingTask }.Contains((int)TaskID))
            {   
                ValidationResult result = ValidateApproveFunding((int)id);
                if (!result.IsValid || result.Warning) return result;
            }

            if (new[] { SystemValues.ApproveCharterTask, SystemValues.ApproveAppendixATask }.Contains((int)TaskID))
            {
                ValidationResult result = ValidateBudgetExpense((int)id);
                if (!result.IsValid) return result;
            }

            if (new[] { SystemValues.FundingLetterReviewTask, SystemValues.SendFundingLetterTask, SystemValues.InputPaymentTask }.Contains((int)TaskID))
            {
                ValidationResult result = ValidateFundingLetter((int)id);
                if (!result.IsValid) return result;
            }

            if (TaskID == SystemValues.DeleteFundingRequestTask)
            {
                ValidationResult result = ValidatDeleteFundingRequest((int)id);
                if (!result.IsValid) return result;
            }
            
            if (SystemValues.DeleteRole.Contains((int) TaskID))
            {
                return new ValidationResult(true, true, "All the dependent documents will be deleted as well");
            }

            if (TaskID == SystemValues.FundingLetterVoidTask)
            {
                ValidationResult result = ValidateVoidFundingLetter((int)id);
                if (!result.IsValid) return result;
            }

            if (TaskID == SystemValues.InputPaymentTask)
            {
                ValidationResult result = ValidateInputPayment((int)id);
                if (!result.IsValid) return result;
            }

            if (TaskID == SystemValues.StartProjectTask)
            {
                ValidationResult result = ValidateStartProject((int)id);
                if (!result.IsValid) return result;
            }

            if (TaskID == SystemValues.RevertBusinessCaseTask)
            {
                ValidationResult result = ValidateRevertBusinessCase((int)id);
                if (!result.IsValid || result.Warning) return result;
            }

            if (TaskID == SystemValues.RevertProjectTask)
            {
                ValidationResult result = ValidateRevertProject((int)id);
                if (!result.IsValid || result.Warning) return result;
            }

            if (TaskID == SystemValues.ReceiveReportTask)
            {
                ValidationResult result = ValidateReceiveReport((int)id);
                if (!result.IsValid || result.Warning) return result;
            }

            if (new[] { SystemValues.FowardHSPApprovalTask, SystemValues.ApproveCharterTask, SystemValues.ApproveAppendixATask }.Contains((int)TaskID))
            {
                ValidationResult result = ValidateCharter((int)id);
                if (!result.IsValid || result.Warning) return result;
            }
 
            /* Bypass the HSP Finance Lead Checking
           if (TaskID == SystemValues.StartProjectTask)
           {
               IEnumerable<String> HSPReportLead = UoW.FundingContactRepo.GetContactEmailByRole((int)id, SystemValues.HSPReportLeadRole);
               if (HSPReportLead == null || HSPReportLead.Count() == 0)
               {
                   return new ValidationResult(false, "HSP Finance Lead Required");
               }

           }
           */

            return base.Validate();
        }

        private ValidationResult ValidateApproveBusinessCase(int id)
        {
            return ApplicationServices.ValidationManager.BudgetYearRule.Validate(id); 
        }

        private ValidationResult ValidateBusinessCase(int id)
        {
            var fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            if (fd != null)
            {
                int? fiscalYearID = fd.FiscalYear;
                int NumActionPlan = (from c in UoW.DBContext.IdentifiedActionPlans where (c.FundingDetailID == id) select (c.FundingDetailID)).Count();
                if (NumActionPlan <= 0) return new ValidationResult(false, "Action Plan Is Missing");
                if (new int[] { SystemValues.BusinessCaseTypeID, SystemValues.NFBusinessCaseTypeID }.Contains(fd.FundingEntityTypeID)) {
                    int NumIndicator = (from c in UoW.DBContext.PerformanceIndicators where (c.FundingDetailID == id) select (c.FundingDetailID)).Count();
                    if (NumIndicator <= 0) return new ValidationResult(false, "Performance Indicators Are Missing");
                }
                if (UoW.DeliverableRepo.GetAllDeliverable_FilterByFundingDetailId(id).Count() <= 0) return new ValidationResult(false, "Deliverables Are Missing");
                List<String> strategicIndicator = null;
                List<String> errorMessages = new List<string>();
                strategicIndicator = (from c in UoW.DBContext.IdentifiedFundingIndicators where c.FundingDetailID == id select c.FundingIndicatorID.ToString()).ToList();
                if (!UoW.FundingIndicatorRepo.RequiredFundingIndicatorRecordsValidation(fiscalYearID, strategicIndicator.ToArray(), ref errorMessages))
                    return new ValidationResult(false, errorMessages.FirstOrDefault());
            }
            else return new ValidationResult(false, "Business Case Not Found");
            return base.Validate();
        }

        private ValidationResult ValidateCharter(int id)
        {
            if (UoW.DeliverableRepo.GetAllDeliverable_FilterByFundingDetailId(id).Count() <= 0) return new ValidationResult(false, "Deliverables Are Missing");
            return base.Validate();
        }

        private ValidationResult ValidateRequestAmount(int id)
        {
            return ApplicationServices.ValidationManager.RequestAmountRule.Validate(id);
        }

        private ValidationResult ValidateApproveProject(int id)
        {
            ValidationResult ValidateResult = ApplicationServices.ValidationManager.AllocatedAmountRule.Validate(id);
            if (ValidateResult.IsValid)
                return ApplicationServices.ValidationManager.FundingBucketRule.Validate(id);
            else
                return ValidateResult;
        }

        private ValidationResult ValidateProjectSubmitApproval(int id)
        {
            Project pr = UoW.ProjectRepo.GetProjectById(id);
            if (pr != null)
            {
                if (pr.CharterRequiredInd == true)
                {
                    ProjectCharter pc = UoW.ProjectCharterRepo.GetActiveProjectCharterByProjectId(id);
                    if (pc == null) return new ValidationResult(false, "Project Charter Not Approved");
                } else
                {
                    AppendixA aa = UoW.AppendixARepo.GetActiveAppendixAByProjectId(id);
                    if (aa == null) return new ValidationResult(false, "Appendix A Not Approved");
                }
              // 2017-01-31 Oliver Sin - Remove Requirement (Funding Letter Received)
              //if (!UoW.ProjectRepo.FundingLetterReceived(id)) return new ValidationResult(false, "Funding Letter Not Received");
                if (!UoW.ProjectRepo.FundingLetterCreated(id))  return new ValidationResult(false, "Funding Letter Not Created");
            }
            else return new ValidationResult(false, "Project Detail Not Found");
            return base.Validate();
        }

        private ValidationResult ValidateApproveFunding(int id)
        {
            ValidationResult ValidateResult = ApplicationServices.ValidationManager.RequestAmountRule.Validate(id);
            if (ValidateResult.IsValid)
            {
                ValidateResult = ApplicationServices.ValidationManager.AllocatedAmountRule.Validate(id);
                if (ValidateResult.IsValid)
                {
                    ValidationResult ValidateBucketResult = ApplicationServices.ValidationManager.FundingBucketRule.Validate(id);
                    if (!ValidateBucketResult.IsValid)
                    {
                        return new ValidationResult(true, true, ValidateBucketResult.ErrorContent);
                    }
                }
            }
            return ValidateResult;
        }

        private ValidationResult ValidateSubmitAproval(int id)
        {
            var fr = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(id);
            if (fr.FundingDetail.FundingEntityTypeID == SystemValues.FundingRequestTypeID)
            {
                var bc = UoW.FundingDetailRepo.GetFundingDetailById(fr.FundingDetail.FundingEntityID);
                if ((bc.FundingEntityStatusID ?? 0) != SystemValues.BusinessCaseApprovedStatus) return new ValidationResult(false, "Business Case not approved yet");
            }
            if (fr == null || fr.PlanningPriorityRanking > SystemValues.LeastApprovalRanking) return new ValidationResult(false, "Only Funding Requests are priority #1 and/or #2 can go for approval");
            return base.Validate();
        }
        private ValidationResult ValidatDeleteFundingRequest(int id)
        {
            var fr = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(id);
            if (fr == null || fr.IsFirst == true) return new ValidationResult(false, "Only Additional Funding Requests can be deleted");
            return base.Validate();
        }

        private Boolean ValidateCreateReplacementCharter(int id)
        {
            var pr = UoW.ProjectRepo.GetProjectById(id);
            return (pr == null || pr.CharterRequiredInd == false) ? false : true;
        }

        private ValidationResult ValidateBudgetExpense(int id)
        {
            var fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            var pd = UoW.FundingDetailRepo.GetFundingDetailById(fd.FundingEntityID);
            if (fd == null || pd == null) return new ValidationResult(false, "System Error");
            Decimal? BudgetAmount = UoW.BudgetExpenseRepo.GetAllBudgetExpense_FilterByFundingDetailId(id).AsEnumerable().Sum(amt => (amt.BudgetAmount == null) ? 0 : (decimal)amt.BudgetAmount);
            Decimal? PaidAmount = UoW.ProjectRepo.TotalFundingLetterAmount(pd.FundingDetailID);
            if (BudgetAmount != PaidAmount) return new ValidationResult(false, "Budget Expense Not Match Funding Letter Amount");
            return base.Validate();
        }

        private ValidationResult ValidateFundingLetter(int id)
        {
            ValidationResult ValidateResult = ApplicationServices.ValidationManager.PaidAmountRule.Validate(id);
            if (!ValidateResult.IsValid) return ValidateResult;

            var fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            var pd = UoW.FundingDetailRepo.GetFundingDetailById(fd.FundingEntityID);
            if (fd == null || pd == null) return new ValidationResult(false, "System Error");

            if (pd.FundingEntityTypeID == SystemValues.ProjectTypeID)
            {
                var CharterAppendixID = UoW.ProjectCharterRepo.GetCurrentProjectCharter(fd.FundingEntityID)?.FundingDetailID;
                if (CharterAppendixID == null) CharterAppendixID = UoW.AppendixARepo.GetCurrentAppendixA(fd.FundingEntityID)?.FundingDetailID;
                if (CharterAppendixID != null)
                {
                    Decimal? BudgetAmount = UoW.BudgetExpenseRepo.GetAllBudgetExpense_FilterByFundingDetailId((int) CharterAppendixID).AsEnumerable().Sum(amt => (amt.BudgetAmount == null) ? 0 : (decimal)amt.BudgetAmount);
                    Decimal? PaidAmount = UoW.ProjectRepo.TotalFundingLetterAmount(pd.FundingDetailID);
                    if (BudgetAmount != PaidAmount) return new ValidationResult(false, "Budget Expense Not Match Funding Letter Amount");
                }
            }
            return base.Validate();
        }

        private ValidationResult ValidateVoidFundingLetter(int id)
        {
            FundingDetail fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            if (fd != null)
            {
                FundingDetail pd = UoW.FundingDetailRepo.GetFundingDetailById(fd.FundingEntityID);
                if (pd == null) return new ValidationResult(false, "Project Not Found");
                if (pd.FundingEntityTypeID != SystemValues.ProjectTypeID) return new ValidationResult(false, "Void Not Allowed for Non-Discretionary Funding");
                if (UoW.ProjectRepo.IsStarted(pd.FundingDetailID)) return new ValidationResult(false, "Project Already Started");
            }
            else return new ValidationResult(false, "Funding Letter Not Found");
            return base.Validate();
        }
        private ValidationResult ValidateInputPayment(int id)
        {
            FundingDetail fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            if (fd != null)
            {
                FundingDetail pd = UoW.FundingDetailRepo.GetFundingDetailById(fd.FundingEntityID);
                if (pd == null) return new ValidationResult(false, "Project Not Found");
                if (pd.FundingEntityTypeID == SystemValues.ProjectTypeID && !UoW.ProjectRepo.IsApproved(pd.FundingDetailID)) return new ValidationResult(false, "Project Not Approved");
            }
            else return new ValidationResult(false, "Funding Letter Not Found");
            return base.Validate();
        }

        private ValidationResult ValidateStartProject(int id)
        {
            if (!UoW.ProjectRepo.FundingLetterReceived(id)) return new ValidationResult(false, "Funding Letter Not Received");
            return base.Validate();
        }

        private ValidationResult ValidateRevertBusinessCase (int id)
        {
            if (UoW.BusinessCaseRepo.ContainsAdditionalFunding(id)) return new ValidationResult(false, "Contains Additional Funding Requests");
            if (UoW.BusinessCaseRepo.ContainsProject(id)) return new ValidationResult(true, true, "Projects Exists");
            return base.Validate();
        }

        private ValidationResult ValidateRevertProject(int id)
        {
            String ErrorMsg = String.Empty;
            ErrorMsg = UoW.ProjectRepo.IllegibleRevert(id);
            if (!String.IsNullOrEmpty(ErrorMsg)) return new ValidationResult(false, ErrorMsg);
            return base.Validate();
        }

        private ValidationResult ValidateReceiveReport(int id)
        {
            return ApplicationServices.ValidationManager.ReceiveReportRule.Validate(id);
        }
    }
}