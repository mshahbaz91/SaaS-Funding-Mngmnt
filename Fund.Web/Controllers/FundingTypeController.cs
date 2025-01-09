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
    public class FundingTypeController : BaseController
    {
        // GET: FundingType
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult GetFundingType_ForDropdownList()
        {
            var SelectedData = from fT in UoW.FundingTypeRepo.GetAllFundingType().Where( c => c.ActiveInd == true)
                               select new { FundingTypeID = fT.FundingTypeID, FundingTypeDescription = fT.FundingTypeDescription };

            return Json(SelectedData);
        }


        [HttpPost]
        public JsonResult SetFundingType_ForDropdownList(int? fundingTypeID)
        {
            var SelectedData = from fT in UoW.FundingTypeRepo.GetAllFundingType().Where(c => c.ActiveInd == true || c.FundingTypeID == fundingTypeID)
                               select new { FundingTypeID = fT.FundingTypeID, FundingTypeDescription = fT.FundingTypeDescription };


            return Json(SelectedData);
        }



    }





}