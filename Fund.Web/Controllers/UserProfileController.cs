using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.Utility;
using HFund.Web.Models;



namespace HFund.Web.Controllers
{

    [Authorize(Roles = Common.LHINBaseRole)]
    public class UserProfileController : BaseController
    {
        // GET: UserProfile
        public ActionResult Index()
        {
            int _UserProfileID = GetCurrentUser().UserProfileID;
            // UserProfileVM model = GetUserProfileById(_UserProfileID);
            UserProfileVM model = UoW.UserProfileRepo.GetUserProfileVM_ByUserProfileId(_UserProfileID);

            return View(model);
        }


        public ActionResult Edit()
        {
            int _UserProfileID = GetCurrentUser().UserProfileID;
           // UserProfileVM model = GetUserProfileById(_UserProfileID);
            UserProfileVM model = UoW.UserProfileRepo.GetUserProfileVM_ByUserProfileId(_UserProfileID);

            ViewBag.Message = string.Empty;
            ViewBag.Salutation = new SelectList(Common.SalutationPreference(), "Key", "Value", model.Salutation);

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(UserProfileVM model)
        {
            int _currentUserProfileId = GetCurrentUser().UserProfileID;

            ViewBag.Salutation = new SelectList(Common.SalutationPreference(), "Key", "Value", model.Salutation);
            ViewBag.Message = string.Empty;

            try
            {

                if (ModelState.IsValid)
                {

                    if (string.IsNullOrEmpty(model.UserEmailID) == true || string.IsNullOrWhiteSpace(model.UserEmailID) == true)
                    {
                        ModelState.AddModelError("UserEmailID", "Email addres is required .");
                        return View(model);
                    }

                    // check is EmailID Already Exist
                    if (UoW.UserLoginRepo.CheckEmailIfUnique(model.UserEmailID, true, (int)model.UserLoginID) == false)
                    {
                        ModelState.AddModelError("UserEmailID", "Email address already existed ..");
                        return View(model);
                    }

                    string _Message = string.Empty;
                    bool _updateUserProfileStatus = UoW.UserProfileRepo.UpdateUserProfileVM(model, _currentUserProfileId, ref _Message);
                    if (_updateUserProfileStatus == true)
                    {
                        ViewBag.Message = "Save user profile info successfully .";
                    }
                    else
                    {
                        ModelState.AddModelError("", _Message);
                    }
                   
                }


            }
            catch(Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "UserProfile/Edit");
                UoW.SaveChanges();
            }


            return View(model);
        }



        public ActionResult ChangePassword()
        {
          
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ChangePassword(ChangePasswordModel model)
        {
            ViewBag.Message = string.Empty;
            UserProfile _currentUserProfile = GetCurrentUser();
            int _userProfileId = _currentUserProfile.UserProfileID;
            int _userLoginId = (int)_currentUserProfile.UserLoginID;

            try
            {
                if (ModelState.IsValid)
                {
                    string _OutMessage = string.Empty;
                    bool _ValidOldPassword = UoW.UserLoginRepo.ValidateUserPassword(_userLoginId, model.OldPassword, ref _OutMessage);
                    if (_ValidOldPassword == false)
                    {
                        ModelState.AddModelError("", "Current Password does not match .");
                        return View(model);
                    }

                    Guid _salt = Guid.NewGuid();
                    string _saltStr = _salt.ToString();
                    string _pwdHashed = PasswordHelper.CreatedHashedPassword(model.NewPassword, _saltStr);
                    UserPassword _userPassword = UoW.UserPasswordRepo.GetAllUserPassword().Where(p => p.UserLoginID == _userLoginId).FirstOrDefault();

                    if (_userPassword != null)
                    {
                        _userPassword.PasswordHashed = _pwdHashed;
                        _userPassword.PasswordSalted = _saltStr;
                        _userPassword.UpdatedBy = _userProfileId.ToString();
                        _userPassword.UpdatedDate = DateTime.Now;
                        UoW.UserPasswordRepo.UpdateUserPassword(_userPassword);
                        UoW.SaveChanges();
                        ViewBag.Message = "Password changed successfully.";
                    }

                }
            }
            catch(Exception ex)
            {
                ViewBag.Message = string.Empty;
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "UserProfile/ChangePassword");
                UoW.SaveChanges();

            }
         
       

            return View(model);
        }











        








    }




}