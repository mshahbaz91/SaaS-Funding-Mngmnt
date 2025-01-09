using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using System.Data;
using System.Data.SqlClient;
using HFund.Data.ViewModels;
using HFund.Utility;
using HFund.Repository;
using System.Data.Entity;
using HFund.Web.ApplicationServices;

namespace HFund.Web.Controllers
{
    public class ActionPlanStatusNotifyController : BaseController
    {
        // GET: ActionPlanStatusNotify
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Details(int? ResendOverdureDays)
        {
            int FiscalYear = SystemValues.CurrentFiscalYear;
            int Quarter = SystemValues.CurrentPeriod;

            DateTime OverdueDate = DateTime.Now.Date;
            DateTime OverdueResendDate = DateTime.Now.Subtract(new TimeSpan(ResendOverdureDays ?? SystemValues.ResendOverdureDays, 0, 0, 0));

            if (!SystemValues.DesignatedReportPeriod)
            {
                FiscalYear = Common.getCurrentFiscalYear();
                Quarter = Common.getCurrentQuarter();
                if (FiscalYear != SystemValues.CurrentFiscalYear || Quarter != SystemValues.CurrentPeriod)
                {
                    try
                    {
                        SqlParameter parm = new SqlParameter() { ParameterName = "@Result", SqlDbType = SqlDbType.Int, Direction = System.Data.ParameterDirection.Output };
                        UoW.DBContext.Database.ExecuteSqlCommand("EXEC @Result = spUpdateCurrentPeriod", parm);

                    }
                    catch (Exception ex)
                    {
                        ModelState.AddModelError("", ex.Message.ToString());
                        UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Generate Quarterly Report", GetCurrentUser().UserID, "Details");
                    }
                }
            }
            ViewBag.FiscalYear = FiscalYear;
            ViewBag.Quarter = Quarter;
            ViewBag.ResendOverdureDays = ResendOverdureDays ?? SystemValues.ResendOverdureDays;

            var dbs = from q in UoW.DBContext.FundingActionPlanStatus
                                    where (q.FiscalYear == FiscalYear) && (q.Period == Quarter)
                                    select new { FundingDetailID = q.FundingDetailID, IsSubmitted = q.IsSubmitted, NotifiedDate = q.NotifiedDate };

            EntitySelectionVM model = new EntitySelectionVM();
            var BCList = from c in UoW.DBContext.BusinessCases
                         join q in dbs on c.FundingDetailID equals q.FundingDetailID into qs
                         from q in qs.DefaultIfEmpty()
                         where new[] { SystemValues.BusinessCaseApprovedStatus, SystemValues.NFBusinessCaseApprovedStatus }.Contains((int)c.FundingDetail.FundingEntityStatusID)
                            && c.FundingDetail.FiscalYear == FiscalYear
                            && ((q == null) || (!(q.IsSubmitted) && (q.NotifiedDate == null || q.NotifiedDate < OverdueResendDate)))
                         select new
                         {
                             FundingDetailID = c.FundingDetail.FundingDetailID,
                             FundingEntityTypeID = c.FundingDetail.FundingEntityTypeID,
                             FormattedID = c.FundingDetail.FormattedID,
                             Name = c.FundingDetail.Name,
                             FiscalYear = c.FundingDetail.FiscalYear1.Description,
                             Quarter = @"Q" + Quarter.ToString(),
                             HSP = c.FundingDetail.Account.Name,
                             LHINLeadName = c.FundingDetail.UserProfile1.UserFullName,
                             SMTDirectorName = c.FundingDetail.UserProfile2.UserFullName,
                             EntityDate = q.NotifiedDate,
                             CreatedDate = c.CreatedDate,
                         };

            foreach (var bc in BCList)
            {
                var editorViewModel = new SelectEntityEditorVM()
                {
                    FundingDetailID = bc.FundingDetailID,
                    FundingEntityTypeID = bc.FundingEntityTypeID,
                    EntityID = bc.FormattedID,
                    EntityName = bc.Name,
                    HSP = bc.HSP,
                    FiscalYear = bc.FiscalYear,
                    Quarter = bc.Quarter,
                    CreatedDate = bc.CreatedDate,
                    EntityDate = bc.EntityDate,
                    LHINLeadName = bc.LHINLeadName,
                    SMTDirectorName = bc.SMTDirectorName,
                    Selected = false
                };
                model.Entities.Add(editorViewModel);
            }

            var SFList = from c in UoW.DBContext.FundingRequests
                         join q in dbs on c.FundingDetailID equals q.FundingDetailID into qs
                         from q in qs.DefaultIfEmpty()
                         where new[] { SystemValues.SFFundingApprovedStatus }.Contains((int)c.FundingDetail.FundingEntityStatusID)
                            && c.FundingDetail.FiscalYear == FiscalYear
                            && ((q == null) || (!(q.IsSubmitted) && (q.NotifiedDate == null || q.NotifiedDate < OverdueResendDate)))
                         select new
                         {
                             FundingDetailID = c.FundingDetail.FundingDetailID,
                             FundingEntityTypeID = c.FundingDetail.FundingEntityTypeID,
                             FormattedID = c.FundingDetail.FormattedID,
                             Name = c.FundingDetail.Name,
                             FiscalYear = c.FundingDetail.FiscalYear1.Description,
                             Quarter = @"Q" + Quarter.ToString(),
                             HSP = c.FundingDetail.Account.Name,
                             LHINLeadName = c.FundingDetail.UserProfile1.UserFullName,
                             SMTDirectorName = c.FundingDetail.UserProfile2.UserFullName,
                             EntityDate = q.NotifiedDate,
                             CreatedDate = c.CreatedDate,
                         };

            foreach (var sf in SFList)
            {
                var editorViewModel = new SelectEntityEditorVM()
                {
                    FundingDetailID = sf.FundingDetailID,
                    FundingEntityTypeID = sf.FundingEntityTypeID,
                    EntityID = sf.FormattedID,
                    EntityName = sf.Name,
                    HSP = sf.HSP,
                    FiscalYear = sf.FiscalYear,
                    Quarter = sf.Quarter,
                    CreatedDate = sf.CreatedDate ?? DateTime.Now.Date,
                    EntityDate = sf.EntityDate,
                    LHINLeadName = sf.LHINLeadName,
                    SMTDirectorName = sf.SMTDirectorName,
                    Selected = false
                };
                model.Entities.Add(editorViewModel);
            }

            return View(model);
        }

