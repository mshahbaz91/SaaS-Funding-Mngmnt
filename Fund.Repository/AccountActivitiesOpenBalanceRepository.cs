using System;
using System.Collections.Generic;
using System.Linq;
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
    public class AccountActivitiesOpenBalanceRepository : BaseRepository<AccountActivitiesOpenBalance>, IAccountActivitiesOpenBalanceRepository
    {
        public AccountActivitiesOpenBalanceRepository(HFundDBContext context) : base(context) { }

        public IQueryable<AccountActivitiesOpenBalance> GetAllAccountActivitiesOpenBalance()
        {
            return base.GetAll();
        }
        public AccountActivitiesOpenBalance GetAccountActivitiesOpenBalanceById(int id)
        {
            return base.GetById(id);
        }

        public void InsertNewAccountActivitiesOpenBalance(AccountActivitiesOpenBalance entity)
        {
            base.Insert(entity);
        }

        public void UpdateAccountActivitiesOpenBalance(AccountActivitiesOpenBalance entity)
        {
            base.Update(entity);
        }


        public void DeleteAccountActivitiesOpenBalance(int id)
        {
            base.Delete(id);
        }

        public void DeleteAccountActivitiesOpenBalance(AccountActivitiesOpenBalance entity)
        {
            base.Delete(entity);
        }

        public IQueryable<AccountActivitiesOpenBalance> GetAllIncluding(params System.Linq.Expressions.Expression<Func<AccountActivitiesOpenBalance, object>>[] includeProperties)
        {
            return base.AllIncluding(includeProperties);
        }



        public IEnumerable<AccountActivitiesOpenBalance> GetQueryFilter(System.Linq.Expressions.Expression<Func<AccountActivitiesOpenBalance, bool>> filter, Func<IQueryable<AccountActivitiesOpenBalance>, IOrderedQueryable<AccountActivitiesOpenBalance>> orderBy, string includeProperties)
        {
            return base.QueryFilter(filter, orderBy, includeProperties);
        }


       public List<AccountActivitiesOpenBalance_VM> GetAccountActivitiesOpenBalance_ByAccountIdAndFiscalYear(int accountId, int fiscalYear)
       {
            List<AccountActivitiesOpenBalance_VM> _aaobList = new List<AccountActivitiesOpenBalance_VM>();

            try
            {
                IQueryable<AccountActivitiesOpenBalance> _queryItems = GetAllIncluding(acct => acct.Account, fYear => fYear.FiscalYear1, fc => fc.FunctionalCenter, um => um.UnitofMeasure).Where(c => c.AccountID == accountId && c.FiscalYear == fiscalYear).OrderBy(d => d.CreatedDate);

                foreach(var qItem in _queryItems)
                {
                    AccountActivitiesOpenBalance_VM newItem = new AccountActivitiesOpenBalance_VM();

                    newItem.AccountActivitiesOpenBalanceID = qItem.AccountActivitiesOpenBalanceID;

                    newItem.AccountID = qItem.Account.AccountID;
                    newItem.AccountID_AccountNumber = qItem.Account.AccountNumber;
                    newItem.AccountID_DisplayName = qItem.Account.Name;

                    newItem.FiscalYear = qItem.FiscalYear;
                    newItem.FiscalYear_Description = qItem.FiscalYear1.Description;

                    newItem.FunctionalCenterID = qItem.FunctionalCenterID;
                    newItem.FunctionalCenterID_Description = qItem.FunctionalCenter.FunctionalCenterName;

                    newItem.TPBEID = 0;
                    newItem.TPBEID_DisplayName = "Common";

                    if ( qItem.FunctionalCenter.TPBEID.HasValue)
                    {
                        newItem.TPBEID = qItem.FunctionalCenter.TPBEID.Value;

                        TPBE _tpbe =  GetTPBEById(qItem.FunctionalCenter.TPBEID.Value);
                        if (_tpbe != null)
                        {
                            newItem.TPBEID_DisplayName = _tpbe.TPBEDescription;
                        }
                    }


                    newItem.UnitOfMeasureID = qItem.UnitofMeasureID;
                    newItem.UnitOfMeasureID_DisplayName = qItem.UnitofMeasure.UnitofMeasureDescription;

                    newItem.BeginVolume = qItem.BeginningVolume;

                    _aaobList.Add(newItem);
                }



            }
            catch (Exception ex)
            {

                string message = ex.Message.ToString();
            }


            return _aaobList;
       }




        private TPBE GetTPBEById(int tpbeId)
        {
            TPBE _tpbe = null;

            _tpbe = DBContext.TPBEs.Where(c => c.TPBEID == tpbeId).FirstOrDefault();

            return _tpbe;
        }


    }


}
