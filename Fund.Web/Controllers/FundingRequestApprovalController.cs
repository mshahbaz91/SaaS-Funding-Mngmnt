using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.Repository;
using HFund.Utility;
using HFund.Web.ApplicationServices;
using HFund.Web.ValidationRules;
using System.Data;
using System.Data.SqlClient;
using HFund.Web.Filters;

namespace HFund.Web.Controllers
{



    [Authorize(Roles = Common.LHINBaseRole)]
    [CustomAuth(ControllerName = "FundingRequestApproval", ActionName = "Search")]
    public class FundingRequestApprovalController : BaseController
    {
        // GET: FundingRequestApproval
        public ActionResult Index()
        {
            return View();
        }


        //public ActionResult Search()
        //{
        //    FundingRequestApprovalSearchVM model = new FundingRequestApprovalSearchVM();
        //    model.PageLoad = true;
        //    model.BtnSearchClickValid = false;
        //    model.TotalRecordsFound = 0;
        //    model.SearchResults = new List<FundingRequestApprovalSearchResultVM>();

          
        //   // ViewBag.FundingEntityStatusID = UoW.EntityStatusRepo.GetEntityStatusByEntityTypeID_ddl(SystemValues.FundingRequestTypeID);
        //    int _UserProfileId = GetCurrentUser().UserProfileID;
        //    ViewBag.FundingEntityStatusID = UoW.EntityStatusRepo.GetEntityStatusByEntityTypeUser_ddl(SystemValues.FundingRequestTypeID, _UserProfileId);

        //    ViewBag.FiscalYear = UoW.FiscalYearRepo.GetFiscalYear_ddl();
        //    ViewBag.FundingBucketID = UoW.FundingBucketRepo.GetFundingBucket_ddl();

        //    // ViewBag.SMTLeadID = UoW.UserProfileRepo.GetUserProfileLead_ddl();
        //    ViewBag.SMTLeadID = UoW.UserProfileRepo.GetUserProfileDirector_ddl();

        //    ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.GetPopulationType_ddl();
        //    ViewBag.SectorID = UoW.SectorRepo.GetSector_ddl();
        //    ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.GetStrategicPriority_dll();
        //    ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.GetInvestmentPriority_dll();
        //    ViewBag.AllowedActionID = UoW.StatusTaskRepo.GetAllowedAction_ddl(GetCurrentUser().UserProfileID, 0);

        //    bool _ApprovedAmount_EditEnabled = UoW.SystemObjectRepo.ActionAllowed(User.Identity.Name, "FundingRequestApproval", "ApprovedAmount", "EDIT");
        //    ViewBag.ApprovedAmount_EditEnabled = _ApprovedAmount_EditEnabled;

        //    return View(model);
        //}



