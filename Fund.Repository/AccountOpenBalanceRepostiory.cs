using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.DataAccessLayer;
using HFund.IRepository;
using System.Web.Mvc;

namespace HFund.Repository
{
    public class AccountOpenBalanceRepostiory : BaseRepository<AccountOpenBalance>, IAccountOpenBalanceRepostiory
    {

        public AccountOpenBalanceRepostiory(HFundDBContext context) : base(context) { }


        public IQueryable<AccountOpenBalance> GetAllAccountOpenBalance()
        {
            return base.GetAll();
        }

        public AccountOpenBalance GetAccountOpenBalanceById(int id)
        {
            return base.GetById(id);
        }

        public void InsertNewAccountOpenBalance(AccountOpenBalance entity)
        {
            base.Insert(entity);
        }

        public void UpdateAccountOpenBalance(AccountOpenBalance entity)
        {
            base.Update(entity);
        }

        public void DeleteAccountOpenBalance(int id)
        {
            base.Delete(id);
        }

        public void DeleteAccountOpenBalance(AccountOpenBalance entity)
        {
            base.Delete(entity);
        }


        public IQueryable<AccountOpenBalance> GetAllIncluding(params Expression<Func<AccountOpenBalance, object>>[] includeProperties)
        {
            return base.AllIncluding(includeProperties);
        }

        public IEnumerable<AccountOpenBalance> GetQueryFilter(Expression<Func<AccountOpenBalance, bool>> filter, Func<IQueryable<AccountOpenBalance>, IOrderedQueryable<AccountOpenBalance>> orderBy, string includeProperties)
        {
            return base.QueryFilter(filter, orderBy, includeProperties);
        }


        public List<AccountOpenBalance_VM> GetAccountOpenBalanceByAccountId(int accountId)
        {
            List<AccountOpenBalance_VM> _aList = new List<AccountOpenBalance_VM>();

            var _queryItems = GetAllIncluding( Acct => Acct.Account, SAA => SAA.SAASector, FYear => FYear.FiscalYear1).Where(c => c.AccountID == accountId).OrderByDescending(c => c.FiscalYear);

            if ( _queryItems.Count() > 0)
            {
                foreach(var qItem in _queryItems)
                {
                    AccountOpenBalance_VM newItem = new AccountOpenBalance_VM();
                    newItem.AccountOpenBalanceID = qItem.AccountOpenBalanceID;

                    newItem.AccountID = qItem.AccountID;
                    newItem.AccountID_AccountNumber = qItem.Account.AccountNumber;
                    newItem.AccountID_DisplayName = qItem.Account.Name;

                    newItem.FiscalYear = qItem.FiscalYear;
                    newItem.FiscalYear_Description = qItem.FiscalYear1.Description;
                    //newItem.FiscalYear_Description = "2020/21";


                    newItem.SAASectorID = qItem.SAASectorID;
                    newItem.SAASectorID_Description = qItem.SAASector.SAADescription;

                    newItem.RevenueLineID = qItem.RevenueLineID;  // qItem.RevenueLineID ??? can not do include
                    if ( newItem.RevenueLineID.HasValue)
                    {
                        RevenueLine _rLine = GetRevenueLineById(newItem.RevenueLineID.Value);
                        if(_rLine != null)
                        {
                            newItem.RevenueLineID_DisplayName = _rLine.RevenueLine1;
                        }
                    }

                    newItem.TPBEID = qItem.TPBEID;
                    if ( newItem.TPBEID != null)
                    {
                        TPBE _tpbe = GetTPBEById(newItem.TPBEID.Value);
                        if ( _tpbe != null)
                        {
                            newItem.TPBEID_DisplayName = _tpbe.TPBEDescription;
                        }
                    }

                    newItem.OpenBalance = qItem.OpenBalance;

                    _aList.Add(newItem);
                }

            }


            return _aList;
        }



        private RevenueLine GetRevenueLineById ( int revenueLineId)
        {
            RevenueLine _rLine = null;

            _rLine = DBContext.RevenueLines.Where(c => c.RevenueLineID == revenueLineId).FirstOrDefault();

            return _rLine;
        }


        private TPBE GetTPBEById(int tpbeId)
        {
            TPBE _tpbe = null;

            _tpbe = DBContext.TPBEs.Where(c => c.TPBEID == tpbeId).FirstOrDefault();

            return _tpbe ;
        }




    }


}