        [HttpPost]
        public ActionResult Details(EntitySelectionVM model, int FiscalYear, int Quarter, int? ResendOverdureDays)
        {
            int NotificationSent = 0;
            try
            {
                SelectEntityEditorVM se = model.Entities.FirstOrDefault();
                foreach (var fundingDetailID in model.getSelectedIds())
                {
                    FundingDetail fd = UoW.FundingDetailRepo.GetFundingDetailById(fundingDetailID);
                    if (fd != null && new[] { SystemValues.BusinessCaseApprovedStatus, SystemValues.NFBusinessCaseApprovedStatus, SystemValues.SFFundingApprovedStatus }.Contains((int)fd.FundingEntityStatusID))
                    {
                        String strURL = Request.Url.GetLeftPart(UriPartial.Authority);
                        NotificationManager NM = new NotificationManager();
                        if (NM.SendEmailNotification(SystemValues.WorkPlanDeliverableNotification, fd.FundingDetailID, fd.FormattedID, String.Empty, String.Empty, strURL))
                        {
                            FundingActionPlanStatu fds = UoW.FundingActionPlanStatuRepo.GetFundingActionPlanStatuByFD(fd.FundingDetailID, FiscalYear, Quarter);
                            if (fds == null)
                            {
                                fds = new FundingActionPlanStatu();
                                fds.FundingDetailID = fd.FundingDetailID;
                                fds.FiscalYear = FiscalYear;
                                fds.Period = Quarter;
                                fds.NotifiedDate = DateTime.Now;
                                fds.CreatedDate = DateTime.Now;
                                fds.CreatedBy = GetCurrentUser().UserID;
                                fds.UpdatedDate = DateTime.Now;
                                fds.UpdatedBy = GetCurrentUser().UserID;
                                UoW.DBContext.FundingActionPlanStatus.Add(fds);
                            }
                            else
                            {
                                fds.NotifiedDate = DateTime.Now;
                                fds.UpdatedDate = DateTime.Now;
                                fds.UpdatedBy = GetCurrentUser().UserID;
                                UoW.DBContext.Entry(fds).State = System.Data.Entity.EntityState.Modified;
                            }
                            UoW.DBContext.SaveChanges();
                            NotificationSent++;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Action Plan Stauts Notification", GetCurrentUser().UserID, "Notify");
            }
            if (NotificationSent > 0) TempData[Common.ActionPlan_Notify_TempDataKey] = NotificationSent.ToString() + Common.ActionPlan_Notify_SuccessMessage;
            return RedirectToAction("Details", new { ResendOverdureDays = ResendOverdureDays });
        }

    }
}