        public ActionResult Search()
        {
            int _userProfileId = 0;
            _userProfileId = GetCurrentUser().UserProfileID;

            // int _currentFiscalYear = DateTime.Now.Year;
            int _currentFiscalYear = SystemValues.CurrentFiscalYear;
            int _UserProfileId = GetCurrentUser().UserProfileID;
            ViewBag.FundingEntityStatusID = UoW.EntityStatusRepo.GetEntityStatusByEntityTypeUser_ddl(Common.FRStatusMasterTypeID, _UserProfileId);
            ViewBag.SMTLeadID = UoW.UserProfileRepo.GetUserProfileDirector_ddl();
            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.GetPopulationType_ddl();
            ViewBag.SectorID = UoW.SectorRepo.GetSector_ddl();
            ViewBag.AllowedActionID = UoW.StatusTaskRepo.GetAllowedAction_ddl(_UserProfileId, 0);
            ViewBag.FiscalYear = UoW.FiscalYearRepo.SetFiscalYear_ddl(_currentFiscalYear);
            ViewBag.FundingBucketID = UoW.FundingBucketRepo.SetFundingBucket_ddl_FilterByFiscalYear(_currentFiscalYear, 0);
            ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl_filterByYear(_currentFiscalYear, 0);
            ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl_filterByYear(_currentFiscalYear, 0);
            bool _ApprovedAmount_EditEnabled = UoW.SystemObjectRepo.ActionAllowed(_userProfileId, "FundingRequestApproval", "ApprovedAmount", "EDIT");
            ViewBag.ApprovedAmount_EditEnabled = _ApprovedAmount_EditEnabled;

            return View();
        }




        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Search(FundingRequestApprovalSearchVM model)
        {
            model.PageLoad = false;
            model.BtnSearchClickValid = false;
            model.TotalRecordsFound = 0;
            bool IsAllValid = true;
            int _userProfileId = 0;
            _userProfileId = GetCurrentUser().UserProfileID;

            List<FundingRequestApprovalSearchResultVM> SearchResultList = new List<FundingRequestApprovalSearchResultVM>();
            ViewBag.AllowedActionID = UoW.StatusTaskRepo.GetAllowedAction_ddl(GetCurrentUser().UserProfileID, model.FundingEntityStatusID);

            // ViewBag.FundingEntityStatusID = UoW.EntityStatusRepo.SetEntityStatusByEntityTypeID_ddl(SystemValues.FundingRequestTypeID, model.FundingEntityStatusID);
            int _UserProfileId = GetCurrentUser().UserProfileID;
            ViewBag.FundingEntityStatusID = UoW.EntityStatusRepo.SetEntityStatusByEntityTypeUser_ddl(Common.FRStatusMasterTypeID, _UserProfileId, model.FundingEntityStatusID);

            ViewBag.FiscalYear = UoW.FiscalYearRepo.SetFiscalYear_ddl(model.FiscalYear);
            ViewBag.FundingBucketID = UoW.FundingBucketRepo.SetFundingBucket_ddl(model.FundingBucketID);

            if (model.FiscalYear.HasValue)
            {
                ViewBag.FundingBucketID = UoW.FundingBucketRepo.SetFundingBucket_ddl_FilterByFiscalYear(model.FiscalYear, model.FundingBucketID);
            }

            //ViewBag.SMTLeadID = UoW.UserProfileRepo.SetUserProfileLead_ddl(model.SMTLeadID);
            ViewBag.SMTLeadID = UoW.UserProfileRepo.SetUserProfileDirector_ddl(model.SMTLeadID);
            ViewBag.PopulationTypeID = UoW.PopulationTypeRepo.SetPopulationType_ddl(model.PopulationTypeID);
            ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);
            ViewBag.StrategicPriorityID = UoW.StrategicPriorityRepositoryRepo.SetStrategicPriority_ddl(model.StrategicPriorityID);
            ViewBag.InvestmentPriorityID = UoW.InvestmentPriorityRepo.SetInvestmentPriority_ddl(model.InvestmentPriorityID);

            bool _ApprovedAmount_EditEnabled = UoW.SystemObjectRepo.ActionAllowed(_userProfileId, "FundingRequestApproval", "ApprovedAmount", "EDIT");
            ViewBag.ApprovedAmount_EditEnabled = _ApprovedAmount_EditEnabled;


