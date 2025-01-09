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
    
    [RoutePrefix("api/AccountActivitiesOpenBalanceApi")]
    [Authorize(Roles = Common.LHINBaseRole)]
    public class AccountActivitiesOpenBalanceApiController : BaseApiController
    {

        #region AccountActivitiesOpenBalance - Community

        [HttpPost]
        [Route("Community_InsertItem")]
        public HttpResponseMessage Community_InsertItem(AccountActivitiesOpenBalance_VM addItem)
        {
            // need paramters 
            // HspId == AccountId, FiscalYear, FunctionalCenterID, UnitOfMeasureID Volume


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

                bool _isRecordExisted = Common_CheckIfRecordExisted(addItem.AccountID, addItem.FiscalYear, addItem.FunctionalCenterID, addItem.UnitOfMeasureID);
                if (_isRecordExisted == true)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record with same type already existed ." });
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

                if ( _beginVolumeAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Beginning Volume over max ..." });
                }

                AccountActivitiesOpenBalance newItem = new AccountActivitiesOpenBalance(); ;

                newItem.AccountID = addItem.AccountID;
                newItem.FiscalYear = addItem.FiscalYear;
                newItem.FunctionalCenterID = addItem.FunctionalCenterID;
                newItem.UnitofMeasureID = addItem.UnitOfMeasureID;
                newItem.BeginningVolume = _beginVolumeAmount;

                newItem.CreatedDate = DateTime.Now;
                newItem.CreatedBy = _currentUserId;
                newItem.UpdatedDate = DateTime.Now;
                newItem.UpdatedBy = _currentUserId;

                UoW.AccountActivitiesOpenBalanceRepo.InsertNewAccountActivitiesOpenBalance(newItem);
                UoW.SaveChanges();
            }

            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountActivitiesOpenBalanceApi/Community_InsertItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Community_UpdateItem")]
        public HttpResponseMessage Community_UpdateItem(AccountActivitiesOpenBalance_VM updateItem)
        {
            // need paramters 
            // AccountActivitiesOpenBalanceId
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

                AccountActivitiesOpenBalance savedItem = UoW.AccountActivitiesOpenBalanceRepo.GetAccountActivitiesOpenBalanceById(updateItem.AccountActivitiesOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                    savedItem.BeginningVolume = _beginVolumeAmount;
                    savedItem.UpdatedDate = DateTime.Now;
                    savedItem.UpdatedBy = _currentUserId;

                    UoW.AccountActivitiesOpenBalanceRepo.UpdateAccountActivitiesOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountActivitiesOpenBalanceApi/Community_UpdateItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Community_DeleteItem")]
        public HttpResponseMessage Community_DeleteItem(AccountActivitiesOpenBalance_VM deleteItem)
        {
            // need paramters 
            // AccountActivitiesOpenBalanceId

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

                AccountActivitiesOpenBalance savedItem = UoW.AccountActivitiesOpenBalanceRepo.GetAccountActivitiesOpenBalanceById(deleteItem.AccountActivitiesOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {

                    UoW.AccountActivitiesOpenBalanceRepo.DeleteAccountActivitiesOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountActivitiesOpenBalanceApi/Community_DeleteItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }



        #endregion


        public bool Common_CheckIfRecordExisted(int accountId, int fiscalYear, int functionalCenterId, int unitOfMeasureId)
        {
            bool _isRecordExisted = false;

            int _itemCounter = (from item in UoW.DBContext.AccountActivitiesOpenBalances
                                where item.AccountID == accountId && 
                                      item.FiscalYear == fiscalYear &&
                                      item.FunctionalCenterID == functionalCenterId &&
                                      item.UnitofMeasureID == unitOfMeasureId
                                select item).Count();

            _isRecordExisted = (_itemCounter > 0) ? true : false;

            return _isRecordExisted;
        }


    }


}
