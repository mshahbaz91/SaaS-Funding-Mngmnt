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

    [RoutePrefix("api/AccountProgramOpenBalanceApi")]
    [Authorize(Roles = Common.LHINBaseRole)]
    public class AccountProgramOpenBalanceApiController : BaseApiController
    {

        #region AccountProgramOpenBalance - Hospital
        [HttpPost]
        [Route("Hospital_InsertItem")]
        public HttpResponseMessage Hospital_InsertItem(AccountProgramOpenBalance_VM addItem)
        {
            // need paramters 
            // HspId == AccountId, FiscalYear, FundingProgramSubCategoryID, Volume


            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (addItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to save ..." });
                }

                bool _isRecordExisted = Common_CheckIfRecordExisted(addItem.AccountID, addItem.FiscalYear, addItem.FundingProgramSubCategoryID);
                if (_isRecordExisted == true)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Sub category already existed ." });
                }


                decimal? _beginVolumeAmount = null;
                if (!string.IsNullOrEmpty(addItem.BeginVolumeText) || !string.IsNullOrWhiteSpace(addItem.BeginVolumeText))
                {
                    string _beginVolumeAmountText = Common.RemoveDollarSign(addItem.BeginVolumeText);
                    decimal _beginVolumeAmt;
                    if (Decimal.TryParse(_beginVolumeAmountText, out _beginVolumeAmt))
                    {
                        _beginVolumeAmount = _beginVolumeAmt;
                    }
                }

                if (_beginVolumeAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Beginning Volume over max ..." });
                }

                AccountProgramOpenBalance newItem = new AccountProgramOpenBalance(); ;

                newItem.AccountID = addItem.AccountID;
                newItem.FiscalYear = addItem.FiscalYear;
                newItem.FundingProgramSubCategoryID = addItem.FundingProgramSubCategoryID;
                newItem.BeginningVolume = _beginVolumeAmount;

                newItem.CreatedDate = DateTime.Now;
                newItem.CreatedBy = _currentUserId;
                newItem.UpdatedDate = DateTime.Now;
                newItem.UpdatedBy = _currentUserId;

                UoW.AccountProgramOpenBalanceRepo.InsertNewAccountProgramOpenBalance(newItem);
                UoW.SaveChanges();
            }

            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountProgramOpenBalanceApi/Hospital_InsertItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Hospital_UpdateItem")]
        public HttpResponseMessage Hospital_UpdateItem(AccountProgramOpenBalance_VM updateItem)
        {
            // need paramters 
            // AccountProgramOpenBalanceId
            // BeginVolumeText

            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (updateItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to save ..." });
                }



                decimal? _beginVolumeAmount = null;
                if (!string.IsNullOrEmpty(updateItem.BeginVolumeText) || !string.IsNullOrWhiteSpace(updateItem.BeginVolumeText))
                {
                    string _beginVolumeAmountText = Common.RemoveDollarSign(updateItem.BeginVolumeText);
                    decimal _beginVolumeAmt;
                    if (Decimal.TryParse(_beginVolumeAmountText, out _beginVolumeAmt))
                    {
                        _beginVolumeAmount = _beginVolumeAmt;
                    }
                }

                if (_beginVolumeAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Beginning Volume over max ..." });
                }

                AccountProgramOpenBalance savedItem = UoW.AccountProgramOpenBalanceRepo.GetAccountProgramOpenBalanceById(updateItem.AccountProgramOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                    savedItem.BeginningVolume = _beginVolumeAmount;
                    savedItem.UpdatedDate = DateTime.Now;
                    savedItem.UpdatedBy = _currentUserId;

                    UoW.AccountProgramOpenBalanceRepo.UpdateAccountProgramOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountProgramOpenBalanceApi/Hospital_UpdateItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Hospital_DeleteItem")]
        public HttpResponseMessage Hospital_DeleteItem(AccountProgramOpenBalance_VM deleteItem)
        {
            // need paramters 
            // AccountProgramOpenBalanceId

            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (deleteItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to delete ..." });
                }

                AccountProgramOpenBalance savedItem = UoW.AccountProgramOpenBalanceRepo.GetAccountProgramOpenBalanceById(deleteItem.AccountProgramOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {

                    UoW.AccountProgramOpenBalanceRepo.DeleteAccountProgramOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountProgramOpenBalanceApi/Hospital_DeleteItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }

        #endregion


        #region AccountProgramOpenBalance - LongTermCare
        [HttpPost]
        [Route("LongTermCare_InsertItem")]
        public HttpResponseMessage LongTermCare_InsertItem(AccountProgramOpenBalance_VM addItem)
        {
            // need paramters 
            // HspId == AccountId, FiscalYear, FundingProgramSubCategoryID, Volume, expirydate (is optional)



            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (addItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to save ..." });
                }

                bool _isRecordExisted = Common_CheckIfRecordExisted(addItem.AccountID, addItem.FiscalYear, addItem.FundingProgramSubCategoryID);
                if (_isRecordExisted == true)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Sub category already existed ." });
                }


                decimal? _beginVolumeAmount = null;
                if (!string.IsNullOrEmpty(addItem.BeginVolumeText) || !string.IsNullOrWhiteSpace(addItem.BeginVolumeText))
                {
                    string _beginVolumeAmountText = Common.RemoveDollarSign(addItem.BeginVolumeText);
                    decimal _beginVolumeAmt;
                    if (Decimal.TryParse(_beginVolumeAmountText, out _beginVolumeAmt))
                    {
                        _beginVolumeAmount = _beginVolumeAmt;
                    }
                }

                if (_beginVolumeAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Beginning Volume over max ..." });
                }

                AccountProgramOpenBalance newItem = new AccountProgramOpenBalance(); ;

                newItem.AccountID = addItem.AccountID;
                newItem.FiscalYear = addItem.FiscalYear;
                newItem.FundingProgramSubCategoryID = addItem.FundingProgramSubCategoryID;
                newItem.BeginningVolume = _beginVolumeAmount;

                newItem.ExpiryDate = addItem.ExpiryDate;

                newItem.CreatedDate = DateTime.Now;
                newItem.CreatedBy = _currentUserId;
                newItem.UpdatedDate = DateTime.Now;
                newItem.UpdatedBy = _currentUserId;

                UoW.AccountProgramOpenBalanceRepo.InsertNewAccountProgramOpenBalance(newItem);
                UoW.SaveChanges();
            }

            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountProgramOpenBalanceApi/LongTermCare_InsertItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("LongTermCare_UpdateItem")]
        public HttpResponseMessage LongTermCare_UpdateItem(AccountProgramOpenBalance_VM updateItem)
        {
            // need paramters 
            // AccountProgramOpenBalanceId
            // BeginVolumeText
            // ExpiryDate

            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (updateItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to save ..." });
                }



                decimal? _beginVolumeAmount = null;
                if (!string.IsNullOrEmpty(updateItem.BeginVolumeText) || !string.IsNullOrWhiteSpace(updateItem.BeginVolumeText))
                {
                    string _beginVolumeAmountText = Common.RemoveDollarSign(updateItem.BeginVolumeText);
                    decimal _beginVolumeAmt;
                    if (Decimal.TryParse(_beginVolumeAmountText, out _beginVolumeAmt))
                    {
                        _beginVolumeAmount = _beginVolumeAmt;
                    }
                }

                if (_beginVolumeAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Beginning Volume over max ..." });
                }

                AccountProgramOpenBalance savedItem = UoW.AccountProgramOpenBalanceRepo.GetAccountProgramOpenBalanceById(updateItem.AccountProgramOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                    savedItem.BeginningVolume = _beginVolumeAmount;

                    savedItem.ExpiryDate = updateItem.ExpiryDate;


                    savedItem.UpdatedDate = DateTime.Now;
                    savedItem.UpdatedBy = _currentUserId;

                    UoW.AccountProgramOpenBalanceRepo.UpdateAccountProgramOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountProgramOpenBalanceApi/LongTermCare_UpdateItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("LongTermCare_DeleteItem")]
        public HttpResponseMessage LongTermCare_DeleteItem(AccountProgramOpenBalance_VM deleteItem)
        {
            // need paramters 
            // AccountProgramOpenBalanceId

            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (deleteItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to delete ..." });
                }

                AccountProgramOpenBalance savedItem = UoW.AccountProgramOpenBalanceRepo.GetAccountProgramOpenBalanceById(deleteItem.AccountProgramOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {

                    UoW.AccountProgramOpenBalanceRepo.DeleteAccountProgramOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountProgramOpenBalanceApi/LongTermCare_DeleteItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }




        #endregion




        public bool Common_CheckIfRecordExisted(int accountId, int fiscalYear, int fundingProgramSubCategoryId)
        {
            bool _isRecordExisted = false;

            int _itemCounter = (from item in UoW.DBContext.AccountProgramOpenBalances
                                where item.AccountID == accountId && item.FiscalYear == fiscalYear &&
                                      item.FundingProgramSubCategoryID == fundingProgramSubCategoryId
                                select item).Count();

            _isRecordExisted = (_itemCounter > 0) ? true : false;

            return _isRecordExisted;
        }







    }


}
