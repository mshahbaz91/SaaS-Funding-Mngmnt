using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using HFund.Data.ViewModels;
using HFund.Data.Models;
using HFund.Utility;
using HFund.Repository;
using System.Web.Security;
using HFund.Web.ApplicationServices;
using HFund.Web.Filters;

namespace HFund.Web.Controllers
{


    [CustomAuth(ControllerName = "AdminHome", ActionName = "Enable")]
    public class Admin_UserProfileController : BaseController
    {
        // GET: Admin_UserProfile
        public ActionResult Index()
        {
            return View();
        }



        public ActionResult Search()
        {


            return View();
        }




        public ActionResult Create()
        {
            UserProfileVM model = new UserProfileVM();
            model.UserEmailID = null;
            model.UserPassword = Common.RandomPasswordString();
            model.UserLoginActive = true;
            model.ActiveInd = true;
            model.IsLogin = true;
            ViewBag.Salutation = new SelectList(Common.SalutationPreference(), "Key", "Value");
            ViewBag.ManagerId = UoW.UserProfileRepo.GetAllLHINUser_ddl();

            // ViewBag.Organization = UoW.AccountRepo.GetAccount_ByTerritory_ddl();
            List<Role> _LHINRoleList = UoW.RoleRepo.GetLHINRole().Where(c => c.ActiveInd == true && c.RoleGroupID == null).ToList();
            ViewBag.LHINRoleList = _LHINRoleList;

            int[] _SelectedUserRoles = { };
            ViewBag.SelectedUserRoles = _SelectedUserRoles;

            return View(model);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(UserProfileVM model, int[] LHINUserRoleIdList)
        {
            ViewBag.Salutation = new SelectList(Common.SalutationPreference(), "Key", "Value", model.Salutation);
            List<Role> _LHINRoleList = UoW.RoleRepo.GetLHINRole().Where(c => c.ActiveInd == true && c.RoleGroupID == null).ToList();
            ViewBag.LHINRoleList = _LHINRoleList;
            ViewBag.ManagerId = UoW.UserProfileRepo.SetALLLHINUser_ddl(model.ManagerId);

            int[] _SelectedUserRoles = { };
            ViewBag.SelectedUserRoles = _SelectedUserRoles;
            if (LHINUserRoleIdList != null && LHINUserRoleIdList.Length > 0)
            {
                ViewBag.SelectedUserRoles = LHINUserRoleIdList;
            }


            // create new User 
            int _currentUserProfileId = GetCurrentUser().UserProfileID;
            try
            {
                if (ModelState.IsValid)
                {

                    if (model.IsLogin == true)
                    {
                        if (string.IsNullOrEmpty(model.UserEmailID) == true || string.IsNullOrWhiteSpace(model.UserEmailID) == true)
                        {
                            ModelState.AddModelError("UserEmailID", "Email addres is required .");
                            return View(model);
                        }

                        // check is EmailID Already Exist
                        if (UoW.UserLoginRepo.CheckEmailIfUnique(model.UserEmailID, false) == false)
                        {
                            ModelState.AddModelError("UserEmailID", "Email address already existed .");
                            return View(model);
                        }

                        if (string.IsNullOrEmpty(model.UserPassword))
                        {
                            ModelState.AddModelError("UserPassword", "Password is required .");
                            return View(model);
                        }

                        if (model.UserPassword.Length < 6)
                        {
                            ModelState.AddModelError("UserPassword", "Password min 6 characters .");
                            return View(model);
                        }

                    }
                    else
                    {

                        // clean up login Info
                        model.UserEmailID = string.Empty;
                        model.UserPassword = string.Empty;
                        model.UserLoginActive = false;
                    }


                    string _Message = string.Empty;

                    int _userProfileId = UoW.UserProfileRepo.AddNewUser(model, _currentUserProfileId, ref _Message);

                    if (_userProfileId > 0)
                    {
                        // ViewBag.Message = Common.CREATE_SUCCESSMESSAGE;
                        if (_userProfileId > 0)
                        {
                            AddUserRoles(_userProfileId, LHINUserRoleIdList);

                            // Send Email Notification
                            // SendNewUserEmailNotification(_UserProfileID, model.UserEmailID, model.UserPassword);
                            if (!string.IsNullOrEmpty(model.UserEmailID))
                            {
                                base.SendNewUserEmailNotification(_userProfileId, model.UserEmailID, model.UserPassword);
                            }

                            TempData["AdminUser"] = Common.User_CreateSuccessMessage;
                            return RedirectToAction("Edit", new { id = _userProfileId });
                        }
                    }
                    else
                    {
                        ModelState.AddModelError("", _Message);
                    }


                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Admin_UserProfile/Create");
                UoW.SaveChanges();
            }


            return View(model);
        }



        public ActionResult Edit(int id)
        {

            UserProfileVM model = UoW.UserProfileRepo.GetUserProfileVM_ByUserProfileId(id);

            ViewBag.Salutation = new SelectList(Common.SalutationPreference(), "Key", "Value", model.Salutation);

            List<Role> _LHINRoleList = UoW.RoleRepo.GetLHINRole().Where(c => c.ActiveInd == true && c.RoleGroupID == null).ToList();
            ViewBag.LHINRoleList = _LHINRoleList;

            int[] _SelectedUserRoles = { };
            ViewBag.SelectedUserRoles = _SelectedUserRoles;

            // must call GetuserSubordinate First to fiter out
            IEnumerable<Subordinate> soList = UoW.UserProfileRepo.GetUserSubordinate((int)model.UserProfileID);
            ViewBag.ManagerId = UoW.UserProfileRepo.SetUserManagers_dll(soList , model.ManagerId);


            List<UserRole> _UserRoleList = UoW.UserRoleRepo.GetAllUserRole().Where(c => c.UserProfileID == model.UserProfileID).ToList();
            List<int> _UserExistedRoleIdList = new List<int>();
            if (_UserRoleList != null)
            {
                foreach (var item in _UserRoleList)
                {
                    _UserExistedRoleIdList.Add(item.RoleID);
                }
            }
            if (_UserExistedRoleIdList != null)
            {
                ViewBag.SelectedUserRoles = _UserExistedRoleIdList.ToArray();
            }


            if (model == null)
            {
                throw new HttpException(404, "Not Found, Admin_UserProfile/Edit id = " + id);
            }

            return View(model);
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(UserProfileVM model, int[] LHINUserRoleIdList)
        {
            ViewBag.Salutation = new SelectList(Common.SalutationPreference(), "Key", "Value", model.Salutation);
            int _currentUserProfileId = GetCurrentUser().UserProfileID;

            List<Role> _LHINRoleList = UoW.RoleRepo.GetLHINRole().Where(c => c.ActiveInd == true && c.RoleGroupID == null).ToList();
            ViewBag.LHINRoleList = _LHINRoleList;

            IEnumerable<Subordinate> soList = UoW.UserProfileRepo.GetUserSubordinate((int)model.UserProfileID);
            ViewBag.ManagerId = UoW.UserProfileRepo.SetUserManagers_dll(soList, model.ManagerId);

            int[] _SelectedUserRoles = { };
            ViewBag.SelectedUserRoles = _SelectedUserRoles;


            try
            {

                if (LHINUserRoleIdList != null && LHINUserRoleIdList.Length > 0)
                {
                    ViewBag.SelectedUserRoles = LHINUserRoleIdList;
                }


                if (ModelState.IsValid)
                {

                   if (!string.IsNullOrEmpty(model.UserEmailID) )
                    {
                        // check is EmailID Already Exist
                        if (UoW.UserLoginRepo.CheckEmailIfUnique(model.UserEmailID, true, (int)model.UserLoginID) == false)
                        {
                            ModelState.AddModelError("UserEmailID", "Email address already existed ..");
                            return View(model);
                        }
                    }


                    string _Message = string.Empty;
                    bool _updateUserProfileStatus = UoW.UserProfileRepo.UpdateUserProfileVM(model, _currentUserProfileId, ref _Message);
                    if (_updateUserProfileStatus == true)
                    {
                        DeleteUserRoles((int)model.UserProfileID);
                        AddUserRoles((int)model.UserProfileID, LHINUserRoleIdList);
                        TempData["AdminUser"] = Common.User_UpdateSuccessMessage;
                    }
                    else
                    {
                        ModelState.AddModelError("", _Message);
                    }
                }

            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", ex.Message.ToString());
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, string.Empty, string.Empty, "Admin_UserProfile/Edit");
                UoW.SaveChanges();
            }



            return View(model);
        }



        // id == userProfileID
        public ActionResult EditUserRoles(int id)
        {
            UserProfile _UserProfile = UoW.UserProfileRepo.GetUserProfileById(id);
            if (_UserProfile != null)
            {
                ViewBag.UserFullName = _UserProfile.UserFullName;
                ViewBag.UserEmailID = _UserProfile.UserEmailID;
                ViewBag.UserProfileID = _UserProfile.UserProfileID;

            }
            List<UserRoleCustomVM> _UserRoleCustomList = new List<UserRoleCustomVM>();
            List<Role> _RoleList = UoW.RoleRepo.GetLHINRole().Where(c => c.ActiveInd == true && c.RoleGroupID == null).ToList();
            List<UserRole> _UserRoleList = UoW.UserRoleRepo.GetAllUserRole().Where(c => c.UserProfileID == _UserProfile.UserProfileID).ToList();
            foreach (var Item in _RoleList)
            {
                UserRoleCustomVM _UserRoleCustom = new UserRoleCustomVM();
                _UserRoleCustom.RoleID = Item.RoleID;
                _UserRoleCustom.RoleShortName = Item.RoleShortName;
                _UserRoleCustom.RoleDescription = Item.RoleDescription;
                _UserRoleCustom.UserProfileID = _UserProfile.UserProfileID;
                _UserRoleCustom.UserRoleActive = false;
                foreach (var roleItem in _UserRoleList)
                {
                    if (roleItem.RoleID == Item.RoleID)
                    {
                        _UserRoleCustom.UserRoleActive = true;
                    }
                }


                _UserRoleCustomList.Add(_UserRoleCustom);
            }

            ViewBag.UserRoleCustomList = _UserRoleCustomList;



            return View();
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditUserRoles(int UserProfileID, FormCollection fc)
        {
            string[] _CheckedRoles = fc.GetValues("RoleIDList");
            string _CurrentUserID = GetCurrentUser().UserID;

            // Delete all previous User Roles
            DeleteUserRoles(UserProfileID);

            // Re-Insert 
            foreach (string item in _CheckedRoles)
            {
                UserRole _URole = new UserRole();
                _URole.UserProfileID = UserProfileID;
                _URole.RoleID = Convert.ToInt32(item);
                _URole.ActiveInd = true;
                _URole.CreatedDate = DateTime.Now;
                _URole.CreatedBy = _CurrentUserID;
                _URole.UpdatedDate = DateTime.Now;
                _URole.UpdatedBy = _CurrentUserID;
                UoW.UserRoleRepo.InsertNewUserRole(_URole);
            }

            UoW.SaveChanges();
            TempData["AdminUserRoles"] = Common.UPDATE_SUCCESSMESSAGE;

            return RedirectToAction("EditUserRoles", new { id = UserProfileID });

        }

        private void AddUserRoles(int userProfileId, int[] roleIdList)
        {
            string _CurrentUserID = GetCurrentUser().UserID;

            if ( roleIdList != null)
            {
                foreach (int roleId in roleIdList)
                {
                    UserRole _URole = new UserRole();
                    _URole.UserProfileID = userProfileId;
                    _URole.RoleID = roleId;
                    _URole.ActiveInd = true;
                    _URole.CreatedDate = DateTime.Now;
                    _URole.CreatedBy = _CurrentUserID;
                    _URole.UpdatedDate = DateTime.Now;
                    _URole.UpdatedBy = _CurrentUserID;
                    UoW.UserRoleRepo.InsertNewUserRole(_URole);
                }
                UoW.SaveChanges();
            }
        }


        private void DeleteUserRoles(int userProfileId)
        {
            var _UserRoles = UoW.UserRoleRepo.GetAllUserRole().Where(c => c.UserProfileID == userProfileId);
            foreach (var item in _UserRoles)
            {
                UoW.UserRoleRepo.DeleteUserRole(item);
            }
            UoW.SaveChanges();
        }








    }



}