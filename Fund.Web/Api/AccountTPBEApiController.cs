using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HFund.Utility;
using HFund.Repository;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.Data.DTO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;

namespace HFund.Web.Api
{
    [RoutePrefix("api/AccountTPBEApi")]
    [Authorize(Roles = Common.LHINBaseRole)]
    public class AccountTPBEApiController : BaseApiController
    {

        
        [HttpPost]
        [Route("GetSectors_ByAccountId")]
        public HttpResponseMessage GetSectors_ByAccountId(JObject data)
        {
            // only need one parameter [accountId]
            List<dynamic> _pairList = new List<dynamic>();
            string _userId = string.Empty;

            try
            {
                UserProfile _UserProfile = GetCurrentUser();
                _userId = _UserProfile.UserID;
                dynamic json = data;
                string _accountIdStr = json.accountId;
                int _accountId = Convert.ToInt32(_accountIdStr);

                Dictionary<int, string> _sectors = UoW.AccountTPBERepo.Api_GetSectors_ByAccountId(_accountId);

                foreach (var item in _sectors)
                {
                    dynamic _pair = new System.Dynamic.ExpandoObject();
                    _pair.sectorId = item.Key;
                    _pair.shortDescription = item.Value;
                    _pairList.Add(_pair);
                }


            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountTPBEApi/GetSectors_ByAccountId", _userId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, _pairList);
          
        }

     





    }




}
