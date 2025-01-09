using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Utility;

namespace HFund.Web.Controllers
{

   [Authorize(Roles = Common.LHINBaseRole)]
    public class HSIPController : BaseController
    {
        // GET: HSIP
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Create()
        {

            return View();
        }



    }

}