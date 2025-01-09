using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Utility;
using HFund.Web.Filters;
using HFund.Data.ViewModels;


namespace HFund.Web.Controllers
{

    [CustomAuth(ControllerName = "AdminHome", ActionName = "Enable")]
    public class Admin_UnitofMeasureController : BaseController
    {
        // GET: Admin_UnitofMeasure
        public ActionResult Index()
        {
            return RedirectToAction("Details");
        }


        public ActionResult Details()
        {
            ViewBag.SAASectorID = UoW.SAASectorRepo.GetSAASector_ddl();
            return View();
        }



        public ActionResult Create()
        {

            Admin_UnitOfMeasure_VM _itemVM = new Admin_UnitOfMeasure_VM();

            ViewBag.SAASectorID = UoW.SAASectorRepo.GetSAASector_ddl();
            ViewBag.UnitOfMeasureTypeID =  UoW.UnitofMeasureTypeRepo.GetUnitofMeasure_ddl();

            return View(_itemVM);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Admin_UnitOfMeasure_VM model)
        {
            try
            {
              
                ViewBag.SAASectorID = UoW.SAASectorRepo.SetSAASector_ddl( model.SAASectorID);
                ViewBag.UnitOfMeasureTypeID = UoW.UnitofMeasureTypeRepo.SetUnitofMeasure_ddl(model.UnitOfMeasureTypeID);

                if (ModelState.IsValid)
                {
                    UnitofMeasure newItem = new UnitofMeasure();

                    newItem.UnitofMeasureDescription = model.UnitOfMeasureDescription;

                    newItem.SAASectorID = model.SAASectorID;
                    newItem.UnitofMeasureTypeID = model.UnitOfMeasureTypeID;
                    newItem.ActiveInd = model.ActiveInd;
                
                    newItem.CreatedBy = GetCurrentUser().UserID;
                    newItem.CreatedDate = DateTime.Now;
                    newItem.UpdatedBy = GetCurrentUser().UserID;
                    newItem.UpdatedDate = DateTime.Now;

                    UoW.DBContext.UnitofMeasures.Add(newItem);
                    UoW.DBContext.SaveChanges();

                    TempData[Common.Admin_UnitOfMeasure_TempDataKey] = Common.Admin_UnitOfMeasure_CreateSuccessMessage;
                    return RedirectToAction("Details");
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Admin_UnitOfMeasure/Create");
                UoW.SaveChanges();
            }

            return View(model);
        }




        public ActionResult Edit(int id)
        {
            UnitofMeasure _lineItem = UoW.UnitofMeasureRepo.GetUnitofMeasureById(id);

            Admin_UnitOfMeasure_VM itemVM = new Admin_UnitOfMeasure_VM();

            ViewBag.SAASectorID = UoW.SAASectorRepo.GetSAASector_ddl();
            ViewBag.UnitOfMeasureTypeID = UoW.UnitofMeasureTypeRepo.GetUnitofMeasure_ddl();


            if (_lineItem != null)
            {
                itemVM.UnitOfMeasureID = _lineItem.UnitofMeasureID;
                itemVM.UnitOfMeasureDescription = _lineItem.UnitofMeasureDescription;

                itemVM.SAASectorID = _lineItem.SAASectorID;
                itemVM.UnitOfMeasureTypeID = _lineItem.UnitofMeasureTypeID;
                itemVM.ActiveInd = _lineItem.ActiveInd;

                ViewBag.SAASectorID = UoW.SAASectorRepo.SetSAASector_ddl(itemVM.SAASectorID);
                ViewBag.UnitOfMeasureTypeID = UoW.UnitofMeasureTypeRepo.SetUnitofMeasure_ddl(itemVM.UnitOfMeasureTypeID);
            }

            return View(itemVM);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Admin_UnitOfMeasure_VM model)
        {

            try
            {

                ViewBag.SAASectorID = UoW.SAASectorRepo.SetSAASector_ddl(model.SAASectorID);
                ViewBag.UnitOfMeasureTypeID = UoW.UnitofMeasureTypeRepo.SetUnitofMeasure_ddl(model.UnitOfMeasureTypeID);

                if (ModelState.IsValid)
                {
                    UnitofMeasure  _item = UoW.UnitofMeasureRepo.GetUnitofMeasureById(model.UnitOfMeasureID);

                    _item.UnitofMeasureDescription = model.UnitOfMeasureDescription;
                    _item.SAASectorID = model.SAASectorID;
                    _item.UnitofMeasureTypeID = model.UnitOfMeasureTypeID;
                    _item.ActiveInd = model.ActiveInd;
                    _item.UpdatedDate = DateTime.Now;
                    _item.UpdatedBy = GetCurrentUser().UserID;

                    UoW.DBContext.Entry(_item).State = System.Data.Entity.EntityState.Modified;
                    UoW.DBContext.SaveChanges();

                    TempData[Common.Admin_UnitOfMeasure_TempDataKey] = Common.Admin_UnitOfMeasure_UpdateSuccessMessage;
                    return RedirectToAction("Details");
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "UnitOfMeasure/Edit");
                UoW.SaveChanges();
            }

            return View(model);
        }



    }

}