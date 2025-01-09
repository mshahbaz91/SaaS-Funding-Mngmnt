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
    [RoutePrefix("api/AccountApi")]
    [Authorize(Roles = Common.LHINBaseRole)]
    public class AccountApiController : BaseApiController
    {


        [HttpPost]
        [Route("GetSubRegionId_ByAccountId")]
        public HttpResponseMessage GetSubRegionId_ByAccountId(JObject data)
        {
            // need one parameter ( HspId == AccountId )

            string _userProfileId = string.Empty;
            int? _accountId = 0;
            int _subRegionId = 0;

            try
            {
                _userProfileId = GetCurrentUser().UserID.ToString();

                dynamic json = data;
                string _hspIdStr = json.hspId;
                if (!string.IsNullOrEmpty(_hspIdStr))
                {
                    _accountId = Convert.ToInt32(_hspIdStr);
                }

                Account _account = UoW.AccountRepo.GetAccountById((int)_accountId);

                if (_account != null)
                {
                    if ( _account.SubRegionID.HasValue)
                    {
                        _subRegionId = (int)_account.SubRegionID;
                    }
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "AccountApi/GetSubRegionId_ByAccountId", _userProfileId, "");
                UoW.SaveChanges();
                // return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
                return Request.CreateResponse(HttpStatusCode.OK, new { subRegionId = _subRegionId });
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { subRegionId = _subRegionId });


        }






    }




}
