using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Utility;
using HFund.Repository;

namespace HFund.Web.Controllers
{


   [Authorize(Roles = Common.LHINBaseRole)]
    public class AdditionalRequirementController : BaseController
    {
        // AdditionalRequirement => for only in ProjectCharter for far

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Create(int id)
        {
            AdditionalRequirement _Ar = new AdditionalRequirement();

            _Ar.FundingDetailID = id;
            _Ar.SeqNo = UoW.AdditionalRequirementRepo.GetNextMaxAdditionalRequirementSeqNo_ByFundingDetailId(id);

            FundingDetail _Project_FD = UoW.FundingDetailRepo.GetFundingDetailById(id);
            ViewBag.ProjectCharterStatusID = _Project_FD.FundingEntityStatusID;

            return View(_Ar);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(AdditionalRequirement model, string submitBtn)
        {
                try
                {
                    FundingDetail _Project_FD = UoW.FundingDetailRepo.GetFundingDetailById(model.FundingDetailID);
                    ViewBag.ProjectCharterStatusID = _Project_FD.FundingEntityStatusID;

                    if (ModelState.IsValid)
                    {
                            model.AdditionalRequirementID = model.AdditionalRequirementID;
                            model.FundingDetailID = model.FundingDetailID;
                            model.SeqNo = model.SeqNo;
                            model.Requirement = model.Requirement;
                            model.Description = model.Description;
                            model.CreatedBy = GetCurrentUser().UserID;
                            model.CreatedDate = DateTime.Now;
                            model.UpdatedBy = GetCurrentUser().UserID;
                            model.UpdatedDate = DateTime.Now;
                            UoW.DBContext.AdditionalRequirements.Add(model);
                            UoW.DBContext.SaveChanges();

                            TempData[Common.AdditionalRequirement_PC_TempDataKey] = Common.AdditionalRequirement_PC_CreateSuccessMessage ;
                           
                            UoW.AdditionalRequirementRepo.SortAdditionalRequirementSeqNo_ByFundingDetailId_PreSet(model.FundingDetailID);
                            UoW.AdditionalRequirementRepo.SortAdditionalRequirementSeqNo_ByFundingDetailId(model.FundingDetailID);

                            switch (submitBtn)
                            {
                                case Common.BTNSaveNew:
                                    return RedirectToAction("Create", new { id = model.FundingDetailID });

                                default:

                                    return RedirectToAction("Details", new { id = model.FundingDetailID });
                            }

                     }

                }
                catch (Exception ex)
                {

                    ModelState.AddModelError("", ex.Message.ToString());
                    UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Deliverable/Create");
                    UoW.SaveChanges();
                }

            return View(model);
        }



        public ActionResult Details(int id)
        {

            ViewBag.FundingDetailID = id;

            // ViewBag.BusinessCaseBreadCrumbVM = UoW.FundingDetailRepo.GetBusinessCaseBreadCrumbPath_ByFundingDetailId(id);

            var fundingDetail = UoW.AdditionalRequirementRepo.GetAllAdditionalRequirement_FilterByFundingDetailId(id);

            FundingDetail _ProjectCharter_FD = UoW.FundingDetailRepo.GetFundingDetailById(id);

            ViewBag.ProjectCharterStatusID = _ProjectCharter_FD.FundingEntityStatusID;

            FundingDetail _Project_FD = UoW.FundingDetailRepo.GetFundingDetailById(_ProjectCharter_FD.FundingEntityID);

            ViewBag.ProjectFundingEntityTypeID = _Project_FD.FundingEntityTypeID;

            UoW.AdditionalRequirementRepo.SortAdditionalRequirementSeqNo_ByFundingDetailId_PreSet(id);

            UoW.AdditionalRequirementRepo.SortAdditionalRequirementSeqNo_ByFundingDetailId(id);

            return View(fundingDetail);
        }


        public ActionResult Delete(int id)
        {
            AdditionalRequirement _Ar = UoW.AdditionalRequirementRepo.GetAdditionalRequirementById(id);
            if (_Ar == null)
            {
                return View();
            }
            else
            {
                int _FundingDetailID = (int)_Ar.FundingDetailID;
                FundingDetail _Project_FD = UoW.FundingDetailRepo.GetFundingDetailById(_FundingDetailID);
                ViewBag.ProjectCharterStatusID = _Project_FD.FundingEntityStatusID;

                if (_Project_FD.FundingEntityStatusID != SystemValues.CharterApprovedStatus)
                {
                    UoW.AdditionalRequirementRepo.DeleteAdditionalRequirement(_Ar);
                    UoW.SaveChanges();

                    TempData[Common.AdditionalRequirement_PC_TempDataKey] = Common.AdditionalRequirement_PC_DeleteSuccessMessage;

                    UoW.AdditionalRequirementRepo.SortAdditionalRequirementSeqNo_ByFundingDetailId_PreSet(_FundingDetailID);
                    UoW.AdditionalRequirementRepo.SortAdditionalRequirementSeqNo_ByFundingDetailId(_FundingDetailID);

                }
               
                return RedirectToAction("Details", new { id = _FundingDetailID });
            }

        }


        public ActionResult Edit(int id)
        {
            AdditionalRequirement _Ar = UoW.AdditionalRequirementRepo.GetAdditionalRequirementById(id);
            _Ar.FundingDetailID = _Ar.FundingDetailID;

            FundingDetail _Project_FD = UoW.FundingDetailRepo.GetFundingDetailById(_Ar.FundingDetailID);
            ViewBag.ProjectCharterStatusID = _Project_FD.FundingEntityStatusID;

            return View(_Ar);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(AdditionalRequirement model)
        {
            try{

                   FundingDetail _Project_FD = UoW.FundingDetailRepo.GetFundingDetailById(model.FundingDetailID);
                   ViewBag.ProjectCharterStatusID = _Project_FD.FundingEntityStatusID;
                    if (ModelState.IsValid)
                    {
                                AdditionalRequirement _Arq = UoW.AdditionalRequirementRepo.GetAdditionalRequirementById(model.AdditionalRequirementID);
                                _Arq.AdditionalRequirementID = model.AdditionalRequirementID;
                                _Arq.SeqNo = model.SeqNo;
                                _Arq.Requirement = model.Requirement;
                                _Arq.Description = model.Description;
                                _Arq.UpdatedDate = DateTime.Now;
                                _Arq.UpdatedBy = GetCurrentUser().UserID;
                                UoW.DBContext.Entry(_Arq).State = System.Data.Entity.EntityState.Modified;
                                UoW.DBContext.SaveChanges();

                                TempData[Common.AdditionalRequirement_PC_TempDataKey] = Common.AdditionalRequirement_PC_UpdateSuccessMessage;

                                return RedirectToAction("Details", new { id = model.FundingDetailID });
                    }

                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message.ToString());
                    UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "AdditionalRquirement/Edit");
                    UoW.SaveChanges();
                }

            return View(model);
        }


    }


}