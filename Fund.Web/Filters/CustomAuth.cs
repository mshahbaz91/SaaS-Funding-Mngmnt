using System;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Repository;
using HFund.Utility;
using System.Web.Security;
using System.Text;

namespace HFund.Web.Filters
{
    public class CustomAuth : AuthorizeAttribute
    {
        public string ControllerName {get; set;}
        public string ActionName { get; set; }
        HFundUnitOfWork UoW = null;

        public CustomAuth()
        {
          // _UserLoginID = Users.
            UoW = new HFundUnitOfWork();
          
        }


        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool _IsAuth = true;
            string _UserLoginEmailID = httpContext.User.Identity.Name;
            string _userProfileEmailAddress = string.Empty;
            int _userProfileId = 0;
            if ( UoW == null)
            {
                UoW = new HFundUnitOfWork();
            }
          
            // _IsAuth = UoW.SystemObjectRepo.ActionAllowed(_UserLoginEmailID, ControllerName, ActionName);
            if (httpContext.Request.Cookies[Common.UserProfileId_CookieName] != null)
            {
                _userProfileId = Convert.ToInt32(CookieHandler.GetDecryptedValue(httpContext.Request.Cookies[Common.UserProfileId_CookieName].Value));
                UserProfile _userProfile = UoW.UserProfileRepo.GetUserProfileById(_userProfileId);
                _userProfileEmailAddress = _userProfile.UserEmailID;
            }
            _IsAuth = UoW.SystemObjectRepo.ActionAllowed(_userProfileId, ControllerName, ActionName);
            return _IsAuth;
        }




    }

}