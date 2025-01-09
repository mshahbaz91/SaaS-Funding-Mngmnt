using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Utility;

namespace HFund.Web.Controllers
{


    [Authorize(Roles = Common.LHINBaseRole)]
    public class ActivityCompletedController : BaseController
    {
        // GET: Deliverable


        #region Quarterly Report Actvity Completed

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Completed_Create(int id)
        {
           

            Activity _Act = new Activity();
            _Act.FundingDetailID = id;
            _Act.PlannedCompletedInd = true;
            _Act.ActivitySeqNo = UoW.ActivityRepo.GetNextMaxActivitySeqNo_ByFundingDetailId(id, true);

            return View(_Act);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Completed_Create(Activity model, string submitBtn)
        {

            try
            {

                if (ModelState.IsValid)
                {
                    string _UserId = GetCurrentUser().UserID;

                    model.ActivityID = model.ActivityID;
                    model.FundingDetailID = model.FundingDetailID;
                    model.ActivityDescription = model.ActivityDescription;
                    model.PlannedCompletedInd = true;
                    model.ActivitySeqNo = UoW.ActivityRepo.GetNextMaxActivitySeqNo_ByFundingDetailId(model.FundingDetailID, true);
                    model.CreatedBy = _UserId;
                    model.CreatedDate = DateTime.Now;
                    model.UpdatedBy = _UserId;
                    model.UpdatedDate = DateTime.Now;
                    UoW.DBContext.Activities.Add(model);
                    UoW.DBContext.SaveChanges();

                    TempData[Common.HSP_Activity_PQR_TempDataKey] = Common.HSP_Activity_PQR_CreateSuccessMessage;
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId_PreSetSeqNo(model.FundingDetailID, true);
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId(model.FundingDetailID, true);


                    switch (submitBtn)
                    {
                        case Common.BTNSaveNew:
                            return RedirectToAction("Completed_Create", new { id = model.FundingDetailID });

                        default:

                            return RedirectToAction("Details", new { id = model.FundingDetailID });
                    }

                }


            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Activity/Completed_Create");
                UoW.SaveChanges();
            }


            return View(model);
        }




        public ActionResult Planned_Create(int id)
        {
       
            Activity _Act = new Activity();
            _Act.FundingDetailID = id;
            _Act.PlannedCompletedInd = false;
            _Act.ActivitySeqNo = UoW.ActivityRepo.GetNextMaxActivitySeqNo_ByFundingDetailId(id, false);

            return View(_Act);
        }




        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Planned_Create(Activity model, string submitBtn)
        {

            try
            {

                if (ModelState.IsValid)
                {
                    string _UserId = GetCurrentUser().UserID;

                    model.ActivityID = model.ActivityID;
                    model.FundingDetailID = model.FundingDetailID;
                    model.ActivityDescription = model.ActivityDescription;
                    model.PlannedCompletedInd = false;
                    model.ActivitySeqNo = UoW.ActivityRepo.GetNextMaxActivitySeqNo_ByFundingDetailId(model.FundingDetailID, false);

                    model.CreatedBy = _UserId;
                    model.CreatedDate = DateTime.Now;
                    model.UpdatedBy = _UserId;
                    model.UpdatedDate = DateTime.Now;
                    UoW.DBContext.Activities.Add(model);
                    UoW.DBContext.SaveChanges();

                    TempData[Common.HSP_Activity_PQR_TempDataKey] = Common.HSP_Activity_PQR_CreateSuccessMessage;
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId_PreSetSeqNo(model.FundingDetailID, false);
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId(model.FundingDetailID, false);

                    switch (submitBtn)
                    {
                        case Common.BTNSaveNew:
                            return RedirectToAction("Planned_Create", new { id = model.FundingDetailID });

                        default:

                            return RedirectToAction("Details", new { id = model.FundingDetailID });
                    }

                }

            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Activity/Planned_Create");
                UoW.SaveChanges();
            }

            return View(model);
        }



        public ActionResult Delete(int id)
        {
            Activity _Act = UoW.ActivityRepo.GetActivityById(id);
           
            return View(_Act);

        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Activity _Act = UoW.ActivityRepo.GetActivityById(id);
            int fundingDetailID = _Act.FundingDetailID;
            bool _isCompleted = _Act.PlannedCompletedInd;
        

            if (_Act == null)
            {
                return View();
            }
            else
            {
                int _FundingDetailID = (int)_Act.FundingDetailID;
                UoW.ActivityRepo.DeleteActivity(_Act);
                UoW.SaveChanges();

                TempData[Common.HSP_Activity_PQR_TempDataKey] = Common.HSP_Activity_PQR_DeleteSuccessMessage;

                if (_isCompleted == true)
                {
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId_PreSetSeqNo(_FundingDetailID, true);
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId(_FundingDetailID, true);
                }
                else
                {
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId_PreSetSeqNo(_FundingDetailID, false);
                    UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId(_FundingDetailID, false);
                }

                return RedirectToAction("Details", new { id = _FundingDetailID });
            }

        }




        public ActionResult Details(int id)
        {

            ViewBag.FundingDetailID = id;

           //  ViewBag.BusinessCaseBreadCrumbVM = UoW.FundingDetailRepo.GetBusinessCaseBreadCrumbPath_ByFundingDetailId(id);

            IEnumerable<Activity> _activityList = from c in UoW.ActivityRepo.GetAllActivity_FilterByFundingDetailId(id)
                                                  select c;

            return View(_activityList);
        }




        public ActionResult Edit(int id)
        {
            Activity _Act = UoW.ActivityRepo.GetActivityById(id);
            _Act.FundingDetailID = _Act.FundingDetailID;
           
            return View(_Act);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Activity model)
        {

            try
            {

                if (ModelState.IsValid)
                {
                    Activity _Act = UoW.ActivityRepo.GetActivityById(model.ActivityID);
                    _Act.ActivityID = model.ActivityID;
                    bool _originalIsCompleted = _Act.PlannedCompletedInd;

                    _Act.ActivityDescription = model.ActivityDescription;
                    _Act.PlannedCompletedInd = model.PlannedCompletedInd;

                    if (_originalIsCompleted != _Act.PlannedCompletedInd)
                    {
                        if (model.PlannedCompletedInd == true)
                        {
                            _Act.ActivitySeqNo = UoW.ActivityRepo.GetNextMaxActivitySeqNo_ByFundingDetailId(model.FundingDetailID, true);

                        }
                        else
                        {
                            _Act.ActivitySeqNo = UoW.ActivityRepo.GetNextMaxActivitySeqNo_ByFundingDetailId(model.FundingDetailID, false);
                        }
                    }

                    _Act.UpdatedDate = DateTime.Now;
                    _Act.UpdatedBy = GetCurrentUser().UserID;
                    UoW.DBContext.Entry(_Act).State = System.Data.Entity.EntityState.Modified;
                    UoW.DBContext.SaveChanges();

                    TempData[Common.HSP_Activity_PQR_TempDataKey] = Common.HSP_Activity_PQR_UpdateSuccessMessage;

                    // sorting order may be in incorrect
                    if (_originalIsCompleted != model.PlannedCompletedInd)
                    {
                        UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId_PreSetSeqNo(model.FundingDetailID, true);
                        UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId(model.FundingDetailID, true);

                        UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId_PreSetSeqNo(model.FundingDetailID, false);
                        UoW.ActivityRepo.SortActivitySeqNo_ByFundingDetailId(model.FundingDetailID, false);
                    }
                         
                    return RedirectToAction("Details", new { id = model.FundingDetailID });
                }

            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Activity/Edit");
                UoW.SaveChanges();
            }


            return View(model);
        }





      



       


        #endregion
       

     


    }


}