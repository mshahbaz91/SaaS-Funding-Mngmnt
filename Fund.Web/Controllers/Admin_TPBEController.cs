using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using System.Data.Entity.Validation;
using HFund.Utility;
using HFund.Web.ApplicationServices;
using HFund.Web.ValidationRules;
using HFund.Web.Filters;

namespace HFund.Web.Controllers
{

    [CustomAuth(ControllerName = "AdminHome", ActionName = "Enable")]
    public class Admin_TPBEController : BaseController
    {

        public ActionResult Details()
        {
           
            return View();
        }


   
        public ActionResult Create()
        {
            TPBEVM model = new TPBEVM();

            ViewBag.FundingLetterTemplateID = UoW.FundingLetterTemplateRepo.GetFundingLetterTemplate_ddl();

            ViewBag.RecoveryLetterTemplateID = UoW.FundingLetterTemplateRepo.GetRecoveryLetterTemplate_ddl();

            ViewBag.SectorID = UoW.SectorRepo.GetSector_ddl();

            return View(model);
        }


      
        [HttpPost]
        [ValidateAntiForgeryToken]
       public ActionResult Create(TPBEVM model)
       {
            try
            {
                UserProfile _UP = GetCurrentUser();

                ViewBag.FundingLetterTemplateID = UoW.FundingLetterTemplateRepo.SetFundingLetterTemplate_ddl(model.FundingLetterTemplateID);

                ViewBag.RecoveryLetterTemplateID = UoW.FundingLetterTemplateRepo.SetRecoveryLetterTemplate_ddl(model.RecoveryLetterTemplateID);

                ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);

                if ( ModelState.IsValid)
                {
                    TPBE newModel = new TPBE();
                    newModel.TPBEDescription = model.TpbeDescription;
                    newModel.ActiveInd = model.ActiveInd;
                    newModel.CreatedDate = DateTime.Now;
                    newModel.CreatedBy = _UP.UserID;
                    newModel.UpdatedDate = DateTime.Now;
                    newModel.UpdatedBy = _UP.UserID;
                    newModel.FundingLetterTemplateID = model.FundingLetterTemplateID;
                    newModel.TPBEShortName = model.TpbeDescription;
                    newModel.RecoveryLetterTemplateID = model.RecoveryLetterTemplateID;
                    newModel.SectorID = model.SectorID;
                    UoW.TPBERepo.InsertNewTPBE(newModel);
                    UoW.SaveChanges();

                    TempData[Common.Admin_TPBE_TempDataKey] = Common.Admin_TPBE_CreateSuccessMessage;

                    return RedirectToAction("Details", "Admin_TPBE");
                }

                
            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Admin_TPBE/Create", "", "");
                UoW.SaveChanges();
                ModelState.AddModelError("", ex.Message.ToString());
            }

            return View(model);
        }



        public ActionResult Edit(int id)
        {
            TPBEVM model = new TPBEVM();

            TPBE item = UoW.TPBERepo.GetTPBEById(id);

            if (item != null)
            {
                model.TpbeId = item.TPBEID;
                model.TpbeDescription = item.TPBEDescription;
                model.ActiveInd = item.ActiveInd;
                model.FundingLetterTemplateID = item.FundingLetterTemplateID;
                model.TpbeShortName = item.TPBEShortName;
                model.RecoveryLetterTemplateID = item.RecoveryLetterTemplateID;
                model.SectorID = item.SectorID;
            }

            ViewBag.FundingLetterTemplateID = UoW.FundingLetterTemplateRepo.SetFundingLetterTemplate_ddl(model.FundingLetterTemplateID);

            ViewBag.RecoveryLetterTemplateID = UoW.FundingLetterTemplateRepo.SetRecoveryLetterTemplate_ddl(model.RecoveryLetterTemplateID);

            ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);

            return View(model);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(TPBEVM model)
        {
          
            try
            {
                ViewBag.FundingLetterTemplateID = UoW.FundingLetterTemplateRepo.SetFundingLetterTemplate_ddl(model.FundingLetterTemplateID);

                ViewBag.RecoveryLetterTemplateID = UoW.FundingLetterTemplateRepo.SetRecoveryLetterTemplate_ddl(model.RecoveryLetterTemplateID);

                ViewBag.SectorID = UoW.SectorRepo.SetSector_ddl(model.SectorID);

                if (ModelState.IsValid)
                {
                    TPBE item = UoW.TPBERepo.GetTPBEById(model.TpbeId);
                    item.TPBEDescription = model.TpbeDescription;
                    item.ActiveInd = model.ActiveInd;
                    item.UpdatedBy = GetCurrentUser().UserID;
                    item.UpdatedDate = DateTime.Now;
                    item.FundingLetterTemplateID = model.FundingLetterTemplateID;
                    item.TPBEShortName = model.TpbeShortName;
                    item.RecoveryLetterTemplateID = model.RecoveryLetterTemplateID;
                    item.SectorID = model.SectorID;
                    UoW.TPBERepo.UpdateTPBE(item);
                    UoW.SaveChanges();

                    TempData[Common.Admin_TPBE_TempDataKey] = Common.Admin_TPBE_UpdateSuccessMessage ;
                    return RedirectToAction("Details", "Admin_TPBE");
                }


            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Admin_TPBE/Edit", "", "");
                UoW.SaveChanges();
                ModelState.AddModelError("", ex.Message.ToString());
            }

         

           
          

            return View(model);
        }







    }

}