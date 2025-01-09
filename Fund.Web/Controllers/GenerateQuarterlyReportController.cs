using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using System.Data.Entity.Validation;
using HFund.Utility;
using HFund.Repository;
using HFund.Web.ApplicationServices;
using HFund.Web.ValidationRules;

namespace HFund.Web.Controllers
{
    [Authorize(Roles = Common.LHINBaseRole)]
    public class GenerateQuarterlyReportController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Details(int? FundingTypeID, DateTime ?DueDate)
        {
            FundingTypeID = FundingTypeID ?? 0;
            ViewBag.FundingTypeID = FundingTypeID;
            ViewBag.FundingTypeList = UoW.FundingTypeRepo.SetFundingType_ddl(FundingTypeID);

            int FiscalYear = SystemValues.CurrentFiscalYear;
            int Quarter = SystemValues.CurrentPeriod;

            if (!SystemValues.DesignatedReportPeriod)
            {
                FiscalYear = Common.getCurrentFiscalYear();
                Quarter = Common.getCurrentQuarter();
                if (FiscalYear != SystemValues.CurrentFiscalYear || Quarter != SystemValues.CurrentPeriod)
                {
                    try {
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

            ViewBag.DueDate = (DueDate ?? Common.getQuarterEndDate(FiscalYear, Quarter).Add(new TimeSpan(SystemValues.QuarterlyReportUpdatePeriod, 0, 0, 0))).Date;

            ProjectSelectionVM model = new ProjectSelectionVM();

            var ProjectList =   from c in UoW.DBContext.Projects
                                 let QuarterReports = from q in UoW.DBContext.QuarterlyProjectReports
                                                     where (q.FiscalYear == FiscalYear) && (q.Period == Quarter)
                                                    select q.FundingDetail.FundingEntityID
                               where new [] { SystemValues.ProjectInProgressStatus, SystemValues.NFProjectInProgressStatus }.Contains((int) c.FundingDetail.FundingEntityStatusID) 
                                  && c.FundingDetail.FiscalYear == FiscalYear
                                  && c.ReportingRequiredInd == true
                                  && !QuarterReports.Contains(c.FundingDetailID)
                               select new
                               {
                                   FundingDetailID = c.FundingDetailID,
                                   FormattedID = c.FundingDetail.FormattedID,
                                   Name = c.FundingDetail.Name,
                                   HSP = c.FundingDetail.Account.Name,
                                   CreatedDate = c.CreatedDate
                               };
            foreach (var pl in ProjectList)
            {
                if (UoW.ProjectRepo.ReadyGenerateQuarterlyReport(pl.FundingDetailID))
                {
                    var IFTIDList = from c in UoW.DBContext.IdentifiedFundingTypes
                                  where c.FundingDetailID == pl.FundingDetailID
                                  select (int?) c.FundingTypeID;
                    if (FundingTypeID == 0 || IFTIDList.Contains(FundingTypeID))
                    {
                        String strFundingTypeList = String.Empty;
                        var IFTList = from c in UoW.DBContext.IdentifiedFundingTypes
                                      where c.FundingDetailID == pl.FundingDetailID
                                      select c.FundingType.FundingTypeDescription;
                        foreach (String ft in IFTList)
                        {
                            strFundingTypeList = (strFundingTypeList == String.Empty) ? ft : strFundingTypeList + @"\" + ft;
                        }
                        var editorViewModel = new SelectProjectEditorVM()
                        {
                            FundingDetailID = pl.FundingDetailID,
                            EntityID = pl.FormattedID,
                            ProjectName = pl.Name,
                            HSP = pl.HSP,
                            FundingTypeDescription = strFundingTypeList,
                            CreatedDate = pl.CreatedDate,
                            Selected = false
                        };
                        model.Projects.Add(editorViewModel);
                    }
                }

            }

            return View(model);
        }

        [HttpPost]
        public ActionResult Details(ProjectSelectionVM model, int FundingTypeID, DateTime DueDate)
        {
            int ReportGenerated = 0;
            try
            {
                int FiscalYear = SystemValues.CurrentFiscalYear;
                int Quarter = SystemValues.CurrentPeriod;
                if (!SystemValues.DesignatedReportPeriod)
                {
                    FiscalYear = Common.getCurrentFiscalYear();
                    Quarter = Common.getCurrentQuarter();
                    if (FiscalYear != SystemValues.CurrentFiscalYear || Quarter != SystemValues.CurrentPeriod)
                    {
                        SqlParameter parm = new SqlParameter() { ParameterName = "@Result", SqlDbType = SqlDbType.Int, Direction = System.Data.ParameterDirection.Output };
                        UoW.DBContext.Database.ExecuteSqlCommand("EXEC @Result = spUpdateCurrentPeriod", parm);

                    }
                }
                foreach (int fundingDetailID in model.getSelectedIds())
                {
                    if (validateProject(fundingDetailID))
                    {
                        try
                        {
                            SqlParameter pQuarterlyReportID = new SqlParameter() { ParameterName = "@Result", SqlDbType = SqlDbType.Int, Direction = System.Data.ParameterDirection.Output };
                            UoW.DBContext.Database.ExecuteSqlCommand("EXEC @Result = spAddQuarterlyProjectReport @ProjectDetailID, @DueDate,  @CreatedBy", pQuarterlyReportID,
                                                                     new SqlParameter("@ProjectDetailID", fundingDetailID.ToString()),
                                                                     new SqlParameter("@DueDate", DueDate.Date.ToString()),
                                                                     new SqlParameter("@CreatedBy", GetCurrentUser().UserID));

                            int QuarterlyReportID = (int)pQuarterlyReportID.Value;
                            if (QuarterlyReportID > 0)
                            {
                                ReportGenerated++;
                                #if (DistributeQuarterlyReport) 
                                FundingDetail fd = UoW.FundingDetailRepo.GetFundingDetailById(QuarterlyReportID);
                                var nextStatusId = UoW.StatusTaskRepo.GetNextStatusID(fd.FundingEntityStatusID, SystemValues.ForwardReportTask);
                                String strFromStatus = UoW.EntityStatusRepo.GetEntityStatusById((int)fd.FundingEntityStatusID).StatusDescription;
                                String strToStatus = UoW.EntityStatusRepo.GetEntityStatusById((int)nextStatusId).StatusDescription;

                                fd.TaskID = SystemValues.ForwardReportTask;
                                fd.FundingEntityStatusID = nextStatusId;
                                fd.StatusUpdatedDate = DateTime.Now;
                                fd.UpdatedDate = DateTime.Now;
                                UoW.DBContext.Entry(fd).State = System.Data.Entity.EntityState.Modified;
                                UoW.DBContext.SaveChanges();

                                NotificationManager NM = new NotificationManager();
                                NM.SendEmailNotification(UoW.TaskRepo.GetTaskById((int)fd.TaskID).NotificationID, fd.FundingDetailID, fd.FormattedID, strFromStatus, strToStatus);
                                #endif
                            }
                        }
                        catch (Exception ex)
                        {
                            ModelState.AddModelError("", ex.Message.ToString());
                            UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Generate Quarterly Report", GetCurrentUser().UserID, "Generate");
                        } 
                    }
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Generate Quarterly Report", GetCurrentUser().UserID, "Generate");
            }
            if (ReportGenerated > 0) TempData[Common.Generate_QPR_TempDataKey] = ReportGenerated.ToString() + Common.Generate_QPR_SuccessMessage;
            return RedirectToAction("Details", new { FundingTypeID = FundingTypeID, DueDate = DueDate.ToString("MM/dd/yyyy") });
        }

        public Boolean validateProject(int fundingDetailID) 
        {
            return UoW.ProjectRepo.ReadyGenerateQuarterlyReport(fundingDetailID);
        }

        public ActionResult Print()
        {
            int FiscalYear = SystemValues.CurrentFiscalYear;
            int Quarter = SystemValues.CurrentPeriod;
            if (!SystemValues.DesignatedReportPeriod)
            {
                FiscalYear = Common.getCurrentFiscalYear();
                Quarter = Common.getCurrentQuarter();
            }

            byte[] ReportFile = ReportManager.QuarterlyReportList.GenerateReport(FiscalYear, Quarter);
            return File(ReportFile, ReportManager.QuarterlyReportList.MIMEType, @"Quarterly Reports List (" + DateTime.Now.ToString("yyyyMMddHHmmss") + @")." + ReportManager.QuarterlyReportList.Extension);
        }

    }
}