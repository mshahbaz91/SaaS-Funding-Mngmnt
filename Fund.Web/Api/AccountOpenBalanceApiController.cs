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
    [RoutePrefix("api/AccountOpenBalanceApi")]
    [Authorize(Roles = Common.LHINBaseRole)]
    public class AccountOpenBalanceApiController : BaseApiController
    {

        #region AccountOpenBalance - Hospital_RevenueLine
        [HttpPost]
        [Route("Hospital_RevenueLine_InsertItem")]
        public HttpResponseMessage Hospital_RevenueLine_InsertItem(AccountOpenBalance_VM addItem)
        {
            // need paramters 
            // HspId == AccountId, FiscalYear, RevenueLineId, SAASectorId, OpenBalance
           

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

                bool _isRecordExisted = Common_RevenueLine_CheckIfRecordExisted(addItem.AccountID, addItem.FiscalYear, addItem.SAASectorID, (int)addItem.RevenueLineID);
                if (_isRecordExisted == true)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0,    Message = "Revenue Line already Existed ." });
                }


                decimal? _openBalanceAmount = null;
                if (!string.IsNullOrEmpty(addItem.OpenBalanceText) || !string.IsNullOrWhiteSpace(addItem.OpenBalanceText))
                {
                    string _openBalanceAmountText = Common.RemoveDollarSign(addItem.OpenBalanceText);
                    decimal _openBalanceAmt;
                    if (Decimal.TryParse(_openBalanceAmountText, out _openBalanceAmt))
                    {
                        _openBalanceAmount = _openBalanceAmt;
                    }
                }

                if (_openBalanceAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Open Balance over max ..." });
                }

                AccountOpenBalance newItem = new AccountOpenBalance(); ;

                newItem.AccountID = addItem.AccountID;
                newItem.FiscalYear = addItem.FiscalYear;
                newItem.SAASectorID = addItem.SAASectorID;
                newItem.RevenueLineID = addItem.RevenueLineID;
                newItem.OpenBalance = _openBalanceAmount;
               
                newItem.CreatedDate = DateTime.Now;
                newItem.CreatedBy = _currentUserId;
                newItem.UpdatedDate = DateTime.Now;
                newItem.UpdatedBy = _currentUserId;

                UoW.AccountOpenBalanceRepo.InsertNewAccountOpenBalance(newItem);
                UoW.SaveChanges();
            }

            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/Hospital_RevenueLine_InsertItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1,  Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Hospital_RevenueLine_UpdateItem")]
        public HttpResponseMessage Hospital_RevenueLine_UpdateItem(AccountOpenBalance_VM updateItem)
        {
            // need paramters 
            // AccountOpenBalanceId
            // OpenBalanceText


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



                decimal? _openBalanceAmount = null;
                if (!string.IsNullOrEmpty(updateItem.OpenBalanceText) || !string.IsNullOrWhiteSpace(updateItem.OpenBalanceText))
                {
                    string _openBalanceAmountText = Common.RemoveDollarSign(updateItem.OpenBalanceText);
                    decimal _openBalanceAmt;
                    if (Decimal.TryParse(_openBalanceAmountText, out _openBalanceAmt))
                    {
                        _openBalanceAmount = _openBalanceAmt;
                    }
                }

                if (_openBalanceAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Open Balance over max ..." });
                }


                AccountOpenBalance savedItem = UoW.AccountOpenBalanceRepo.GetAccountOpenBalanceById(updateItem.AccountOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                    savedItem.OpenBalance = _openBalanceAmount;
                    savedItem.UpdatedDate = DateTime.Now;
                    savedItem.UpdatedBy = _currentUserId;

                    UoW.AccountOpenBalanceRepo.UpdateAccountOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/Hospital_RevenueLine_UpdateItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Hospital_RevenueLine_DeleteItem")]
        public HttpResponseMessage Hospital_RevenueLine_DeleteItem(AccountOpenBalance_VM deleteItem)
        {
            // need paramters 
            // AccountOpenBalanceId
         
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

                AccountOpenBalance savedItem = UoW.AccountOpenBalanceRepo.GetAccountOpenBalanceById(deleteItem.AccountOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                  
                    UoW.AccountOpenBalanceRepo.DeleteAccountOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/Hospital_RevenueLine_DeleteItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }

        #endregion



        #region AccountOpenBalance -  Community_TPBELine
        [HttpPost]
        [Route("Community_TPBELine_InsertItem")]
        public HttpResponseMessage Community_TPBELine_InsertItem(AccountOpenBalance_VM addItem)
        {
         
            // need paramters 
            // HspId == AccountId, FiscalYear, TPBEId, SAASectorId, OpenBalance


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



                bool _isRecordExisted = Common_TPBELine_CheckIfRecordExisted(addItem.AccountID, addItem.FiscalYear, addItem.SAASectorID, (int)addItem.TPBEID);
                if (_isRecordExisted == true)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message =" TPBE  already Existed ." });
                }


                decimal? _openBalanceAmount = null;
                if (!string.IsNullOrEmpty(addItem.OpenBalanceText) || !string.IsNullOrWhiteSpace(addItem.OpenBalanceText))
                {
                    string _openBalanceAmountText = Common.RemoveDollarSign(addItem.OpenBalanceText);
                    decimal _openBalanceAmt;
                    if (Decimal.TryParse(_openBalanceAmountText, out _openBalanceAmt))
                    {
                        _openBalanceAmount = _openBalanceAmt;
                    }
                }

                if (_openBalanceAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Open Balance over max ..." });
                }

                AccountOpenBalance newItem = new AccountOpenBalance(); ;

                newItem.AccountID = addItem.AccountID;
                newItem.FiscalYear = addItem.FiscalYear;
                newItem.SAASectorID = addItem.SAASectorID;

                // newItem.RevenueLineID = addItem.RevenueLineID;
                newItem.TPBEID = addItem.TPBEID;

                newItem.OpenBalance = _openBalanceAmount;

                newItem.CreatedDate = DateTime.Now;
                newItem.CreatedBy = _currentUserId;
                newItem.UpdatedDate = DateTime.Now;
                newItem.UpdatedBy = _currentUserId;

                UoW.AccountOpenBalanceRepo.InsertNewAccountOpenBalance(newItem);
                UoW.SaveChanges();

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/Community_TPBELine_AddItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }

        [HttpPost]
        [Route("Community_TPBELine_UpdateItem")]
        public HttpResponseMessage Community_TPBELine_UpdateItem(AccountOpenBalance_VM updateItem)
        {
            // need paramters 
            // AccountOpenBalanceId
            // OpenBalanceText


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



                decimal? _openBalanceAmount = null;
                if (!string.IsNullOrEmpty(updateItem.OpenBalanceText) || !string.IsNullOrWhiteSpace(updateItem.OpenBalanceText))
                {
                    string _openBalanceAmountText = Common.RemoveDollarSign(updateItem.OpenBalanceText);
                    decimal _openBalanceAmt;
                    if (Decimal.TryParse(_openBalanceAmountText, out _openBalanceAmt))
                    {
                        _openBalanceAmount = _openBalanceAmt;
                    }
                }

                if (_openBalanceAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Open Balance over max ..." });
                }


                AccountOpenBalance savedItem = UoW.AccountOpenBalanceRepo.GetAccountOpenBalanceById(updateItem.AccountOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                    savedItem.OpenBalance = _openBalanceAmount;
                    savedItem.UpdatedDate = DateTime.Now;
                    savedItem.UpdatedBy = _currentUserId;

                    UoW.AccountOpenBalanceRepo.UpdateAccountOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/Community_TPBELine_UpdateItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        [HttpPost]
        [Route("Community_TPBELine_DeleteItem")]
        public HttpResponseMessage Community_TPBELine_DeleteItem(AccountOpenBalance_VM  deleteItem)
        {
            // need paramters 
            // AccountOpenBalanceId
            // OpenBalanceText


            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (deleteItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to save ..." });
                }


                AccountOpenBalance savedItem = UoW.AccountOpenBalanceRepo.GetAccountOpenBalanceById(deleteItem.AccountOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                  

                    UoW.AccountOpenBalanceRepo.DeleteAccountOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/Community_TPBELine_DeleteItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        #endregion




        #region AccountOpenBalance -  LongTermCare_TPBELine
        [HttpPost]
        [Route("LongTermCare_TPBELine_InsertItem")]
        public HttpResponseMessage LongTermCare_TPBELine_InsertItem(AccountOpenBalance_VM addItem)
        {

            // need paramters 
            // HspId == AccountId, FiscalYear, TPBEId, SAASectorId, OpenBalance


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



                bool _isRecordExisted = Common_TPBELine_CheckIfRecordExisted(addItem.AccountID, addItem.FiscalYear, addItem.SAASectorID, (int)addItem.TPBEID);
                if (_isRecordExisted == true)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = " TPBE  already Existed ." });
                }


                decimal? _openBalanceAmount = null;
                if (!string.IsNullOrEmpty(addItem.OpenBalanceText) || !string.IsNullOrWhiteSpace(addItem.OpenBalanceText))
                {
                    string _openBalanceAmountText = Common.RemoveDollarSign(addItem.OpenBalanceText);
                    decimal _openBalanceAmt;
                    if (Decimal.TryParse(_openBalanceAmountText, out _openBalanceAmt))
                    {
                        _openBalanceAmount = _openBalanceAmt;
                    }
                }


                if (_openBalanceAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Open Balance over max ..." });
                }

                AccountOpenBalance newItem = new AccountOpenBalance(); ;

                newItem.AccountID = addItem.AccountID;
                newItem.FiscalYear = addItem.FiscalYear;
                newItem.SAASectorID = addItem.SAASectorID;

                // newItem.RevenueLineID = addItem.RevenueLineID;
                newItem.TPBEID = addItem.TPBEID;

                newItem.OpenBalance = _openBalanceAmount;

                newItem.CreatedDate = DateTime.Now;
                newItem.CreatedBy = _currentUserId;
                newItem.UpdatedDate = DateTime.Now;
                newItem.UpdatedBy = _currentUserId;

                UoW.AccountOpenBalanceRepo.InsertNewAccountOpenBalance(newItem);
                UoW.SaveChanges();

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/LongTermCare_TPBELine_AddItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }

        [HttpPost]
        [Route("LongTermCare_TPBELine_UpdateItem")]
        public HttpResponseMessage LongTermCare_TPBELine_UpdateItem(AccountOpenBalance_VM updateItem)
        {
            // need paramters 
            // AccountOpenBalanceId
            // OpenBalanceText


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



                decimal? _openBalanceAmount = null;
                if (!string.IsNullOrEmpty(updateItem.OpenBalanceText) || !string.IsNullOrWhiteSpace(updateItem.OpenBalanceText))
                {
                    string _openBalanceAmountText = Common.RemoveDollarSign(updateItem.OpenBalanceText);
                    decimal _openBalanceAmt;
                    if (Decimal.TryParse(_openBalanceAmountText, out _openBalanceAmt))
                    {
                        _openBalanceAmount = _openBalanceAmt;
                    }
                }

                if (_openBalanceAmount > Common.MAX_OPENBALANCE_AMOUNT)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Open Balance over max ..." });
                }

                AccountOpenBalance savedItem = UoW.AccountOpenBalanceRepo.GetAccountOpenBalanceById(updateItem.AccountOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                    savedItem.OpenBalance = _openBalanceAmount;
                    savedItem.UpdatedDate = DateTime.Now;
                    savedItem.UpdatedBy = _currentUserId;

                    UoW.AccountOpenBalanceRepo.UpdateAccountOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/LongTermCare_TPBELine_UpdateItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }



        [HttpPost]
        [Route("LongTermCare_TPBELine_DeleteItem")]
        public HttpResponseMessage LongTermCare_TPBELine_DeleteItem(AccountOpenBalance_VM deleteItem)
        {
            // need paramters 
            // AccountOpenBalanceId
            // OpenBalanceText


            string _currentUserId = string.Empty;
            UserProfile _user = null;

            try
            {
                _user = GetCurrentUser();
                _currentUserId = _user.UserID;

                if (deleteItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Nothing to save ..." });
                }

               
                AccountOpenBalance savedItem = UoW.AccountOpenBalanceRepo.GetAccountOpenBalanceById(deleteItem.AccountOpenBalanceID);

                if (savedItem == null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 0, Message = "Record not existed ." });
                }
                else
                {
                   
                    UoW.AccountOpenBalanceRepo.DeleteAccountOpenBalance(savedItem);
                    UoW.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                UoW.ErrorLogRepo.AddCustomErrorLog(ex, "api/AccountOpenBalanceApi/LongTermCare_TPBELine_DeleteItem", _currentUserId, "");
                UoW.SaveChanges();
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message.ToString());
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { InsertResult = 1, Message = Common.SAVE_SUCCESSMESSAGE });

        }


        #endregion





        public bool Common_RevenueLine_CheckIfRecordExisted(int accountId, int fiscalYear, int saaSectorId, int revenueLineId)
        {
            bool _isRecordExisted = false;

            int _itemCounter = (from item in UoW.DBContext.AccountOpenBalances
                                where item.AccountID == accountId && item.FiscalYear == fiscalYear &&
                                      item.SAASectorID == saaSectorId && item.RevenueLineID == revenueLineId
                                select item).Count();

            _isRecordExisted = (_itemCounter > 0) ? true : false;

            return _isRecordExisted;
        }

        
        public bool Common_TPBELine_CheckIfRecordExisted(int accountId, int fiscalYear, int saaSectorId, int tpbeId)
        {
            bool _isRecordExisted = false;

            int _itemCounter = (from item in UoW.DBContext.AccountOpenBalances
                                where item.AccountID == accountId && item.FiscalYear == fiscalYear &&
                                      item.SAASectorID == saaSectorId && item.TPBEID == tpbeId
                                select item).Count();

            _isRecordExisted = (_itemCounter > 0) ? true : false;

            return _isRecordExisted;
        }



    }


}
