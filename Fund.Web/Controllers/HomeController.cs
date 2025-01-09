using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Web.Models;
using HFund.Data.Models;
using HFund.Utility;
using HFund.Repository;
using System.Web.Security;
using HFund.Web.ApplicationServices;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Mail;
using System.Text;
using DocumentFormat.OpenXml.EMMA;
using System.Text.RegularExpressions;

namespace HFund.Web.Controllers
{
    public class HomeController : Controller
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);


        [AllowAnonymous]
        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "None")]
        public ActionResult SignIn(string returnUrl)
        {


            FormsAuthentication.SignOut();
            Response.Cookies.Clear();
            ViewBag.ReturnUrl = returnUrl;
            return View();

            //if ( User.Identity.IsAuthenticated)
            //{
            //    FormsAuthentication.SignOut();
            //    Response.Cookies.Clear();
            //    return RedirectToAction("SignIn");
            //}


            #region login V1 (not work)
            //  Session.Abandon();
            //  if (User.Identity.IsAuthenticated)
            //      FormsAuthentication.SignOut();

            //  ViewBag.ReturnUrl = returnUrl;
            //  return View();
            #endregion
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult SignIn(LoginModel model, string returnUrl)
        {
            HFundUnitOfWork UoW = new HFundUnitOfWork();
            string _Message = string.Empty;
            try
            {
                bool _IsValid = UoW.UserLoginRepo.UserLogin(model.LoginEmail, model.Password, ref _Message);
                Log.Info(string.Format("{0} login succesfuly to  FMT {1}", model.LoginEmail, DateTime.Now));
                if (_IsValid == true)
                {
                    FormsAuthentication.SetAuthCookie(model.LoginEmail.Trim(), false);
                    //Check If 2fa is activated for this organization
                    if (SystemValues.Is2FactorAuthentication)
                    {
                        Log.Info(string.Format("2 Factor Authentication is  activated for this organization"));
                        return RedirectToAction("Verification", "Home", new { returnUrl = returnUrl });

                    }
                    else
                    {

                        Log.Info(string.Format("2 Factor Authentication is not activated for this organization"));
                        if (returnUrl != null && returnUrl != String.Empty)
                        {
                            UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(model.LoginEmail.Trim());
                            IQueryable<UserProfile> _userProfiles = UoW.UserProfileRepo.GetAllIncluding(a => a.Account).Where(c => c.UserLoginID == _userLogin.UserLoginID && c.IsLogin == true);
                            if (_userProfiles.Count() > 0)
                            {
                                HttpCookie _cookie = new HttpCookie(Common.UserProfileId_CookieName, CookieHandler.GetEncryptedValue(_userProfiles.FirstOrDefault().UserProfileID.ToString()));
                                _cookie.Expires = DateTime.Now.AddDays(1);
                                Response.Cookies.Add(_cookie);
                                return Redirect(returnUrl);
                            }
                            else
                            {
                                @TempData[Common.UserLogin_TempDataKey] = "You don't have active associated organizations.";
                                return RedirectToAction("SignIn", "Home");
                            }
                        }
                        else
                        {
                            return RedirectToAction("UserDirectionScreen", "Home");
                        }
                    }
                }
                else
                {
                   // CreateAccessLog(0, model != null ? model.LoginEmail : null);
                    // If we got this far, something failed, redisplay form
                    Log.Warn(string.Format("{0} was invalid to login to FMT  at  {1}", model.LoginEmail, DateTime.Now));
                    ModelState.AddModelError("", _Message);
                    //insert into accesslog
                    return View(model);
                }
            }
            catch (Exception ex)
            {
               //CreateAccessLog(0, model != null ? model.LoginEmail : null);
                Log.Error(string.Format("{0} could not login to FMT  at  {1}", model.LoginEmail, DateTime.Now));
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "UserPasswordApi/ResetUserPassword", "", "");
                UoW.SaveChanges();
            }
            return View(model);
        }



        //public ActionResult Login(string returnUrl)
        //{
        //    FormsAuthentication.SignOut();
        //    Response.Cookies.Clear();
        //    ViewBag.ReturnUrl = returnUrl;
        //    return View();
        //}

        //Added By mshahbaz for checking the verification is required or not! 
        [Authorize]
        public ActionResult Verification(string returnUrl)
        {
            bool _IsUserTrusted = false;
            int trustedID = 0;

            HFundUnitOfWork UoW = new HFundUnitOfWork();
            try
            {
                UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(User.Identity.Name);
                TrustedUser _trustedUser = UoW.TrustedUserRepo.GetTrustedUserByRequestInfo(_userLogin.UserLoginID, Request.UserHostAddress, GetBrowserName());
                DateTime validateSession = DateTime.Now.Add(new TimeSpan(0, -30, 0));

                Session["UserProfileID"] = _userLogin.UserLoginID;
                Session["returnUrl"] = returnUrl;
                //check if verification is needed from trusted user
                _IsUserTrusted = (_trustedUser != null && _trustedUser.IsEmailSent == true && _trustedUser.CreatedDate > validateSession) ? true : false;
                Random generator = new Random();
                int _verificationCode = generator.Next(100000, 999999);
                //if is not trusted it should be redirect to verification page 
                if ((_trustedUser == null) || (_trustedUser != null && _trustedUser.IsActionSucess == false))
                {
                    Log.Info(string.Format("{0} was not  a trusted user ", _userLogin.UserEmailID));
                    ViewBag.UserName = _userLogin.UserEmailID;
                    ViewBag.returnUrl = returnUrl;
                    ViewBag.UserProfileID = _userLogin.UserLoginID;

                    if (_trustedUser != null && _trustedUser.IsEmailSent == true && _trustedUser.EmailSentDate > validateSession)
                    {
                        trustedID = _trustedUser.TrustedUserID;
                    }
                    else
                    {

                        trustedID = InsertUserTrustedInfo(_userLogin.UserLoginID, _verificationCode.ToString());
                    }
                    Session["trustedID"] = trustedID;
                    if ((trustedID != 0))
                    {
                        if (_trustedUser != null && _trustedUser.IsEmailSent == true && _trustedUser.EmailSentDate > validateSession)
                        {
                            Log.Info(string.Format("FMT sent you a verification code already ", _userLogin.UserEmailID));
                            ViewBag.Message = "Verification Code has been sent to you already! if you did not receive it press 'Resend Code !'";
                            return View();
                        }
                        else
                        {

                            SendVerificationEmail(_userLogin, _verificationCode, trustedID);
                            return View();
                        }
                    }
                    else
                    {
                        Log.Error(string.Format("FMT could not Insert {0} Information as a trusted user  ", _userLogin.UserEmailID));
                    }
                }
                else
                {
                    Session["trustedID"] = _trustedUser.TrustedUserID;
                    Log.Info(string.Format("{0} was a trusted user - TrustedID is  {1}", _userLogin.UserEmailID, _trustedUser.TrustedUserID));
                    //Using returnUrl for redirecting the returnUrl instead of home page (if redirecting from a
                    //specific link (Email)) after signing in / By Mozhgan Shahbaz
                    if (returnUrl != null && returnUrl != String.Empty)
                    {
                        IQueryable<UserProfile> _userProfiles = UoW.UserProfileRepo.GetAllIncluding(a => a.Account).Where(c => c.UserLoginID == _userLogin.UserLoginID && c.IsLogin == true);
                        if (_userProfiles.Any())
                        {
                            HttpCookie _cookie = new HttpCookie(Common.UserProfileId_CookieName, CookieHandler.GetEncryptedValue(_userProfiles.FirstOrDefault().UserProfileID.ToString()));
                            _cookie.Expires = DateTime.Now.AddDays(1); ; ;
                            Response.Cookies.Add(_cookie);
                            return Redirect(returnUrl);
                        }
                        else
                        {
                            @TempData[Common.UserLogin_TempDataKey] = "You don't have active associated organizations.";
                            return RedirectToAction("SignIn", "Home");
                        }
                    }
                    else
                    {
                        return RedirectToAction("UserDirectionScreen", "Home");
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("{0} verification can not processed -line 140 - exception {1}", User.Identity.Name, ex.Message));
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Home/Verification - line 140", "", "");
                UoW.SaveChanges();

            }
            return RedirectToAction("InternalServerError_500", "Error");
            //if verification is not needed then go to home page 

        }

        //Added By mshahbaz for resending the verification code ! 
        [Authorize]
        public JsonResult ResendVerification(string returnUrl)
        {
            int isExecuteSuccess = 0;
            int trustedID = 0;
            string browserName = Request.UserAgent.Split('/')[Request.UserAgent.Split('/').Length - 2].ToString();
            Random generator = new Random();
            int _verificationCode = generator.Next(100000, 999999);
            HFundUnitOfWork UoW = new HFundUnitOfWork();
            try
            {
                Log.Info(string.Format("resend  a verification code for {0} ", User.Identity.Name));
                UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(User.Identity.Name);
                TrustedUser _trustedUser = UoW.TrustedUserRepo.GetTrustedUserByRequestInfo(_userLogin.UserLoginID, Request.UserHostAddress, GetBrowserName());
                Session["UserProfileID"] = _userLogin.UserLoginID;
                if ((_trustedUser == null) || (_trustedUser != null && _trustedUser.IsActionSucess == false))
                {
                    Log.Info(string.Format("{0} was not  a trusted user ", _userLogin.UserEmailID));
                    ViewBag.UserName = _userLogin.UserEmailID;
                    ViewBag.returnUrl = returnUrl;
                    ViewBag.UserProfileID = _userLogin.UserLoginID;

                    //if (_trustedUser != null)
                    //{
                    //    trustedID = _trustedUser.TrustedUserID;
                    //    _trustedUser.VerificationCode = _verificationCode.ToString();
                    //    _trustedUser.CreatedDate = DateTime.Now;
                    //    UoW.TrustedUserRepo.UpdateTrustedUser(_trustedUser);
                    //    UoW.SaveChanges();
                    //}
                    //else
                    //{
                    trustedID = InsertUserTrustedInfo(_userLogin.UserLoginID, _verificationCode.ToString());
                    // }
                    SendVerificationEmail(_userLogin, _verificationCode, trustedID);
                    Session["trustedID"] = trustedID;
                    ViewBag.Message = "Verification Code Sent successfully!";
                    isExecuteSuccess = 1;
                }
            }
            catch (Exception ex)
            {
                isExecuteSuccess = 0;
                Log.Error(string.Format("{0} Resend Verification can not processed - exception {1}", User.Identity.Name, ex.Message));
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Home/ResendVerification", "", "");
                UoW.SaveChanges();
            }
            // return RedirectToAction("Verification","Home",new { VerificationModel = new VerificationModel(), returnUrl=returnUrl });
            return Json(new { isExecuteSuccess = isExecuteSuccess, errorMessage = " " });
        }

        //Added By mshahbaz for verifing the verification code ! 
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Verification(VerificationModel model, string returnUrl)
        {
            // string returnUrl = "";

            if (!string.IsNullOrEmpty(model.VerificationCode))
            {
                HFundUnitOfWork UoW = new HFundUnitOfWork();
                TrustedUser _trusted = new TrustedUser();
                try
                {
                    UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(User.Identity.Name);
                    ViewBag.UserName = _userLogin.UserEmailID;
                    ViewBag.returnUrl = returnUrl;
                    ViewBag.UserProfileID = _userLogin.UserLoginID;
                    if (!string.IsNullOrEmpty(Session["trustedID"].ToString()))
                    {
                        DateTime validateSession = DateTime.Now.Add(new TimeSpan(0, -30, 0));


                        _trusted = UoW.TrustedUserRepo.GetTrustedUserById(Convert.ToInt32(Session["trustedID"]));
                        //check 30 min  for Session 

                        _trusted.UpdatedBy = _userLogin.UserLoginID.ToString();
                        _trusted.UpdatedDate = DateTime.Now;
                        if (_trusted.CreatedDate > validateSession)
                        {
                            if (model.VerificationCode == _trusted.VerificationCode)
                            {
                                _trusted.IsActionSucess = true;
                                UoW.TrustedUserRepo.UpdateTrustedUser(_trusted);
                                UoW.SaveChanges();
                                if (returnUrl != null && returnUrl != String.Empty)
                                {
                                    Session["trustedID"] = null;
                                    IQueryable<UserProfile> _userProfiles = UoW.UserProfileRepo.GetAllIncluding(a => a.Account).Where(c => c.UserLoginID == _userLogin.UserLoginID && c.IsLogin == true);
                                    if (_userProfiles.Any())
                                    {
                                        HttpCookie _cookie = new HttpCookie(Common.UserProfileId_CookieName, CookieHandler.GetEncryptedValue(_userProfiles.FirstOrDefault().UserProfileID.ToString()));
                                        _cookie.Expires = DateTime.Now.AddDays(1);
                                        Response.Cookies.Add(_cookie);
                                        return Redirect(returnUrl);
                                    }
                                    else
                                    {
                                        @TempData[Common.UserLogin_TempDataKey] = "You don't have active associated organizations.";
                                        return RedirectToAction("SignIn", "Home");
                                    }
                                }
                                else
                                {
                                    Session["trustedID"] = null;
                                    return RedirectToAction("UserDirectionScreen", "Home");
                                }

                            }
                            else
                            {
                                Log.Warn(string.Format("{0} -verification failed , verification code is not matched", _userLogin.UserEmailID));
                                ModelState.AddModelError("", "Verification failed , verification code is not matched !");
                                return View(model);
                            }

                        }
                        else
                        {

                            Log.Warn(string.Format("{0} -verification failed , session expired afte 30 minutes", _userLogin.UserEmailID));
                            Session["trustedID"] = null;
                            ModelState.AddModelError("", "Verification Code is expired !");
                            return View(model);
                        }
                    }
                    else
                    {
                        Log.Warn(string.Format("{0} -TrustedID is null ", _userLogin.UserEmailID));
                        Session["trustedID"] = null;
                        @TempData[Common.Verification_TempDataKey] = string.Format("{0}, Please contact Administrator ", _userLogin.UserEmailID);
                        return View(model);
                    }
                }
                catch (Exception ex)
                {
                    Log.Error(string.Format("{0} verification can not processed -line 234 - exception {1}", User.Identity.Name, ex.Message));
                    UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Home/Verification - line 234", "", "");
                    UoW.SaveChanges();
                }
            }
            else
            {
                Log.Warn(string.Format("{0} -verification failed , verification code is required", User.Identity.Name));
                ModelState.AddModelError("", "Verification failed , verification code is required !");
                return View(model);
            }
            return RedirectToAction("InternalServerError_500", "Error");
        }


        [Authorize]
        public ActionResult UserDirectionScreen()
        {
            ViewBag.UserProfileFound = false;

            HFundUnitOfWork UoW = new HFundUnitOfWork();
            UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(User.Identity.Name);

            IQueryable<UserProfile> _userProfiles = UoW.UserProfileRepo.GetAllIncluding(a => a.Account).Where(c => c.UserLoginID == _userLogin.UserLoginID && c.IsLogin == true);

            if (_userProfiles.Count() > 0)
            {
                ViewBag.UserProfileFound = true;

                // check if user associated with organization 

                if (_userProfiles.Count() == 1)
                {
                    UserProfile _userProfile = _userProfiles.FirstOrDefault();

                    // Response.Cookies[Common.UserProfileId_CookieName].Value = _userProfile.UserProfileID.ToString();
                    HttpCookie _cookie = new HttpCookie(Common.UserProfileId_CookieName, CookieHandler.GetEncryptedValue(_userProfiles.FirstOrDefault().UserProfileID.ToString()));
                    _cookie.Expires = DateTime.Now.AddDays(1);
                    Response.Cookies.Add(_cookie);

                    CreateAccessLog(_userProfile.UserProfileID, _userLogin.UserEmailID);

                    if (_userProfile.Organization == null)
                    {
                        return RedirectToAction("Index", "TclhinHome");
                    }
                    else
                    {
                        return RedirectToAction("Index", "HspHome");
                    }
                }
                else
                {
                    // more than one associated organization with isLogin Active .
                    // it will be select screen .
                }

            }
            else
            {
                @TempData[Common.UserLogin_TempDataKey] = "You don't have active associated organizations.";
                return RedirectToAction("SignIn", "Home");
            }



            return View(_userProfiles);
        }



        [Authorize]
        [HttpPost]
        public ActionResult UserDirectionScreen(FormCollection formCollection)
        {

            ViewBag.UserProfileFound = false;

            HFundUnitOfWork UoW = new HFundUnitOfWork();

            UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(User.Identity.Name);

            IQueryable<UserProfile> _userProfiles = UoW.UserProfileRepo.GetAllIncluding(a => a.Account).Where(c => c.UserLoginID == _userLogin.UserLoginID && c.IsLogin == true);

            if (_userProfiles != null)
            {
                ViewBag.UserProfileFound = true;
            }

            string _userProfileIdStr = formCollection["UserProfileId"];

            int _userProfileId = Convert.ToInt32(_userProfileIdStr);

            UserProfile _userProfile = UoW.UserProfileRepo.GetUserProfileById(_userProfileId);


            HttpCookie _cookie = new HttpCookie(Common.UserProfileId_CookieName, CookieHandler.GetEncryptedValue(_userProfile.UserProfileID.ToString()));
            _cookie.Expires = DateTime.Now.AddDays(1);
            Response.Cookies.Add(_cookie);

            // create access Log
            CreateAccessLog(_userProfile.UserProfileID, _userLogin.UserEmailID);


            if (_userProfile.Organization == null)
            {
                return RedirectToAction("Index", "TclhinHome");
            }
            else
            {
                return RedirectToAction("Index", "HspHome");
            }

            return View(_userProfiles);
        }






        [Authorize]
        public ActionResult SignOut()
        {

            HFundUnitOfWork UoW = new HFundUnitOfWork();

            //UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(User.Identity.Name);
            //if (_userLogin != null)
            //{
            //    SystemAccessLog _log = new SystemAccessLog();
            //    _log.UserProfileID = _userLogin.UserLoginID;
            //    _log.ObjectActionID = SystemValues.SystemLogoutAction;
            //    _log.IPAddress = Request.UserHostAddress;
            //    _log.Geolocation = string.Empty;
            //    _log.UserAgent = Request.UserAgent;
            //    _log.BrowserPlatform = Request.Browser.Platform;
            //    _log.BrowserVersion = Request.Browser.Version;
            //    _log.BrowserScriptVersion = Request.Browser.EcmaScriptVersion.ToString();
            //    if (Request.Browser.IsMobileDevice)
            //    {
            //        _log.MobileDevice = Request.UserAgent.ToLower();
            //    }
            //    _log.IsActionSucess = true;
            //    _log.CreatedBy = _userLogin.UserLoginID.ToString();
            //    _log.CreatedDate = DateTime.Now;
            //    _log.UpdatedBy = _userLogin.UserLoginID.ToString();
            //    _log.UpdatedDate = DateTime.Now;

            //    UoW.SystemAccessLogRepo.InsertNewSystemAccessLog(_log);
            //    UoW.SaveChanges();

            //}

            string amacaddress = "";
            IPHostEntry ipHostInfo = Dns.GetHostEntry(Dns.GetHostName());
            string IpAddress = Convert.ToString(ipHostInfo.AddressList.FirstOrDefault(address => address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork));
            UserProfile _userProfile = UoW.UserProfileRepo.GetAllUserProfile().Where(c => c.UserEmailID.Trim().ToLower() == User.Identity.Name.Trim().ToLower()).FirstOrDefault();
            NetworkInterface[] anics = NetworkInterface.GetAllNetworkInterfaces();
            foreach (NetworkInterface adapter in anics)
            {
                if (amacaddress == String.Empty)
                {
                    IPInterfaceProperties ipInterfaceProperties = adapter.GetIPProperties();
                    amacaddress = adapter.GetPhysicalAddress().ToString();

                }
            }
            if (_userProfile != null)
            {
                SystemAccessLog _log = new SystemAccessLog();
                _log.UserProfileID = _userProfile.UserProfileID;
                _log.ObjectActionID = SystemValues.SystemLogoutAction;
                _log.IPAddress = Request.UserHostAddress;
                _log.Geolocation = string.Empty;
                _log.UserAgent = Request.UserAgent;
                _log.BrowserPlatform = Request.Browser.Platform;
                _log.BrowserVersion = Request.Browser.Version;
                _log.BrowserScriptVersion = Request.Browser.EcmaScriptVersion.ToString();
                if (Request.Browser.IsMobileDevice)
                {
                    _log.MobileDevice = Request.UserAgent.ToLower();
                }
                _log.IsActionSucess = true;
                _log.CreatedBy = _userProfile.UserProfileID.ToString();
                _log.CreatedDate = DateTime.Now;
                _log.UpdatedBy = _userProfile.UserProfileID.ToString();
                _log.UpdatedDate = DateTime.Now;

                UoW.SystemAccessLogRepo.InsertNewSystemAccessLog(_log);
                UoW.SaveChanges();

            }

            HttpContext.Response.Cookies.Remove(Common.UserProfileId_CookieName);
            HttpContext.Request.Cookies.Remove(Common.UserProfileId_CookieName);
            FormsAuthentication.SignOut();
            return RedirectToAction("SignIn", "Home");
        }



        public ActionResult ForgetPassword()
        {

            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ForgetPassword(ForgetPasswordModel model)
        {
            ViewBag.Message = String.Empty;

            try
            {
                HFundUnitOfWork UoW = new HFundUnitOfWork();

                if (ModelState.IsValid)
                {
                    // find user by email 
                    UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(model.LoginEmail);

                    if (_userLogin == null)
                    {
                        ModelState.AddModelError("", "The Email address does not exist.");
                        return View(model);
                    }

                    string _userFullName = _userLogin.UserFirstName + "  " + _userLogin.UserLastName;
                    int _userLoginId = _userLogin.UserLoginID;
                    UserPassword _userPassword = UoW.UserPasswordRepo.GetAllUserPassword().Where(p => p.UserLoginID == _userLoginId).FirstOrDefault();
                    _userPassword.VerificationToken = Guid.NewGuid().ToString();
                    UoW.SaveChanges();

                    // string _schema = Request.Url.Scheme;
                    // string _Domain = "http://" + Request.Url.Host;
                    // string _Domain = SystemValues.DomainURL;

                    string _schema = Request.Url.Scheme;  // http || https
                    string _Domain = _schema + "://" + Request.Url.Host;

                    string _UrlPath = _Domain + "/Home/ValidatePasswordToken?Email=" + _userLogin.UserEmailID + "&UID=" + _userPassword.VerificationToken;
                    NotificationManager NM = new NotificationManager();

                
                    bool _IsSent = NM.SendEmailNotificationForForgettingPassword(SystemValues.ForgetPasswordNotification, _userLogin.UserEmailID, _userFullName, _UrlPath);
                    if (_IsSent == true)
                    {
                        ViewBag.Message = "Email Sent";

                    }
                    else
                    {
                        ViewBag.Message = "Sent Email with issue .";
                    }


                }

            }
            catch (Exception ex)
            {
                ViewBag.Message = string.Empty;
                ModelState.AddModelError("", ex.Message.ToString());
                return View(model);
            }

            return View(model);
        }


        public ActionResult ValidatePasswordToken(string Email, string UID)
        {
            ViewBag.Email = Email;
            ViewBag.UID = UID;
            ViewBag.Message = string.Empty;

            try
            {
                HFundUnitOfWork UoW = new HFundUnitOfWork();

                UserLogin _userLogin = UoW.UserLoginRepo.GetUserLoginByLoginEmail(Email.Trim());
                UserPassword _userPassword = UoW.UserPasswordRepo.GetAllUserPassword().Where(p => p.UserLoginID == _userLogin.UserLoginID && p.VerificationToken.Trim() == UID.Trim()).FirstOrDefault();
                if (_userLogin != null && _userPassword != null)
                {
                    Session["User_LoginID"] = _userLogin.UserLoginID;
                    Session["User_EmailID"] = _userLogin.UserEmailID;
                    Session["User_Token"] = UID;
                    return RedirectToAction("ResetPassword", "Home");
                }
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message.ToString();
            }


            return View();
        }



        public ActionResult ResetPassword()
        {
            ViewBag.Message = string.Empty;
            ViewBag.Success = 0;

            if (Session["User_LoginID"] == null || Session["User_EmailID"] == null || Session["User_Token"] == null)
            {
                return View("SignIn");
            }
            else
            {
                ViewBag.Email = (string)Session["User_EmailID"];
                ViewBag.UID = (string)Session["User_Token"];
            }

            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ResetPassword(ResetPasswordModel model)
        {
            ViewBag.Success = 0;
            ViewBag.Message = string.Empty;
            try
            {
                HFundUnitOfWork UoW = new HFundUnitOfWork();

                if (ModelState.IsValid)
                {
                    int _userLoginID = (int)Session["User_LoginID"];
                    Guid _Salt = Guid.NewGuid();
                    string _SaltStr = _Salt.ToString();
                    string _PwdHashed = PasswordHelper.CreatedHashedPassword(model.NewPassword, _SaltStr);
                    UserPassword _UPwd = UoW.UserPasswordRepo.GetAllUserPassword().Where(p => p.UserLoginID == _userLoginID).FirstOrDefault();

                    if (_UPwd != null)
                    {
                        _UPwd.PasswordHashed = _PwdHashed;
                        _UPwd.PasswordSalted = _SaltStr;
                        // regenerate verification token
                        _UPwd.VerificationToken = null;

                        _UPwd.UpdatedBy = _userLoginID.ToString();
                        _UPwd.UpdatedDate = DateTime.Now;
                        UoW.UserPasswordRepo.UpdateUserPassword(_UPwd);
                        UoW.SaveChanges();

                        ViewBag.Message = "Password changed successfully.";
                        ViewBag.Success = 1;

                        // re dump session variables
                        Session["User_LoginID"] = null;
                        Session["User_EmailID"] = null;
                        Session["User_Token"] = null;
                    }

                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
            }


            return View(model);
        }



        private void CreateAccessLog(int userProfileId, string userName)
        {
            HFundUnitOfWork UoW = new HFundUnitOfWork();

            // System access log
            SystemAccessLog _log = new SystemAccessLog();
            if (userProfileId == 0)
            {
                _log.UserProfileID = null;
            }
            else
            {
                _log.UserProfileID = userProfileId;
            }
            _log.UserProfileID = userProfileId;
            _log.ObjectActionID = SystemValues.SystemLoginAction;
            _log.IPAddress = Request.UserHostAddress;
            _log.Geolocation = string.Empty;
            _log.UserAgent = Request.UserAgent;
            _log.BrowserPlatform = Request.Browser.Platform;
            _log.BrowserVersion = Request.Browser.Version;
            _log.BrowserScriptVersion = Request.Browser.EcmaScriptVersion.ToString();
            if (Request.Browser.IsMobileDevice)
            {
                _log.MobileDevice = Request.UserAgent.ToLower();
            }
            _log.IsActionSucess = true;
            _log.CreatedBy = userProfileId.ToString();
            _log.CreatedDate = DateTime.Now;
            _log.UpdatedBy = userProfileId.ToString();
            _log.UpdatedDate = DateTime.Now;
            _log.Note = userName;
            UoW.SystemAccessLogRepo.InsertNewSystemAccessLog(_log);
            UoW.SaveChanges();

        }

        //Added By MShahbaz for sending email for 2 factor authentication
        private bool SendVerificationEmail(UserLogin userLogin, int verificationCode, int trustedID)
        {
            bool _IsSendSuccessfully = false;
            HFundUnitOfWork UoW = new HFundUnitOfWork();
            TrustedUser _trusted = UoW.TrustedUserRepo.GetTrustedUserById(trustedID);
            _trusted.UpdatedBy = userLogin.UserLoginID.ToString();
            _trusted.UpdatedDate = DateTime.Now;
            try
            {
                string browserName = Request.UserAgent.Split('/')[Request.UserAgent.Split('/').Length - 2].ToString();
                string OS = Request.UserAgent.Split('/')[1].ToString().Substring(Request.UserAgent.Split('/')[1].ToString().IndexOf('(') + 1, (Request.UserAgent.Split('/')[1].ToString().IndexOf(';') - (Request.UserAgent.Split('/')[1].ToString().IndexOf('(') + 1)));
                if (userLogin != null && !String.IsNullOrEmpty(userLogin.UserEmailID))
                {

                    SmtpClient smtpClient = new SmtpClient { Host = ServerConfiguration.SMTP_Host, Port = ServerConfiguration.SMTP_Port, EnableSsl = ServerConfiguration.SMTP_EnableSSL, Credentials = new System.Net.NetworkCredential(ServerConfiguration.SMTP_UserName, ServerConfiguration.SMTP_Password) };
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.EnableSsl = true;

                    MailMessage mail = new MailMessage();
                    mail.From = new MailAddress(ServerConfiguration.SMTP_From);
                    mail.To.Add(new MailAddress(userLogin.UserProfiles.FirstOrDefault().UserEmailID));
                    mail.Subject = "Your Funding Plus authentication Request";
                    mail.Body = "Body";
                    mail.IsBodyHtml = true;

                    var html = new StringBuilder("<div>");
                    html.Append($"<br/>Hello <b>{userLogin.UserFirstName}</b>!");

                    html.Append("<br/><br/>To ensure your account's security, we need to verify your identity.");
                    html.Append("<br/>You recently logged in to Funding Plus from a browser: ");


                    html.Append($"<br/><br/> Browser: {GetBrowserName()}");
                    html.Append($"<br/> Operating system: {OS}");
                    html.Append($"<br/> UserName: {userLogin.UserEmailID}");


                    html.Append("<br/>Please enter the following code where promoted by FMT: ");
                    html.Append("<br/>");

                    html.Append($"<br/>  Verification code : <b> <u>  {verificationCode} </u></b>");
                    html.Append("<br/>");

                    html.Append("<br/>If you didn't recently log in to Salesforce, or you don't recognize");
                    html.Append("<br/>this browser or operating system, contact your FMT administrator! ");


                    html.Append("<br/><br/>Regards,");
                    html.Append("<br/><b>Funding Plus Management Team</b>");
                    html.Append("</div>");

                    mail.Body = html.ToString();

                    smtpClient.Send(mail);

                }
                else
                {
                    Log.Error(string.Format("FMT can not send an email - User Information is null !"));
                    _IsSendSuccessfully = false;
                }
                _IsSendSuccessfully = true;
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("FMT can not send an email to {0} | exception occured {1}", userLogin.UserProfiles.FirstOrDefault().UserEmailID, ex.Message));
                _trusted.IsEmailSent = false;
                UoW.TrustedUserRepo.UpdateTrustedUser(_trusted);
                UoW.SaveChanges();
                _IsSendSuccessfully = false;
            }
            Log.Info(string.Format("FMT sent an email to {0} for verifing the user with his/her verificationCode ! - trusted user Id is  : {1}", userLogin.UserProfiles.FirstOrDefault().UserEmailID, _trusted.TrustedUserID));
            _trusted.IsEmailSent = true;
            _trusted.EmailSentDate = DateTime.Now;
            UoW.TrustedUserRepo.UpdateTrustedUser(_trusted);
            UoW.SaveChanges();
            return _IsSendSuccessfully;

        }

        //Added By MShahbaz for tracking Trusted User in  2 factor authentication
        private int InsertUserTrustedInfo(int userLoginID, string verificationCode)
        {
            int result = 0;
            string browserName = Request.UserAgent.Split('/')[Request.UserAgent.Split('/').Length - 2].ToString();
            HFundUnitOfWork UoW = new HFundUnitOfWork();
            DateTime creationDate = DateTime.Now;
            // Trusted User
            TrustedUser trustedUser = new TrustedUser();

            try
            {
                trustedUser.UserProfileID = userLoginID;
                trustedUser.IPAddress = Request.UserHostAddress;
                trustedUser.UserAgent = Request.UserAgent;
                trustedUser.BrowserName = GetBrowserName();
                trustedUser.EmailSentDate = null;
                trustedUser.IsEmailSent = false;
                trustedUser.VerificationCode = verificationCode;
                trustedUser.IsActionSucess = false;
                trustedUser.CreatedBy = userLoginID.ToString();
                trustedUser.CreatedDate = creationDate;
                trustedUser.UpdatedBy = null;
                trustedUser.UpdatedDate = null;

                UoW.TrustedUserRepo.InsertNewTrustedUser(trustedUser);
                UoW.SaveChanges();


                result = UoW.TrustedUserRepo.GetTrustedUserID(userLoginID, Request.UserHostAddress, GetBrowserName(), creationDate);
            }
            catch (Exception ex)
            {
                Log.Error(string.Format("FMT can not Insert trusted user record for {0} | exception occured {1}", userLoginID, ex.Message));
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "Home/InsertUserTrustedInfo ", "", "");
                UoW.SaveChanges();
            }


            return result;
        }
        private string GetBrowserName()
        {

            string browser = Request.Browser.Browser.ToString();
            string browserName = Request.UserAgent.Split('/')[Request.UserAgent.Split('/').Length - 2].ToString();
            if (browserName.ToLower().Contains("edg"))
            {
                browser = "Edge";
            }
            return browser;
        }
    }

}