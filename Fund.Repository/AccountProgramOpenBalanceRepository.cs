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
    public class AccountProgramOpenBalanceRepository : BaseRepository<AccountProgramOpenBalance>, IAccountProgramOpenBalanceRepository
    {

        public AccountProgramOpenBalanceRepository(HFundDBContext context) : base(context) { }

        public IQueryable<AccountProgramOpenBalance> GetAllAccountProgramOpenBalance()
        {
            return base.GetAll();
        }

        public AccountProgramOpenBalance GetAccountProgramOpenBalanceById(int id)
        {
            return base.GetById(id);
        }

        public void InsertNewAccountProgramOpenBalance(AccountProgramOpenBalance entity)
        {
            base.Insert(entity);
        }

        public void UpdateAccountProgramOpenBalance(AccountProgramOpenBalance entity)
        {
            base.Update(entity);
        }

        public void DeleteAccountProgramOpenBalance(int id)
        {
            base.Delete(id);
        }

        public void DeleteAccountProgramOpenBalance(AccountProgramOpenBalance entity)
        {
            base.Delete(entity);
        }

        public IQueryable<AccountProgramOpenBalance> GetAllIncluding(params Expression<Func<AccountProgramOpenBalance, object>>[] includeProperties)
        {
            return base.AllIncluding(includeProperties);
        }

        public IEnumerable<AccountProgramOpenBalance> GetQueryFilter(Expression<Func<AccountProgramOpenBalance, bool>> filter, Func<IQueryable<AccountProgramOpenBalance>, IOrderedQueryable<AccountProgramOpenBalance>> orderBy, string includeProperties)
        {
            return base.QueryFilter(filter, orderBy, includeProperties);
        }



        public List<AccountProgramOpenBalance_VM> GetAccountProgramOpenBalance_ByAccountIdAndFiscalYear(int accountId, int fiscalYear)
        {
            List<AccountProgramOpenBalance_VM> _APOBList = new List<AccountProgramOpenBalance_VM>();

            try
            {
                IQueryable<AccountProgramOpenBalance> _queryItems = GetAllIncluding(acct => acct.Account, fYear => fYear.FiscalYear1, subCategory => subCategory.FundingProgramSubCategory).Where(c => c.AccountID == accountId && c.FiscalYear == fiscalYear).OrderBy(d => d.CreatedDate);

                foreach (var qItem in _queryItems)
                {
                    AccountProgramOpenBalance_VM newItem = new AccountProgramOpenBalance_VM();
                    newItem.AccountProgramOpenBalanceID = qItem.AccountProgramOpenBalanceID;

                    newItem.AccountID = qItem.AccountID;
                    newItem.AccountID_AccountNumber = qItem.Account.AccountNumber;
                    newItem.AccountID_DisplayName = qItem.Account.Name;

                    newItem.FiscalYear = qItem.FiscalYear;
                    newItem.FiscalYear_Description = qItem.FiscalYear1.Description;

                    newItem.FundingProgramSubCategoryID = qItem.FundingProgramSubCategoryID;
                    newItem.FundingProgramSubCategoryID_DisplayName = qItem.FundingProgramSubCategory.FundingProgramSubCategoryDescription;

                    newItem.UnitOfMeasureId = qItem.FundingProgramSubCategory.UnitofMeasureID;
                    UnitofMeasure _unitOfMeasureItem = GetUnitOfMeasureById((int)newItem.UnitOfMeasureId);
                    if (_unitOfMeasureItem != null)
                    {
                        newItem.UnitOfMeasuredId_DisplayName = _unitOfMeasureItem.UnitofMeasureDescription;
                    }


                    newItem.FundingProgramCategoryID = qItem.FundingProgramSubCategory.FundingProgramCategoryID;

                    FundingProgramCategory _programCategoryItem = GetFundingProgramCategoryById((int)newItem.FundingProgramCategoryID);

                    if (_programCategoryItem != null)
                    {
                        newItem.FundingProgramCategoryID_DisplayName = _programCategoryItem.FundingProgramCategoryDescription;
                        if ( _programCategoryItem.SortOrder.HasValue)
                        {
                            newItem.FundingProgramCategoryID_SortOrder = _programCategoryItem.SortOrder.Value;
                        }

                        newItem.FundingProgramID = _programCategoryItem.FundingProgramID;

                        FundingProgram _programItem = GetFundingProgramById((int)newItem.FundingProgramID);

                        if (_programItem != null)
                        {
                            newItem.FundingProgramID_DisplayName = _programItem.FundingProgram1;
                            if ( _programItem.SortOrder.HasValue)
                            {
                                newItem.FundingProgramID_SortOrder = _programItem.SortOrder.Value;

                                newItem.SAASectorID = _programItem.SAASectorID; // Added for filter out by SAASectorID later
                            }
                         
                        }

                    }

                    newItem.BeginVolume = qItem.BeginningVolume;
                    newItem.ExpiryDate = qItem.ExpiryDate;

                    _APOBList.Add(newItem);

                }
            }
            catch (Exception ex)
            {
                string message = ex.Message.ToString();

            }


            return _APOBList;
      }


        private UnitofMeasure GetUnitOfMeasureById(int unitOfMeasuredId)
        {
            UnitofMeasure retItem = null;

            retItem = DBContext.UnitofMeasures.Where(c => c.UnitofMeasureID == unitOfMeasuredId).FirstOrDefault();

            return retItem;
        }


        private FundingProgramCategory GetFundingProgramCategoryById(int fundingProgramCategoryId)
        {
            FundingProgramCategory retItem = null;

            retItem = DBContext.FundingProgramCategories.Where(c => c.FundingProgramCategoryID == fundingProgramCategoryId).FirstOrDefault();

            return retItem;
        }


        private FundingProgram GetFundingProgramById(int fundingProgramId)
        {
            FundingProgram retItem = null;

            retItem = DBContext.FundingPrograms.Where(c => c.FundingProgramID == fundingProgramId).FirstOrDefault();

            return retItem;
        }

        public Decimal GetProgramSubCategoryPercentage(int AccountID, int FiscalYear, int FundingProgramSubCategoryID)
        {
            try
            {
                string query = "SELECT [dbo].[fnCalcProgramSubCategoryPercentage] (@p0, @p1, @p2, NULL) AS PercentageVolume ";
                return base.DBContext.Database.SqlQuery<Decimal>(query, AccountID, FiscalYear, FundingProgramSubCategoryID).FirstOrDefault();
            }
            catch (Exception ex)
            {
                string message = ex.Message.ToString();
            }
            return 0M;
        }
    }


}
