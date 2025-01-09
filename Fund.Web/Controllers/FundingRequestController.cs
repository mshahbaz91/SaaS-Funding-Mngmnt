using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.Utility;
using HFund.Repository;
using HFund.Web.ApplicationServices;


namespace HFund.Web.Controllers
{


    [Authorize(Roles = Common.LHINBaseRole)]
    public class FundingRequestController : BaseController
    {

        public ActionResult Search(int? queryAction)
        {
            int _queryAction = (queryAction ?? 0);
            int _realQueryAction = 0;
            ViewBag.QueryActionName = " Search ";
            UserProfile _userProfile = GetCurrentUser();

            ViewBag.FundingManagementTypeID = UoW.FundingManagementTypeRepo.GetFundingManagementType_ddl();
            ViewBag.FiscalYear = UoW.FiscalYearRepo.GetFiscalYear_ddl();
            ViewBag.DepartmentID = UoW.DepartmentRepo.GetDepartment_ddl();
            ViewBag.ThemeID = UoW.ReportingThemeRepo.GetReportingTheme_ddl();
            ViewBag.ProfileID = UoW.ProfileRepo.GetProfile_ddl();
            ViewBag.SectorID = UoW.SectorRepo.GetSector_ddl();
            ViewBag.LHINRoleID = UoW.LHINRoleRepo.GetLHINRole_ddl();
            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.GetPopulationType_ddl();
            ViewBag.EnablerTypeID = UoW.EnablerTypeRepo.GetEnablerType_ddl();

            // ViewBag.LhinUserProfileId = UoW.UserProfileRepo.SetALLLHINUser_ddl(_userProfile.UserProfileID);
            ViewBag.LhinUserProfileId = UoW.UserProfileRepo.GetAllLHINUser_ddl();

            ViewBag.CurrentUserProfileId = _userProfile.UserProfileID;

      
            // redefine _action
            switch (_queryAction)
            {
                case (int)FundingRequestUrlQueryActionEnum.InProgress:
                    _realQueryAction = (int)FundingRequestUrlQueryActionEnum.InProgress;
                    ViewBag.QueryActionName = " In Progress ";
                    break;

                case (int)FundingRequestUrlQueryActionEnum.Complete:
                    _realQueryAction = (int)FundingRequestUrlQueryActionEnum.Complete;
                    ViewBag.QueryActionName = " Complete ";
                    break;

                case (int)FundingRequestUrlQueryActionEnum.Approved:
                    _realQueryAction = (int)(int)FundingRequestUrlQueryActionEnum.Approved;
                    ViewBag.QueryActionName = " Approved ";
                    break;

                case (int)FundingRequestUrlQueryActionEnum.Cancelled:
                    _realQueryAction = (int)FundingRequestUrlQueryActionEnum.Cancelled;
                    ViewBag.QueryActionName = " Cancelled ";
                    break;

                default:
                    ViewBag.QueryActionName = " Search ";
                    _realQueryAction = (int)FundingRequestUrlQueryActionEnum.Default;
                    break;
            }

            ViewBag.QueryAction = _realQueryAction;

            return View();
        }