            if (ModelState.IsValid)
            {
                if (model.PlanningPriorityRankingID_To.HasValue == true && model.PlanningPriorityRankingID_From.HasValue == false)
                {
                    ModelState.AddModelError("PlanningPriorityRankingID_From", "Please select planning priority ranking from .");
                    IsAllValid = false;
                }

                if (model.InvestmentPlanRankingID_To.HasValue == true && model.InvestmentPlanRankingID_From.HasValue == false)
                {
                    ModelState.AddModelError("InvestmentPlanRankingID_From", "Please select investment plan ranking from .");
                    IsAllValid = false;
                }


                if (model.RequestAmount_To.HasValue == true && model.RequestAmount_From.HasValue == false)
                {
                    ModelState.AddModelError("RequestAmount_From", "Please select request Amount .");
                    IsAllValid = false;
                }



                if (IsAllValid == true)
                {
                    IQueryable<FundingDetail> queryList = UoW.FundingDetailRepo.GetAllIncluding(a => a.Account, c => c.FundingRequests, u => u.UserProfile1, x => x.UserProfile2,
                     y => y.StrategicPriority, z => z.PopulationType, i => i.IdentifiedFundingBuckets).Where(c => new[] { SystemValues.FundingRequestTypeID, SystemValues.SFFundingRequestTypeID }.Contains(c.FundingEntityTypeID));

                    if (!String.IsNullOrEmpty(model.Name))
                    {
                        string _SearchUpperCaseWord = model.Name.ToUpper();
                        //  queryList = queryList.Where(s => s.Name.Contains(model.Name) || s.Description.Contains(model.Name) || s.FormattedID.Contains(model.Name));
                        queryList = queryList.Where(s => s.Name != null && s.Name.ToUpper().Contains(_SearchUpperCaseWord) ||
                            (s.FormattedID != null && s.FormattedID.ToUpper().Contains(_SearchUpperCaseWord)));
                    }

                    if (model.FundingEntityStatusID.HasValue)
                    {
                        var statusList = (from c in UoW.DBContext.StatusMasterItems where (c.StatusMasterID == model.FundingEntityStatusID) select (c.FundingEntityStatusID)).ToList();
                        queryList = queryList.Where(c => statusList.Contains((int) c.FundingEntityStatusID));
                    }

                    if (model.FiscalYear.HasValue)
                    {
                        queryList = queryList.Where(c => c.FiscalYear == model.FiscalYear);
                    }

                    if (model.FundingBucketID.HasValue)
                    {
                        queryList = queryList.Where(c => c.IdentifiedFundingBuckets.Any(x => x.FundingBucketID == model.FundingBucketID));
                    }

                    if (model.SMTLeadID.HasValue)
                    {
                        queryList = queryList.Where(c => c.SMTLeadID == model.SMTLeadID);
                    }

                    if (model.PopulationTypeID.HasValue)
                    {
                        queryList = queryList.Where(c => c.PopulationTypeID == model.PopulationTypeID);
                    }

                    if (model.SectorID.HasValue)
                    {
                        queryList = queryList.Where(c => c.SectorID == model.SectorID);
                    }

                    if (model.StrategicPriorityID.HasValue)
                    {
                        queryList = queryList.Where(c => c.StrategicPriorityID == model.StrategicPriorityID);
                    }

                    if (model.InvestmentPriorityID.HasValue)
                    {
                        queryList = queryList.Where(c => c.InvestmentPriorityID == model.InvestmentPriorityID);
                    }

                    if (model.RequestAmount_From.HasValue)
                    {
                        queryList = queryList.Where(c => c.FundingRequests.Any(x => x.RequestedFundingAmt >= model.RequestAmount_From));
                    }

                    if (model.RequestAmount_To.HasValue)
                    {
                        queryList = queryList.Where(c => c.FundingRequests.Any(x => x.RequestedFundingAmt <= model.RequestAmount_From));
                    }

                    if (model.PlanningPriorityRankingID_From.HasValue)
                    {
                        queryList = queryList.Where(c => c.FundingRequests.Any(x => x.PlanningPriorityRanking >= model.PlanningPriorityRankingID_From));
                    }

                    if (model.PlanningPriorityRankingID_To.HasValue)
                    {
                        queryList = queryList.Where(c => c.FundingRequests.Any(x => x.PlanningPriorityRanking <= model.PlanningPriorityRankingID_To));
                    }


                    if (model.InvestmentPlanRankingID_From.HasValue)
                    {
                        queryList = queryList.Where(c => c.FundingRequests.Any(x => x.InvestmentPlanRanking >= model.InvestmentPlanRankingID_From));
                    }


                    if (model.InvestmentPlanRankingID_To.HasValue)
                    {
                        queryList = queryList.Where(c => c.FundingRequests.Any(x => x.InvestmentPlanRanking <= model.InvestmentPlanRankingID_To));
                    }

                    model.TotalRecordsFound = queryList.Count();
                    model.BtnSearchClickValid = true;
                    ViewBag.AllowedActionID = UoW.StatusTaskRepo.SetBatchAllowedAction_ddl(GetCurrentUser().UserProfileID, model.FundingEntityStatusID, model.AllowedActionID);

                    foreach (var item in queryList)
                    {
                        // get funging request first 
                        FundingRequestApprovalSearchResultVM _SR = new FundingRequestApprovalSearchResultVM();

                        if (item.HSPID.HasValue)
                        {
                            _SR.HSP = item.Account.Name;
                        }

                        _SR.FundingBucketName = FindFundingBucketName_ByFundingDetailId(item.FundingDetailID);
                        _SR.Deliverables = FindDeliverableName_ByFundingDetailId(item.FundingDetailID);

                        FundingRequest _FR = (from c in item.FundingRequests
                                              select c).FirstOrDefault();
                        if (_FR != null)
                        {
                            _SR.RequestAmount = _FR.RequestedFundingAmt;
                            _SR.ApprovedAmount = _FR.AllocatedFundingAmt;
                            _SR.PlanningPriorityRankId = _FR.PlanningPriorityRanking;
                            _SR.InvestmentPlanRankId = _FR.InvestmentPlanRanking;
                            _SR.WorkPlan = _FR.WorkPlanInd;
                            _SR.NumberOfYears = _FR.NumberOfYears;
                            _SR.PreviousYear = _FR.FromPrevYearInd;
                        }

                        // get funding Detail
                        _SR.FundingDetailID = item.FundingDetailID;
                        _SR.Name = item.Name;
                        _SR.Comments = item.Comments;
                        if (item.FundingEntityStatusID == SystemValues.FundingApprovedStatus)
                        {
                            _SR.Approved = true;
                        }
                        else
                        {
                            _SR.Approved = false;
                        }
                        _SR.StrategicPriorityId = item.StrategicPriorityID;
                        _SR.OutcomeDescription = item.OutcomeDescription;
                        _SR.IssueDescription = item.IssuesDescription;
                        if (item.StrategicPriorityID.HasValue)
                        {
                            _SR.StrategicPriorityIdDesc = item.StrategicPriority.PriorityDescription;
                        }

                        _SR.PopulationId = item.PopulationTypeID;
                        if (item.PopulationTypeID.HasValue)
                        {
                            _SR.PopulationIdDesc = item.PopulationType.PopulationTypeDescription;
                        }

                        // May need to change in the future
                        // TCLHINLeadID, SMTLeadID, StatusUpdatedBy

                        _SR.TCLHINLeadID = item.TCLHINLeadID;
                        if (item.TCLHINLeadID.HasValue)
                        {
                            _SR.TCLHINLeadFullName = item.UserProfile1.UserFirstName + " " + item.UserProfile1.UserLastName;
                        }

                        // for now  UserProfile2 == SMTLeadID
                        _SR.SMTLeadID = item.SMTLeadID;
                        if (item.SMTLeadID.HasValue)
                        {
                            _SR.SMTLeadFullName = item.UserProfile2.UserFirstName + " " + item.UserProfile2.UserLastName;
                        }

                        // get [base, one-time, on-going] amount
                        var AmountItems = from c in UoW.IdentifiedFundingTypeRepo.GetAllIdentifiedFundingType()
                                          where c.FundingDetailID == item.FundingDetailID && c.FiscalYear == item.FiscalYear
                                          select c;
                        foreach (var AmountItem in AmountItems)
                        {
                            if (AmountItem.FundingTypeID == SystemValues.BaseFundingType)
                            {
                                _SR.BaseRequestedAmount = AmountItem.RequestedFundingAmount;
                                _SR.BaseAllocatedAmount = AmountItem.AllocatedFundingAmount;

                            }
                            else if (AmountItem.FundingTypeID == SystemValues.OneTimeFundingType)
                            {
                                _SR.OneTimeRequestedAmount = AmountItem.RequestedFundingAmount;
                                _SR.OneTimeAllocatedAmount = AmountItem.AllocatedFundingAmount;

                            }
                            else if (AmountItem.FundingTypeID == SystemValues.OnGoingFundingType)
                            {
                                _SR.OnGoingRequestedAmount = AmountItem.RequestedFundingAmount;
                                _SR.OnGoingAllocatedAmount = AmountItem.AllocatedFundingAmount;
                            }
                        }

                        SearchResultList.Add(_SR);
                    }

                }


            }

            model.SearchResults = SearchResultList;

            return View(model);
        }





       // id == fundingdetailid == businesscaseID



        public ActionResult RedirectToRanking(int ID)
        {
            // Add session variable to keep left menu dynamically
            // Session[Common.SV_BUSINESSCASE_ID] = ID;
           return RedirectToAction("Create", "SMTRanking", new { id = ID });
        }



        [HttpPost]
        public JsonResult UpdateFundingEntityStatusByAjax(string FundingEntityStatusId, string AllowedActionId, string[] FundingDetailIdArray, string StatusComment = "" )
        {
            int BatchUpdateStatus = 1;
            StringBuilder GoodSb = new StringBuilder();
            StringBuilder BadSb = new StringBuilder();
            List<Tuple<int?, int, string, string,  string>> _EmailList = new List<Tuple<int?, int, string, string, string>>();
            String strURL = Request.Url.GetLeftPart(UriPartial.Authority);
            NotificationManager NM = new NotificationManager();

            try
            {
                //int _FundingEntityStatusId = Convert.ToInt32(FundingEntityStatusId);
                int _MasterActionId = Convert.ToInt32(AllowedActionId);
                String strFromStatus, strToStatus;

                using (var tran = UoW.DBContext.Database.BeginTransaction())
                {
                    foreach (string IdItem in FundingDetailIdArray)
                    {
                        int _FundingDetailId = Convert.ToInt32(IdItem);
                        FundingDetail _FD = UoW.DBContext.FundingDetails.Find(_FundingDetailId);
                        int? _FundingEntityStatusId = _FD.FundingEntityStatusID;
                        int? _AllowedActionId = UoW.StatusTaskRepo.GetTaskIDByTaskMaster(_FundingEntityStatusId, _MasterActionId);
                        _FD.TaskID = _AllowedActionId;
                        _FD.StatusComment = StatusComment;
                        ValidationResult result = ValidationManager.ActionRule.Validate(GetCurrentUser().UserProfileID, _FD);
                        if ( result.IsValid)
                        {
                            if (_FD != null)
                            {
                                int? _NextEntityStatusId = UoW.StatusTaskRepo.GetNextStatusID(_FundingEntityStatusId, _AllowedActionId);
                                strFromStatus = UoW.EntityStatusRepo.GetEntityStatusById((int)_FD.FundingEntityStatusID).StatusDescription;
                                strToStatus = UoW.EntityStatusRepo.GetEntityStatusById((int)_NextEntityStatusId).StatusDescription;
                                _FD.FundingEntityStatusID = _NextEntityStatusId;
                                _FD.TaskID = _AllowedActionId;
                                _FD.StatusComment = StatusComment;
                                _FD.StatusUpdatedDate = DateTime.Now;
                                _FD.StatusUpdatedBy = GetCurrentUser().UserProfileID;
                                _FD.UpdatedDate = DateTime.Now;
                                _FD.UpdatedBy = GetCurrentUser().UserID;

                                UoW.DBContext.Entry(_FD).State = System.Data.Entity.EntityState.Modified;
                                UoW.DBContext.SaveChanges();

                                if (SystemValues.DeleteRole.Contains((int)_FD.TaskID))
                                {
                                    UoW.DBContext.Entry(_FD).State = System.Data.Entity.EntityState.Deleted;
                                    UoW.DBContext.SaveChanges();
                                }

                                // TO DO (send email notification)
                                strToStatus = UoW.EntityStatusRepo.GetEntityStatusById((int)_FD.FundingEntityStatusID).StatusDescription;
                               // NM.SendEmailNotification(UoW.TaskRepo.GetTaskById((int)_FD.TaskID).NotificationID, _FD.FundingDetailID, _FD.FormattedID, strFromStatus, strToStatus);
                                int? _Email_NotificationID = UoW.TaskRepo.GetTaskById((int)_FD.TaskID).NotificationID;
                                int _Email_FundingDetailId = _FD.FundingDetailID;
                                string _Email_FormattedFundingDetailId = _FD.FormattedID;
                                string _Email_FromStatus = strFromStatus;
                                string _Email_ToStatus = strToStatus;
                                _EmailList.Add(new Tuple<int?, int, string, string, string>(_Email_NotificationID, _Email_FundingDetailId, _Email_FormattedFundingDetailId, _Email_FromStatus, _Email_ToStatus));

                                // Good Message
                                GoodSb.AppendLine("ID : " + _FD.FormattedID + "     Name : " + _FD.Name +   "     "  +  "update successfully ." + "<br />");
                            }

                            
                        }
                        else
                        {
                           // Bad Message
                            BadSb.AppendLine("ID : " + _FD.FormattedID + "     Name : " + _FD.Name  + "     " + " update failed ...  "  + result.ErrorContent.ToString() + "<br />" );
                        }

                    }

                    tran.Commit();
                    BatchUpdateStatus = 1;
                }


                // TO DO (send email notification)
                foreach(var Email in _EmailList)
                {
                    // NM.SendEmailNotification(UoW.TaskRepo.GetTaskById((int)_FD.TaskID).NotificationID, _FD.FundingDetailID, _FD.FormattedID, strFromStatus, strToStatus);
                    NM.SendEmailNotification(Email.Item1, Email.Item2, Email.Item3, Email.Item4, Email.Item5, strURL);
                }



            }
            catch(Exception ex)
            {
                BatchUpdateStatus = 0;
                BadSb.AppendLine("Update with error ..." + ex.Message.ToString() + "<br />");
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Batch Update", GetCurrentUser().UserID, "FundingRequestApproval/UpdateFundingEntityStatusByAjax");
                UoW.SaveChanges();
            }


            return Json(new { BatchUpdateStatus = BatchUpdateStatus, GoodMessage = GoodSb.ToString(), BadMessage = BadSb.ToString() });
        }