        // GET: FundingRequest
        public ActionResult Create(int id)
        {
            // security and logic checking
            FundingDetail _fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            BusinessCase _bc = UoW.BusinessCaseRepo.GetBusinessCaseByFundingDetailId(id);
            if (_fd.FundingEntityStatusID != SystemValues.BusinessCaseApprovedStatus || _fd.FundingEntityTypeID != SystemValues.BusinessCaseTypeID)
            {
                throw new HttpException(404, "Not Found, or Id is invalid .");
            }

            bool _dateAllowedFunding = Common.BusinessCaseAllowAddFunding_RestrictByFiscalYearEndDate((int)_fd.FiscalYear);
            if (_dateAllowedFunding == false)
            {
                throw new HttpException(404, "Fiscal year end data is March 31 .");
            }

            string _Message = string.Empty;
            int _currentYear = SystemValues.CurrentFiscalYear;

            FundingRequestVM model = new FundingRequestVM();
            model.BusinessCaseID = id;
            model.FiscalYear = _currentYear;
            model.Name = _fd.Name;

            // disabled program since 2016
           // model.ProgramID = _bc.ProgramID;

            model.FundingManagementTypeID = _bc.FundingManagementTypeID;
            model.DepartmentID = _fd.DepartmentID;
            model.TCLHINLeadID = _fd.TCLHINLeadID;
            model.SMTLeadID = _fd.SMTLeadID;
            model.HSPID = _fd.HSPID;
            model.SectorID = _fd.SectorID;
            model.PopulationTypeID = _fd.PopulationTypeID;
            model.InvestmentPriorityID = _fd.InvestmentPriorityID;
            model.StrategicPriorityID = _fd.StrategicPriorityID;
            model.PopulationDescription = _fd.PopulationDesc;
            model.InvestmentPriorityDescription = _fd.InvestmentPriorityDesc;
            model.StrategicPriorityDescription = _fd.StrategicPriorityDesc;
            model.PlannedStartDate = _fd.PlannedStartDate;
            model.PlannedEndDate = _fd.PlannedEndDate;
            model.Description = _fd.Description;
            model.IssueDescription = _fd.IssuesDescription;
            model.ObjectiveDescription = _fd.ObjectiveDescription;
            model.OutcomeDescription = _fd.OutcomeDescription;
            model.Comments = _fd.Comments;
            model.InitiatedBy = _bc.InitiatedBy;
            model.BCInitiateDate = _fd.BCInitiationDate;
            //model.RequestedFundingAmt = _bc.RequestedFundingAmount;

            //if (model.RequestedFundingAmt.HasValue)
            //{
            //    string _tempAmt = model.RequestedFundingAmt.Value.ToString("C");
            //    model.RequestedFundingAmtText = Common.RemoveDollarSign(_tempAmt).Trim();
            //}

            ViewBag.FiscalYear = UoW.FiscalYearRepo.SetFiscalYear_ddl(model.FiscalYear);
            // Depends on fiscalYear
            if (model.FiscalYear.HasValue)
            {
                // filter by fiscalYear
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl_filterByYear(model.FiscalYear, model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl_filterByYear(model.FiscalYear, model.StrategicPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl_filterByYear(model.FiscalYear, model.ProgramID);
            }
            else
            {
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl(model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl(model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl(model.ProgramID);
            }

            ViewBag.FundingManagementTypeID = UoW.FundingManagementTypeRepo.SetFundingManagementType_ddl(model.FundingManagementTypeID);
            ViewBag.DepartmentID = UoW.DepartmentRepo.SetDepartment_ddl(model.DepartmentID);

            ViewBag.TCLHINLeadID = UoW.UserProfileRepo.SetUserProfileLead_ddl(model.TCLHINLeadID);
            ViewBag.SMTLeadID = UoW.UserProfileRepo.SetUserProfileDirector_ddl(model.SMTLeadID);
           

            ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);
            ViewBag.HSPID = Base_SetAccounts_BySectorId(model.SectorID, model.HSPID);

            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.SetPopulationType_ddl(model.PopulationTypeID);
     
            ViewBag.ApprovedByID = UoW.UserProfileRepo.SetUserProfileApprover_ddl(model.ApprovedByID);


            ViewBag.WorkPlanInd = Common.GetYesNo_DDL();
            ViewBag.FromPrevYearInd = Common.GetYesNo_DDL();

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(FundingRequestVM model)
        {
            string _Message = string.Empty;

            ViewBag.FiscalYear = UoW.FiscalYearRepo.SetFiscalYear_ddl(model.FiscalYear);
            // Depends on fiscalYear
            if (model.FiscalYear.HasValue)
            {
                // filter by fiscalYear
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl_filterByYear(model.FiscalYear, model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl_filterByYear(model.FiscalYear, model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl_filterByYear(model.FiscalYear, model.ProgramID);
            }
            else
            {
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl(model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl(model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl(model.ProgramID);
            }

            ViewBag.FundingManagementTypeID = UoW.FundingManagementTypeRepo.SetFundingManagementType_ddl(model.FundingManagementTypeID);
            ViewBag.DepartmentID = UoW.DepartmentRepo.SetDepartment_ddl(model.DepartmentID);

            ViewBag.TCLHINLeadID = UoW.UserProfileRepo.SetUserProfileLead_ddl(model.TCLHINLeadID);
            ViewBag.SMTLeadID = UoW.UserProfileRepo.SetUserProfileDirector_ddl(model.SMTLeadID);

            ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);
            ViewBag.HSPID = Base_SetAccounts_BySectorId(model.SectorID, model.HSPID);

            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.SetPopulationType_ddl(model.PopulationTypeID);
            ViewBag.ApprovedByID = UoW.UserProfileRepo.SetUserProfileApprover_ddl(model.ApprovedByID);


            if (model.WorkPlanInd.HasValue)
            {
                ViewBag.WorkPlanInd = Common.SetYesNo_DDL(model.WorkPlanInd.ToString());
            }
            else
            {
                ViewBag.WorkPlanInd = Common.GetYesNo_DDL();
            }

            if (model.FromPrevYearInd.HasValue)
            {
                ViewBag.FromPrevYearInd = Common.SetYesNo_DDL(model.FromPrevYearInd.ToString());
            }
            else
            {
                ViewBag.FromPrevYearInd = Common.GetYesNo_DDL();
            }


            // process amount with comma with issue
            //if (!string.IsNullOrEmpty(model.RequestedFundingAmtText) || !string.IsNullOrWhiteSpace(model.RequestedFundingAmtText))
            //{
            //    string _RequestedAmtTxt = Common.RemoveDollarSign(model.RequestedFundingAmtText);
            //    decimal _RequestedAmt;
            //    if (Decimal.TryParse(_RequestedAmtTxt, out _RequestedAmt))
            //    {
            //        if (_RequestedAmt <= Common.MAX_REQUEST_AMOUNT && _RequestedAmt > 0)
            //        {
            //            model.RequestedFundingAmt = _RequestedAmt;
            //            // reformat back
            //            model.RequestedFundingAmtText = Common.decimalConvertToCurrencyFormat(model.RequestedFundingAmt);
            //        }
            //        else
            //        {
            //            ModelState.AddModelError("RequestedFundingAmtText", "must less than " + Common.MAX_REQUEST_AMOUNT.ToString() + " or great than 0");
            //            return View(model);
            //        }
            //    }
            //}

            //if (!string.IsNullOrEmpty(model.AllocatedFundingAmtText) || !string.IsNullOrWhiteSpace(model.AllocatedFundingAmtText))
            //{
            //    string _AllocatedAmtTxt = Common.RemoveDollarSign(model.AllocatedFundingAmtText);
            //    decimal _AllocatedAmt;
            //    if (Decimal.TryParse(_AllocatedAmtTxt, out _AllocatedAmt))
            //    {
            //        if (_AllocatedAmt <= Common.MAX_REQUEST_AMOUNT)
            //        {
            //            model.AllocatedFundingAmt = _AllocatedAmt;
            //            // reformat back
            //            model.AllocatedFundingAmtText = Common.decimalConvertToCurrencyFormat(model.AllocatedFundingAmt);
            //        }
            //        else
            //        {
            //            ModelState.AddModelError("AllocatedFundingAmtText", "Can not more than " + Common.MAX_REQUEST_AMOUNT.ToString());
            //            return View(model);
            //        }
            //    }
            //}


            if (ModelState.IsValid)
            {
                try
                {
                    Dictionary<int, string> _acctList = UoW.SectorRepo.Api_GetAccounts_BySectorId((int)model.SectorID);
                    if (model.HSPID.HasValue)
                    {
                        if (!_acctList.ContainsKey((int)model.HSPID))
                        {
                            ModelState.AddModelError("HSPID", " is invalid .");
                            return View(model);
                        }
                    }

                    string _createdMessage = string.Empty;

                    int _FundingDetailID = AddNewFundingRequest(model, out _createdMessage);

                    if (_FundingDetailID > 0)
                    {

                        TempData[Common.FR_TempDataKey] = Common.FR_CreateSuccessMessage;
                        return RedirectToAction("Edit", new { id = _FundingDetailID });
                    }
                    else
                    {
                        ModelState.AddModelError("", _createdMessage);
                    }

                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message.ToString());
                    UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "FundingRequest/Create");
                    UoW.SaveChanges();
                }
            }



            return View(model);
        }


        public ActionResult Edit(int id)
        {
            FundingRequestVM model = GetFundingRequestByFundingDetailId(id);
            if (model == null)
            {
                throw new HttpException(404, "Not Found, FundingRequest/Edit id = " + id);
            }

            if (model.FundingEntityTypeID != SystemValues.FundingRequestTypeID)
            {
                throw new HttpException(404, "Not Found, or Id is invalid .");
            }

            ViewBag.BusinessCaseBreadCrumbVM = UoW.FundingDetailRepo.GetBusinessCaseBreadCrumbPath_ByFundingDetailId(id);

            ViewBag.FiscalYear = UoW.FiscalYearRepo.SetFiscalYear_ddl(model.FiscalYear);
            // Depends on fiscalYear
            if (model.FiscalYear.HasValue)
            {
                // filter by fiscalYear
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl_filterByYear(model.FiscalYear, model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl_filterByYear(model.FiscalYear, model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl_filterByYear(model.FiscalYear, model.ProgramID);
            }
            else
            {
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl(model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl(model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl(model.ProgramID);
            }

            ViewBag.FundingManagementTypeID = UoW.FundingManagementTypeRepo.SetFundingManagementType_ddl(model.FundingManagementTypeID);
            ViewBag.DepartmentID = UoW.DepartmentRepo.SetDepartment_ddl(model.DepartmentID);
       
            ViewBag.TCLHINLeadID = UoW.UserProfileRepo.SetUserProfileLead_ddl(model.TCLHINLeadID);
            ViewBag.SMTLeadID = UoW.UserProfileRepo.SetUserProfileDirector_ddl(model.SMTLeadID);
         
            ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);
            ViewBag.HSPID = Base_SetAccounts_BySectorId(model.SectorID, model.HSPID);

            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.SetPopulationType_ddl(model.PopulationTypeID);
            ViewBag.ApprovedByID = UoW.UserProfileRepo.SetUserProfileApprover_ddl(model.ApprovedByID);

            ViewBag.ApporvedByID_Name = string.Empty;
            UserProfile _ApproverUser = UoW.UserProfileRepo.GetUserProfileById(Convert.ToInt32(model.ApprovedByID));
            if (_ApproverUser != null)
            {
                ViewBag.ApporvedByID_Name = _ApproverUser.UserFullName;
            }

         
            //ViewBag.WorkPlanInd = Common.GetYesNo_DDL();
            //ViewBag.FromPrevYearInd = Common.GetYesNo_DDL();

            if (model.WorkPlanInd.HasValue)
            {
                ViewBag.WorkPlanInd = Common.SetYesNo_DDL(model.WorkPlanInd.ToString());
            }
            else
            {
                ViewBag.WorkPlanInd = Common.GetYesNo_DDL();
            }

            if (model.FromPrevYearInd.HasValue)
            {
                ViewBag.FromPrevYearInd = Common.SetYesNo_DDL(model.FromPrevYearInd.ToString());
            }
            else
            {
                ViewBag.FromPrevYearInd = Common.GetYesNo_DDL();
            }

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(FundingRequestVM model, string submitBtn)
        {

            ViewBag.FiscalYear = UoW.FiscalYearRepo.SetFiscalYear_ddl(model.FiscalYear);
            ViewBag.BusinessCaseBreadCrumbVM = UoW.FundingDetailRepo.GetBusinessCaseBreadCrumbPath_ByFundingDetailId((int)model.FundingDetailID);
            // Depends on fiscalYear
            if (model.FiscalYear.HasValue)
            {
                // filter by fiscalYear
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl_filterByYear(model.FiscalYear, model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl_filterByYear(model.FiscalYear, model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl_filterByYear(model.FiscalYear, model.ProgramID);
            }
            else
            {
                ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl(model.StrategicPriorityID);
                ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl(model.InvestmentPriorityID);
                ViewBag.ProgramID = UoW.ProgramRepo.SetProgram_ddl(model.ProgramID);
            }

            ViewBag.FundingManagementTypeID = UoW.FundingManagementTypeRepo.SetFundingManagementType_ddl(model.FundingManagementTypeID);
            ViewBag.DepartmentID = UoW.DepartmentRepo.SetDepartment_ddl(model.DepartmentID);
          
            ViewBag.TCLHINLeadID = UoW.UserProfileRepo.SetUserProfileLead_ddl(model.TCLHINLeadID);
            ViewBag.SMTLeadID = UoW.UserProfileRepo.SetUserProfileDirector_ddl(model.SMTLeadID);
          
            ViewBag.ApporvedByID_Name = string.Empty;
            UserProfile _ApproverUser = UoW.UserProfileRepo.GetUserProfileById(Convert.ToInt32(model.ApprovedByID));
            if (_ApproverUser != null)
            {
                ViewBag.ApporvedByID_Name = _ApproverUser.UserFullName;
            }

            ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);
            ViewBag.HSPID = Base_SetAccounts_BySectorId(model.SectorID, model.HSPID);

            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.SetPopulationType_ddl(model.PopulationTypeID);
          
            ViewBag.ApprovedByID = UoW.UserProfileRepo.SetUserProfileApprover_ddl(model.ApprovedByID);

         
            if (model.WorkPlanInd.HasValue)
            {
                ViewBag.WorkPlanInd = Common.SetYesNo_DDL(model.WorkPlanInd.ToString());
            }
            else
            {
                ViewBag.WorkPlanInd = Common.GetYesNo_DDL();
            }

            if (model.FromPrevYearInd.HasValue)
            {
                ViewBag.FromPrevYearInd = Common.SetYesNo_DDL(model.FromPrevYearInd.ToString());
            }
            else
            {
                ViewBag.FromPrevYearInd = Common.GetYesNo_DDL();
            }

            // process amount with comma with issue
            if (!string.IsNullOrEmpty(model.RequestedFundingAmtText) || !string.IsNullOrWhiteSpace(model.RequestedFundingAmtText))
            {
                string _RequestedAmtTxt = Common.RemoveDollarSign(model.RequestedFundingAmtText);
                decimal _RequestedAmt;
                if (Decimal.TryParse(_RequestedAmtTxt, out _RequestedAmt))
                {
                    if (_RequestedAmt <= Common.MAX_REQUEST_AMOUNT && _RequestedAmt > 0)
                    {
                        model.RequestedFundingAmt = _RequestedAmt;
                        // reformat back
                        model.RequestedFundingAmtText = Common.decimalConvertToCurrencyFormat(model.RequestedFundingAmt);
                    }
                    else
                    {
                        // ModelState.AddModelError("RequestedFundingAmtText", "Can not more than " + Common.MAX_REQUEST_AMOUNT.ToString());
                        ModelState.AddModelError("RequestedFundingAmtText", "must less than " + Common.MAX_REQUEST_AMOUNT.ToString() + " or great than 0");
                        return View(model);
                    }
                }
                else
                {
                    ModelState.AddModelError("RequestedFundingAmtText", "error occured ...");
                    return View(model);
                }
            }

            if (!string.IsNullOrEmpty(model.AllocatedFundingAmtText) || !string.IsNullOrWhiteSpace(model.AllocatedFundingAmtText))
            {
                string _AllocatedAmtTxt = Common.RemoveDollarSign(model.AllocatedFundingAmtText);
                decimal _AllocatedAmt;
                if (Decimal.TryParse(_AllocatedAmtTxt, out _AllocatedAmt))
                {
                    if (_AllocatedAmt <= Common.MAX_REQUEST_AMOUNT)
                    {
                        model.AllocatedFundingAmt = _AllocatedAmt;
                        // reformat back
                        model.AllocatedFundingAmtText = Common.decimalConvertToCurrencyFormat(model.AllocatedFundingAmt);
                    }
                    else
                    {
                        ModelState.AddModelError("AllocatedFundingAmtText", "Can not more than " + Common.MAX_REQUEST_AMOUNT.ToString());
                        return View(model);
                    }
                }
                else
                {
                    ModelState.AddModelError("AllocatedFundingAmtText", "error occured ...");
                    return View(model);
                }
            }


            if (ModelState.IsValid)
            {
                Dictionary<int, string> _acctList = UoW.SectorRepo.Api_GetAccounts_BySectorId((int)model.SectorID);
                if (model.HSPID.HasValue)
                {
                    if (!_acctList.ContainsKey((int)model.HSPID))
                    {
                        ModelState.AddModelError("HSPID", " is invalid .");
                        return View(model);
                    }
                }

                try
                {
                    string _updatedMessage = string.Empty;

                    int _FundingDetailID = UpdateFundingRequest(model, out _updatedMessage);
                    if (_FundingDetailID > 0)
                    {

                        TempData[Common.FR_TempDataKey] = Common.FR_UpdateSuccessMessage;

                        if (submitBtn == Common.BTNSaveNext)
                        {
                            return RedirectToAction("FundingRequest_Details", "RequiredDocument", new { id = model.FundingDetailID });
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("", _updatedMessage);
                    }


                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message.ToString());
                    UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "FundingRequest/Edit");
                    UoW.SaveChanges();
                }
            }



            return View(model);
        }


        private int AddNewFundingRequest(FundingRequestVM frVM, out string message)
        {
            int retVal = 0;
            message = string.Empty;
            Exception _Exception = new Exception("AddNewFundingRequest");
            string _CurrentUserId = GetCurrentUser().UserID;

            using (var tran = UoW.DBContext.Database.BeginTransaction())
            {
                try
                {

                    FundingDetail fd = new FundingDetail();

                    // fd.FundingDetailID = 0;
                    // update from Parent -> businessCaseId
                    fd.FundingEntityID = (int)frVM.BusinessCaseID;

                    // fd.FundingEntityTypeID = 2;     // Hard Code ?
                    fd.FundingEntityTypeID = SystemValues.FundingRequestTypeID;

                    fd.Description = frVM.Description;
                    fd.Name = frVM.Name;
                    fd.SectorID = frVM.SectorID;
                    fd.PopulationTypeID = frVM.PopulationTypeID;
                    fd.StrategicPriorityID = frVM.StrategicPriorityID;
                    fd.InvestmentPriorityID = frVM.InvestmentPriorityID;
                    fd.TCLHINLeadID = frVM.TCLHINLeadID;
                    fd.SMTLeadID = frVM.SMTLeadID;
                    fd.PlannedStartDate = frVM.PlannedStartDate;
                    fd.PlannedEndDate = frVM.PlannedEndDate;
                    fd.ObjectiveDescription = frVM.ObjectiveDescription;
                    fd.OutcomeDescription = frVM.OutcomeDescription;
                    fd.Comments = frVM.Comments;
                    fd.IssuesDescription = frVM.IssueDescription;
                    fd.HSPID = frVM.HSPID;
                    fd.DepartmentID = frVM.DepartmentID;

                    fd.FundingEntityStatusID = SystemValues.FundingRequestInitialStatus;
                    fd.TaskID = SystemValues.FundingRequestInitialTask;

                    fd.FiscalYear = frVM.FiscalYear;

                    // second added
                    fd.BCInitiationDate = frVM.BCInitiateDate;
                   // fd.BCApprovalDate = frVM.ApprovalDate;
                    fd.StrategicPriorityDesc = frVM.StrategicPriorityDescription;
                    fd.InvestmentPriorityDesc = frVM.InvestmentPriorityDescription;
                    fd.PopulationDesc = frVM.PopulationDescription;
                  
                    fd.StatusUpdatedBy = GetCurrentUser().UserProfileID;
                    fd.StatusUpdatedDate = DateTime.Now;
                    fd.CreatedDate = DateTime.Now;
                    fd.CreatedBy = _CurrentUserId;
                    fd.UpdatedDate = DateTime.Now;
                    fd.UpdatedBy = _CurrentUserId;
                   

                    UoW.DBContext.FundingDetails.Add(fd);
                    UoW.DBContext.SaveChanges();

                    int _fundingDetailID = fd.FundingDetailID;

                    FundingRequest fq = new FundingRequest();
                    fq.FundingDetailID = _fundingDetailID;
                    fq.FundingManagementTypeID = frVM.FundingManagementTypeID;

                    fq.RequestedFundingAmt = frVM.RequestedFundingAmt;
                    fq.AllocatedFundingAmt = fq.RequestedFundingAmt;
                    // fq.AllocatedFundingAmt = bcVM.AllocatedFundingAmt;
                    // set it default , copy RequestedFundingAmt to AllocatedFundingAmt
                    
                    // fq.RequestedFundingAmt = frVM.RequestedFundingAmt;
                    // fq.AllocatedFundingAmt = fq.RequestedFundingAmt;


                    fq.PlanningPriorityRanking = Common.PlANNING_PRIORITY_RANKING_DEFAULTVALUE;
                    fq.InvestmentPlanRanking = Common.INVESTMENT_PLAN_RANKING_DEFAULTVALUE;
                    fq.WorkPlanInd = frVM.WorkPlanInd;
                    fq.FromPrevYearInd = frVM.FromPrevYearInd;
                    fq.ApprovalDate = frVM.ApprovalDate;
                    fq.ApprovedByID = frVM.ApprovedByID;
                    fq.InitiatedBy = frVM.InitiatedBy;
                   
                    fq.ProgramID = frVM.ProgramID;
                    fq.CreatedDate = DateTime.Now;
                    fq.CreatedBy = _CurrentUserId;
                    fq.UpdatedDate = DateTime.Now;
                    fq.UpdatedBy = _CurrentUserId;
                    UoW.DBContext.FundingRequests.Add(fq);
                    UoW.DBContext.SaveChanges();

                    // Add Require Document By Default
                    var _documentTyeList = from docType in UoW.DBContext.DocumentTypes
                                           where docType.ActiveInd == true && docType.DefaultInd == true &&
                                                    docType.FundingEntityTypeID == SystemValues.FundingRequestTypeID
                                           select docType;
                    foreach (var _docType in _documentTyeList)
                    {
                        RequiredDocument _rd = new RequiredDocument();
                        _rd.FundingDetailID = fd.FundingDetailID;
                        _rd.DocumentTypeID = _docType.DocumentTypeID;
                        _rd.CreatedBy = _CurrentUserId;
                        _rd.CreatedDate = DateTime.Now;
                        _rd.UpdatedBy = _CurrentUserId;
                        _rd.UpdatedDate = DateTime.Now;
                        UoW.DBContext.RequiredDocuments.Add(_rd);
                    }

                    UoW.DBContext.SaveChanges();

                    tran.Commit();

                    retVal = _fundingDetailID;


                }
                catch (Exception ex)
                {
                    _Exception = ex;
                    retVal = 0;
                    tran.Rollback();
                    message = "Server Internal Error ...";
                }

            }

            if (retVal == 0)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(_Exception, string.Empty, string.Empty, "FundingRequest/AddNewFundingRequest");
            }


            return retVal;
        }


        private FundingRequestVM GetFundingRequestByFundingDetailId(int id)
        {
            FundingRequestVM model = null;
            FundingDetail _fd = UoW.FundingDetailRepo.GetFundingDetailById(id);
            FundingRequest _fr = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(id);
            if (_fd != null && _fr != null)
            {
                model = new FundingRequestVM();
                model.BusinessCaseID = _fd.FundingEntityID;
                model.FundingDetailID = _fd.FundingDetailID;
                model.FundingEntityID = _fd.FundingEntityID;
                model.FundingEntityTypeID = _fd.FundingEntityTypeID;
                model.Description = _fd.Description;
                model.Name = _fd.Name;
                model.SectorID = _fd.SectorID;
                model.PopulationTypeID = _fd.PopulationTypeID;
                model.StrategicPriorityID = _fd.StrategicPriorityID;
                model.InvestmentPriorityID = _fd.InvestmentPriorityID;
                model.TCLHINLeadID = _fd.TCLHINLeadID;
                model.SMTLeadID = _fd.SMTLeadID;
                model.PlannedStartDate = _fd.PlannedStartDate;
                model.PlannedEndDate = _fd.PlannedEndDate;
                model.ObjectiveDescription = _fd.ObjectiveDescription;
                model.OutcomeDescription = _fd.OutcomeDescription;
                model.Comments = _fd.Comments;
                model.HSPID = _fd.HSPID;
                model.IssueDescription = _fd.IssuesDescription;
                model.DepartmentID = _fd.DepartmentID;
                model.FundingEntityStatusID = _fd.FundingEntityStatusID;
                model.TaskID = _fd.TaskID;
                model.FiscalYear = _fd.FiscalYear;

                // second added
                model.BCInitiateDate = _fd.BCInitiationDate;
                model.StrategicPriorityDescription = _fd.StrategicPriorityDesc;
                model.InvestmentPriorityDescription = _fd.InvestmentPriorityDesc;
                model.PopulationDescription = _fd.PopulationDesc;
               

                model.CreatedBy = string.Empty;
                if (!string.IsNullOrEmpty(_fd.CreatedBy))
                {
                    int _UserProfileID = Convert.ToInt32(_fd.CreatedBy);
                    UserProfile _UserProfile = UoW.UserProfileRepo.GetUserProfileById(_UserProfileID);
                    if (_UserProfile != null)
                    {
                        model.CreatedBy = _UserProfile.UserFullName;
                    }
                }

                model.FundingManagementTypeID = _fr.FundingManagementTypeID;
                model.RequestedFundingAmt = _fr.RequestedFundingAmt;
                model.AllocatedFundingAmt = _fr.AllocatedFundingAmt;

                model.RequestedFundingAmtText = Common.decimalConvertToCurrencyFormat(_fr.RequestedFundingAmt);
                model.AllocatedFundingAmtText = Common.decimalConvertToCurrencyFormat(_fr.AllocatedFundingAmt);

                model.WorkPlanInd = _fr.WorkPlanInd;
                model.FromPrevYearInd = _fr.FromPrevYearInd;

                if (_fr.WorkPlanInd.HasValue)
                {
                    model.WorkPlanInd = true;
                }
                else {
                    model.WorkPlanInd = false;
                }

                if (_fr.FromPrevYearInd.HasValue)
                {
                    model.FromPrevYearInd = true;
                }
                else
                {
                    model.FromPrevYearInd = false;
                }

                model.ApprovalDate = _fr.ApprovalDate;
                model.InitiatedBy = _fr.InitiatedBy;
                model.ApprovedByID = _fr.ApprovedByID;
              
                model.ProgramID = _fr.ProgramID;

            }


            return model;
        }


        private int UpdateFundingRequest(FundingRequestVM model, out string message)
        {
            int retVal = 0;
            message = string.Empty;
            Exception _Exception = new Exception("UpdateFundingRequest");

            using (var tran = UoW.DBContext.Database.BeginTransaction())
            {
                try
                {
                    int _id = Convert.ToInt32(model.FundingDetailID);
                    FundingDetail fd = UoW.FundingDetailRepo.GetFundingDetailById(_id);
                    FundingRequest fq = UoW.FundingRequestRepo.GetFundingRequestByFundingDetailId(_id);

                    if (fd != null && fq != null)
                    {
                        fd.Description = model.Description;
                        fd.Name = model.Name;
                        fd.SectorID = model.SectorID;
                        fd.PopulationTypeID = model.PopulationTypeID;
                        fd.StrategicPriorityID = model.StrategicPriorityID;
                        fd.InvestmentPriorityID = model.InvestmentPriorityID;
                        fd.TCLHINLeadID = model.TCLHINLeadID;
                        fd.SMTLeadID = model.SMTLeadID;
                        fd.PlannedStartDate = model.PlannedStartDate;
                        fd.PlannedEndDate = model.PlannedEndDate;
                        fd.ObjectiveDescription = model.ObjectiveDescription;
                        fd.OutcomeDescription = model.OutcomeDescription;
                        fd.Comments = model.Comments;
                        fd.IssuesDescription = model.IssueDescription;
                        fd.HSPID = model.HSPID;
                        fd.DepartmentID = model.DepartmentID;
                        fd.FundingEntityStatusID = model.FundingEntityStatusID;
                        fd.TaskID = model.TaskID;
                        fd.FiscalYear = model.FiscalYear;

                        // second added
                        fd.BCInitiationDate = model.BCInitiateDate;
                        fd.BCApprovalDate = model.ApprovalDate;
                        fd.StrategicPriorityDesc = model.StrategicPriorityDescription;
                        fd.InvestmentPriorityDesc = model.InvestmentPriorityDescription;
                        fd.PopulationDesc = model.PopulationDescription;
                    

                        fd.UpdatedDate = DateTime.Now;
                        fd.UpdatedBy = GetCurrentUser().UserID;
                      

                        UoW.DBContext.Entry(fd).State = System.Data.Entity.EntityState.Modified;
                        UoW.DBContext.SaveChanges();

                        fq.FundingManagementTypeID = model.FundingManagementTypeID;

                        //fq.RequestedFundingAmt = model.RequestedFundingAmt;
                        //if (model.AllocatedFundingAmt.HasValue)
                        //{
                        //    fq.AllocatedFundingAmt = model.AllocatedFundingAmt;
                        //}
                        //else
                        //{
                        //    fq.AllocatedFundingAmt = fq.RequestedFundingAmt;
                        //}

                        fq.WorkPlanInd = model.WorkPlanInd;
                        fq.FromPrevYearInd = model.FromPrevYearInd;
                        fq.ApprovalDate = model.ApprovalDate;
                        fq.InitiatedBy = model.InitiatedBy;
                        fq.ApprovedByID = model.ApprovedByID;
                        fq.ProgramID = model.ProgramID;
                        fq.UpdatedBy = GetCurrentUser().UserID;
                        fq.UpdatedDate = DateTime.Now;

                        UoW.DBContext.Entry(fq).State = System.Data.Entity.EntityState.Modified;
                        UoW.DBContext.SaveChanges();

                        tran.Commit();
                        retVal = _id;
                    }

                }
                catch (Exception ex)
                {
                    _Exception = ex;
                    retVal = 0;
                    tran.Rollback();
                    message = "Server Internal Error ...";
                    UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "FundingRequest/UpdateFundingRequest");
                }

            }

            if (retVal == 0)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(_Exception, string.Empty, string.Empty, "FundingRequest/UpdateFundingRequest");
            }


            return retVal;
        }


        public ActionResult Print(int id)
        {
            FundingDetail _FD = UoW.FundingDetailRepo.GetFundingDetailById(id);

            byte[] ReportFile = ReportManager.FundingRequest.GenerateReport(id);
            return File(ReportFile, ReportManager.FundingRequest.MIMEType, @"Funding Request (" + _FD.FormattedID + " - " + _FD.Name.Left(Common.REPORT_NAME_SIZE) + @")." + ReportManager.FundingRequest.Extension);
        }


        public ActionResult FundingDocument(int id)
        {
            ViewBag.FundingDetailId = id;

            FundingRequestVM model = GetFundingRequestByFundingDetailId(id);

            ViewBag.BusinessCaseBreadCrumbVM = UoW.FundingDetailRepo.GetBusinessCaseBreadCrumbPath_ByFundingDetailId((int)model.FundingDetailID);

            return View(model);
        }





        public ActionResult InProgressStatus()
        {
            return View();
        }



        public ActionResult CompleteStatus()
        {

            return View();
        }


        public ActionResult ApprovedStatus()
        {

            return View();
        }


        public ActionResult CancelledStatus()
        {

            return View();
        }



    }


}