        [HttpPost]
        public JsonResult Ajax_GetFundingDetail_NameAndComment_ById(int fundingDetialId)
        {
            string _FundingDetailName = "";
            string _Comment = "";

            try
            {
                FundingDetail _FD = UoW.FundingDetailRepo.GetFundingDetailById(fundingDetialId);
                if(_FD != null)
                {
                    _FundingDetailName = _FD.Name;
                    _Comment = _FD.Comments;
                }
                else
                {
                    return Json(new { GetStatus = 0, FundingDetailName = _FundingDetailName, Comment = _Comment });
                }


            }
            catch(Exception ex)
            {
                string _message = ex.Message.ToString();
                return Json(new { GetStatus = 0, FundingDetailName = _FundingDetailName, Comment = _Comment });
            }


            return Json(new { GetStatus = 1, FundingDetailName = _FundingDetailName, Comment = _Comment });

        }




        [HttpPost]
        public JsonResult Ajax_UpdateFundingApproval(int fundingDetailId,  int planningPriorityRanking, string requestAmountText, string allocatedAmountText , 
                         string baseAllocatedAmountText, string oneTimeAllocatedAmountText, string onGogingAllocatedAmountText, string Comment)
        {
            decimal? _RequestAmount = null;
            decimal? _AllocatedAmount = null;
            decimal? _BaseAllocatedAmount = null;
            decimal? _OneTimeAllocatedAmount = null;
            decimal? _OnGodingAllocatedAmount = null;
            decimal? _TotalAllocatedAmount = 0.00m;

            try
            {
                // check requestAmountText 
                // RequestedAmount
                if (!string.IsNullOrEmpty(requestAmountText) || !string.IsNullOrWhiteSpace(requestAmountText))
                {
                    string _RequestedAmtTxt = Common.RemoveDollarSign(requestAmountText);
                    decimal _RequestedAmt;
                    if (Decimal.TryParse(_RequestedAmtTxt, out _RequestedAmt))
                    {
                        if (_RequestedAmt <= Common.MAX_REQUEST_AMOUNT && _RequestedAmt > 0)
                        {
                            _RequestAmount = _RequestedAmt;
                        }
                        else
                        {
                            return Json(new { UpdateStatus = 0, Message = "Request Amount must less than " + Common.MAX_REQUEST_AMOUNT.ToString() + " or great than 0" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                    {
                        return Json(new { UpdateStatus = 0, Message = "Request Amount with error ..." }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    _RequestAmount = null;
                }


                // AllocatedAmount
                if (!string.IsNullOrEmpty(allocatedAmountText) || !string.IsNullOrWhiteSpace(allocatedAmountText))
                {
                    string _AllocatedAmountTxt = Common.RemoveDollarSign(allocatedAmountText);
                    decimal _AllocatedAmt;
                    if (Decimal.TryParse(_AllocatedAmountTxt, out _AllocatedAmt))
                    {
                        if (_AllocatedAmt <= Common.MAX_REQUEST_AMOUNT && _AllocatedAmt >= 0)
                        {
                            _AllocatedAmount = _AllocatedAmt;
                        }
                        else
                        {
                            return Json(new { UpdateStatus = 0, Message = "Approved Amount must less than " + Common.MAX_REQUEST_AMOUNT.ToString() + " or great than 0" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                    {
                        return Json(new { UpdateStatus = 0, Message = "Approved Amount with error ..." }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    _AllocatedAmount = null;
                }

                // baseAmount
                if (!string.IsNullOrEmpty(baseAllocatedAmountText) || !string.IsNullOrWhiteSpace(baseAllocatedAmountText))
                {
                    string _BaseAmountTxt = Common.RemoveDollarSign(baseAllocatedAmountText);
                    decimal _BaseAmt;
                    if (Decimal.TryParse(_BaseAmountTxt, out _BaseAmt))
                    {
                        if (_BaseAmt <= Common.MAX_REQUEST_AMOUNT && _BaseAmt >= 0)
                        {
                            _BaseAllocatedAmount = _BaseAmt;
                        }
                        else
                        {
                            return Json(new { UpdateStatus = 0, Message = "Approved Base Amount must less than " + Common.MAX_REQUEST_AMOUNT.ToString() + " or great than 0 " }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                    {
                        return Json(new { UpdateStatus = 0, Message = "Approved Base Amount with error ..." }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    _BaseAllocatedAmount = null;
                }


                // oneTimeAmount
                if (!string.IsNullOrEmpty(oneTimeAllocatedAmountText) || !string.IsNullOrWhiteSpace(oneTimeAllocatedAmountText))
                {
                    string _OneTimeAmountTxt = Common.RemoveDollarSign(oneTimeAllocatedAmountText);
                    decimal _OneTimeAmt;
                    if (Decimal.TryParse(_OneTimeAmountTxt, out _OneTimeAmt))
                    {
                        if (_OneTimeAmt <= Common.MAX_REQUEST_AMOUNT && _OneTimeAmt >= 0)
                        {
                            _OneTimeAllocatedAmount = _OneTimeAmt;
                        }
                        else
                        {
                            return Json(new { UpdateStatus = 0, Message = "Approved One Time Amount must less than " + Common.MAX_REQUEST_AMOUNT.ToString()  + " or great than 0"}, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                    {
                        return Json(new { UpdateStatus = 0, Message = "Approved One Time Amount with error ..." }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    _OneTimeAllocatedAmount = null;
                }


                // onGoing
                if (!string.IsNullOrEmpty(onGogingAllocatedAmountText) || !string.IsNullOrWhiteSpace(onGogingAllocatedAmountText))
                {
                    string _OnGoingAmountTxt = Common.RemoveDollarSign(onGogingAllocatedAmountText);
                    decimal _OnGoingAmt;
                    if (Decimal.TryParse(_OnGoingAmountTxt, out _OnGoingAmt))
                    {
                        if (_OnGoingAmt <= Common.MAX_REQUEST_AMOUNT && _OnGoingAmt >= 0)
                        {
                            _OnGodingAllocatedAmount = _OnGoingAmt;
                        }
                        else
                        {
                            return Json(new { UpdateStatus = 0, Message = "Approved On Going Amount must less than " + Common.MAX_REQUEST_AMOUNT.ToString() + " or great than 0" }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else
                    {
                        return Json(new { UpdateStatus = 0, Message = "Approved On Going Amount with error ..." }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    _OnGodingAllocatedAmount = null;
                }


                // Sum up of base, ontime, one going amount
                if ( _BaseAllocatedAmount.HasValue)
                {
                    _TotalAllocatedAmount += _BaseAllocatedAmount;
                }

                if (_OneTimeAllocatedAmount.HasValue)
                {
                    _TotalAllocatedAmount += _OneTimeAllocatedAmount;
                }

                if (_OnGodingAllocatedAmount.HasValue)
                {
                    _TotalAllocatedAmount += _OnGodingAllocatedAmount;
                }


                if ( _AllocatedAmount != _TotalAllocatedAmount)
                {
                    return Json(new { UpdateStatus = 0, Message = "Total of approved base amount  and one time amount must equal approved amount ." }, JsonRequestBehavior.AllowGet);
                }

                // do store procedure update
                string _UserId = GetCurrentUser().UserID;
                SqlParameter returnParm = new SqlParameter() { ParameterName = "@ReturnCode", SqlDbType = SqlDbType.Int, Direction = System.Data.ParameterDirection.Output };
                UoW.DBContext.Database.ExecuteSqlCommand("EXEC @ReturnCode = spUpdateFundingApproval @FundingDetailID, @PlanningPriorityRanking, @RequestedFundingAmt, @AllocatedFundingAmt," +
                                                          " @BaseAllocatedAmount, @OneTimeAllocatedAmount, @OnGodingAllocatedAmount, @Comments, @UpdateBy",
                                                            returnParm,
                                                            new SqlParameter("@FundingDetailID", fundingDetailId),
                                                            new SqlParameter("@PlanningPriorityRanking", planningPriorityRanking),
                                                            new SqlParameter("@RequestedFundingAmt", (object)_RequestAmount ?? DBNull.Value ),
                                                            new SqlParameter("@AllocatedFundingAmt", (object)_AllocatedAmount ?? DBNull.Value ),
                                                            new SqlParameter("@BaseAllocatedAmount", (object)_BaseAllocatedAmount ?? DBNull.Value),
                                                            new SqlParameter("@OneTimeAllocatedAmount", (object)_OneTimeAllocatedAmount ?? DBNull.Value),
                                                            new SqlParameter("@OnGodingAllocatedAmount", (object)_OnGodingAllocatedAmount ?? DBNull.Value ) ,
                                                            new SqlParameter("@Comments", Comment),
                                                            new SqlParameter("@UpdateBy", _UserId)
                                                            );

                int _ReturnFundingDetailID = (int)returnParm.Value;

                if (_ReturnFundingDetailID != fundingDetailId)
                {
                    return Json(new { UpdateStatus = 0, Message = Common.UPDATE_FAILEDMESSAGE  });
                }

            }
            catch(Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Update Funding Approval", GetCurrentUser().UserID, "FundingRequestApproval/Ajax_UpdateFundingApproval");
                UoW.SaveChanges();
                return Json(new { UpdateStatus = 0, Message = Common.UPDATE_FAILEDMESSAGE });
            }

            return Json(new { UpdateStatus = 1, Message = Common.UPDATE_SUCCESSMESSAGE });

        }



        public ActionResult ExportReport( )
        {
            int _ReportID = 0;
            try
            {
                if (Session[Common.SV_FUNDING_APPROVAL_REPORTID] != null)
                {
                    _ReportID = Convert.ToInt32(Session[Common.SV_FUNDING_APPROVAL_REPORTID]);
                }
                else
                {
                    // return JavaScript("alert('Export Report with error ... !');");
                    return JavaScript("<script>alert(\"Export Report with error ... ! \")</script>");
                }

            }catch(Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Update Funding Approval", GetCurrentUser().UserID, "FundingRequestApproval/ExportReport");
               // return JavaScript("alert('Export Report with error ...  !');");
                return JavaScript("<script>alert(\" Export Report with error ...  ! \")</script>");
            }

            byte[] ReportFile = ReportManager.FundingApprovalExport.GenerateReport(_ReportID);
            return File(ReportFile, ReportManager.FundingApprovalExport.MIMEType, "Funding Approval Export." + ReportManager.FundingApprovalExport.Extension);
        }



        [HttpPost]
        public JsonResult Ajax_GenerateReport(FundingRequestApprovalSearchVM fundingRequestApprovalSearchVM, string[] FundingDetailIdArray)
        {
            try
            {
                int _ReportID = 0;
                string _UserId = GetCurrentUser().UserID;
                int _UserProfileId = GetCurrentUser().UserProfileID;

                using (var tran = UoW.DBContext.Database.BeginTransaction())
                {
                    ReportHeader _RHeader = new ReportHeader();
                    _RHeader.ReportType = (int)ReportTypeEnum.FundingApprovalExport;
                    _RHeader.ReportName = "Funding Approval Export ";
                    _RHeader.ReportUserProfileID = _UserProfileId;
                    // 13 parameters
                    _RHeader.ReportParm01 = fundingRequestApprovalSearchVM.NameText;
                    _RHeader.ReportParm02 = fundingRequestApprovalSearchVM.FundingEntityStatusIDText;
                    _RHeader.ReportParm03 = fundingRequestApprovalSearchVM.SMTLeadIDText;
                    _RHeader.ReportParm04 = fundingRequestApprovalSearchVM.StrategicPriorityIDText;
                    _RHeader.ReportParm05 = fundingRequestApprovalSearchVM.PopulationTypeIDText;
                    _RHeader.ReportParm06 = fundingRequestApprovalSearchVM.SectorIDText;
                    _RHeader.ReportParm07 = fundingRequestApprovalSearchVM.PlanningPriorityRankingID_FromText;
                    _RHeader.ReportParm08 = fundingRequestApprovalSearchVM.PlanningPriorityRankingID_ToText;
                    _RHeader.ReportParm09 = fundingRequestApprovalSearchVM.InvestmentPlanRankingID_FromText;
                    _RHeader.ReportParm10 = fundingRequestApprovalSearchVM.InvestmentPlanRankingID_ToText;
                    _RHeader.ReportParm11 = fundingRequestApprovalSearchVM.RequestAmount_FromText;
                    _RHeader.ReportParm12 = fundingRequestApprovalSearchVM.RequestAmount_ToText;
                    _RHeader.CreatedDate = DateTime.Now;
                    _RHeader.CreatedBy = _UserId;
                    _RHeader.UpdatedDate = DateTime.Now;
                    _RHeader.UpdatedBy = _UserId;
                    UoW.DBContext.ReportHeaders.Add(_RHeader);
                    UoW.DBContext.SaveChanges();
                    
                    _ReportID = _RHeader.ReportID;

                    if (FundingDetailIdArray != null )
                    {
                        foreach (string IdItem in FundingDetailIdArray)
                        {
                            int _FundingDetailId = Convert.ToInt32(IdItem);
                            ReportItem _Item = new ReportItem();
                            _Item.ReportID = _ReportID;
                            _Item.ReportItemKey1 = _FundingDetailId;
                            _Item.CreatedDate = DateTime.Now;
                            _Item.CreatedBy = _UserId;
                            _Item.UpdatedDate = DateTime.Now;
                            _Item.UpdatedBy = _UserId;
                            UoW.DBContext.ReportItems.Add(_Item);
                            UoW.SaveChanges();
                        }

                    }

                    tran.Commit();

                    Session[Common.SV_FUNDING_APPROVAL_REPORTID] = _ReportID;
                }

            }
            catch(Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Funding Request Approval Generate Report", GetCurrentUser().UserID, "FundingRequestApproval/Ajax_GenerateReport");
                return Json(new { GetStatus = 0, Message = "Export with server internal error ..." }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { GetStatus = 1, Message = "OK" }, JsonRequestBehavior.AllowGet);
             
        }



        private string FindFundingBucketName_ByFundingDetailId(int id)
        {
            string _FundingBucketName = string.Empty;

            IdentifiedFundingBucket ifb = UoW.IdentifiedFundingBucketRepo.GetAllIncluding(c => c.FundingBucket).Where(f => f.FundingDetailID == id).FirstOrDefault();
            if( ifb != null)
            {
                _FundingBucketName = ifb.FundingBucket.FundingBucketDescription;
            }
            return _FundingBucketName;
        }

         private string FindDeliverableName_ByFundingDetailId(int id)
         {
             StringBuilder sb = new StringBuilder();
             string _DeliverableName = string.Empty;
             IQueryable<Deliverable> _DeliverableList = UoW.DeliverableRepo.GetAllDeliverable().Where(c => c.FundingDetailID == id).OrderBy(x => x.DeliverableSeqNo);

             foreach( var item in _DeliverableList)
             {
                 sb.AppendLine(item.DeliverableSeqNo.ToString() + ".  " + item.DeliverableDescription);
                 sb.AppendLine( );
             }
             if (sb.Length > 0 )
             {
                 _DeliverableName = sb.ToString();
             }
          
             return _DeliverableName;
         }


    }


}