using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using System.Globalization;
using HFund.Utility;
using HFund.Web.Models;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.Repository;
using HFund.Web.ValidationRules;

namespace HFund.Web.ApplicationServices
{
    public class FundingImportManager
    {
        private String _ErrorMessage = string.Empty;
        static private CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US");

        public String LastErrorMessage { get { return _ErrorMessage; } private set { _ErrorMessage = value; } }

        public FundingImportManager() { }

        public IEnumerable<FundingSourceImport>ImportFundingSource (Stream DataStream)
        {
            const String SheetName = "Funding";
            const int    ColumnCount =  12;

            List<FundingSourceImport> FSList = new List<FundingSourceImport>();
            ImportManager IM = new ImportManager();
            DataTable DT = IM.ImportExcelDataFile(DataStream, SheetName);
            if (DT == null)
            {
                _ErrorMessage = IM.LastErrorMessage;
                return null;
            }
            if (DT.Columns.Count != ColumnCount)
            {
                _ErrorMessage = "Invalid Data File Format";
                return null;
            }
            int LineNo = 1;
            foreach (DataRow row in DT.Rows)
            {
                FundingSourceImport FSI = ParseDataRow(row, LineNo);
                if (FSI != null) FSList.Add(FSI);
                LineNo++;
            }
            return FSList; 
        }
        public FundingSourceDialogVM ConvFundingSourceImportDialiog(FundingSourceImport FSI)
        {
            if (FSI == null) return null;

            HFundUnitOfWork UoW = new HFundUnitOfWork();
            TPBE TP = UoW.TPBERepo.GetTPBEById(FSI.TPBEID);

            FundingSourceDialogVM FSD = new FundingSourceDialogVM();

            if (FSI.ProgramID != null) {
                FSD.FiscalYear = UoW.ProgramRepo.GetProgramById((int) FSI.ProgramID)?.FiscalYear ?? 0;
                FSD.FiscalYear_DisplayText = FSI.FiscalYearDescription;
            } else {
                FSD.FiscalYear = (from c in UoW.DBContext.FiscalYears where c.Description == FSI.FiscalYearDescription select c.FiscalYear1).FirstOrDefault();
                if (FSD.FiscalYear == 0)
                {
                    FSD.FiscalYear = SystemValues.CurrentFiscalYear;
                }
                FSD.FiscalYear_DisplayText = UoW.FiscalYearRepo.GetFiscalYearById(SystemValues.CurrentFiscalYear)?.Description ?? String.Empty;
            }
            FSD.Name = string.Empty;
            FSD.ProgramId                           = FSI.ProgramID;
            FSD.ProgramId_DisplayText               = FSI.ProgramDescription;
            FSD.LHINLeadId                          = 0;
            FSD.LHINLeadId_DisplayText              = String.Empty;
            FSD.HSPId                               = FSI.AccountID;
            FSD.HSPId_DisplayText                   = FSI.AccountName;
            FSD.TPBEId                              = FSI.TPBEID;
            FSD.TPBEId_DisplayText                  = TP?.TPBEDescription;
            FSD.SectorId                            = TP?.SectorID ?? 0;
            FSD.SectorId_DisplayText                = UoW.SectorRepo.GetSectorById(FSD.SectorId).SectorDescription;
            FSD.FundingTypeId                       = SystemValues.BaseFundingType;
            FSD.FundingTypeId_DisplayText           = UoW.FundingTypeRepo.GetFundingTypeById(SystemValues.BaseFundingType)?.FundingTypeDescription;
            FSD.FundingTypeAmountText               = (FSI.BaseFundingAmount == null) ? String.Empty : FSI.BaseFundingAmount.ToString();
            FSD.FundingTypeSecondId                 = SystemValues.OneTimeFundingType;
            FSD.FundingTypeSecondId_DisplayText     = UoW.FundingTypeRepo.GetFundingTypeById(SystemValues.OneTimeFundingType)?.FundingTypeDescription;
            FSD.FundingTypeSecondAmountText         = (FSI.OneTimeFundingAmount == null) ? String.Empty : FSI.OneTimeFundingAmount.ToString();
            FSD.BaseAnnualizedAmountText            = (FSI.BaseAnnualizedAmount == null) ? String.Empty : FSI.BaseAnnualizedAmount.ToString();
            FSD.Enclosure                           = FSI.FundingLetterEnclosure;
            FSD.Deliverable                         = FSI.FundingLetterDeliverables;
            FSD.AdditionalCommentOne                = FSI.FundingLetterComment1;
            FSD.AdditionalCommentTwo                = FSI.FundingLetterComment2;
            FSD.LineNo                              = FSI.LineNo;
            FSD.LineResult                          = FSI.LineResult.Clone();

            return FSD;
        }

        public IEnumerable<FundingSourceDialogVM> ImportFundingSourceDialog(Stream DataStream)
        {
            IEnumerable<FundingSourceImport> FSList = ImportFundingSource(DataStream);
            List<FundingSourceDialogVM> FSDList = new List<FundingSourceDialogVM>();
            foreach (var item in FSList)
            {
                FundingSourceDialogVM FSD = ConvFundingSourceImportDialiog(item);
                FSDList.Add(FSD);
            }
            return FSDList;
        }

        public IEnumerable<FundingSourceImport> ImportFundingSource(String DataFileName)
        {
            const String SheetName = "Funding";
            const int ColumnCount = 14;

            List<FundingSourceImport> FSList = new List<FundingSourceImport>();
            ImportManager IM = new ImportManager();
            DataTable DT = IM.ImportExcelDataFile(DataFileName, SheetName);
            if (DT == null)
            {
                _ErrorMessage = IM.LastErrorMessage;
                return null;
            }
            if (DT.Columns.Count != ColumnCount)
            {
                _ErrorMessage = "Invalid Data File Format";
                return null;
            }
            int LineNo = 1;
            foreach (DataRow row in DT.Rows)
            {
                FundingSourceImport FSI = ParseDataRow(row, LineNo);
                if (FSI != null) FSList.Add(FSI);
                LineNo++;
            }
            return FSList;
        }

        FundingSourceImport ParseDataRow (DataRow row, int LineNo)
        {
            try
            {
                Decimal DecimalValue;
                Int32   IntValue;
                var Items = row.ItemArray;
                List<FieldErrorMessage> fieldMessage = new List<FieldErrorMessage>();
                HFundUnitOfWork UoW = new HFundUnitOfWork();

                if (String.IsNullOrWhiteSpace(Items[0].ToString())) return null;

                FundingSourceImport FSI = new FundingSourceImport();
                FSI.LineNo = LineNo;

                if (!Int32.TryParse(Items[0].ToString(), out FSI.AccountID))
                {
                    FSI.AccountID = 0;
                    fieldMessage.Add(new FieldErrorMessage("AccountID", "Invalid HSP ID Format"));
                } else
                {
                    AccountTPBE ATP = UoW.AccountTPBERepo.GetAccountTPBEById(FSI.AccountID);
                    if (ATP != null)
                    {
                        FSI.AccountID   = ATP.AccountID;
                        FSI.TPBEID      = ATP.TPBEID;

                    } else {
                        FSI.AccountID = 0;
                        fieldMessage.Add(new FieldErrorMessage("AccountID", "Invalid HSP ID"));
                    };
                }
                FSI.AccountNumber = Items[1].ToString().Trim();
                FSI.AccountName = Items[2].ToString().Trim();
                FSI.TPBEShortName = Items[3].ToString().Trim();
                IntValue = FSI.ProgramID ?? 0;
//                if (!Int32.TryParse(Items[4].ToString(), out IntValue))
//                {
//                    FSI.ProgramID = null;
////                  Change Program ID Optional
////                  fieldMessage.Add(new FieldErrorMessage("ProgramID", "Invalid Program ID Format"));
//                } else FSI.ProgramID = IntValue;
//                FSI.ProgramDescription = Items[5].ToString().Trim();
                FSI.FiscalYearDescription = Items[4].ToString().Trim();
                FSI.FundingLetterDeliverables = Items[5].ToString().Trim();
                if (String.IsNullOrWhiteSpace(Items[6].ToString()))
                    FSI.OneTimeFundingAmount = null;
                else {
                    if (Decimal.TryParse(Items[6].ToString(), NumberStyles.Currency, culture, out DecimalValue))
                        FSI.OneTimeFundingAmount = DecimalValue;
                    else {
                        FSI.OneTimeFundingAmount = 0;
                        fieldMessage.Add(new FieldErrorMessage("OneTimeFundingAmount", "Invalid One-Time Funding Amount Format"));
                    }
                }
                if (String.IsNullOrWhiteSpace(Items[7].ToString()))
                    FSI.BaseFundingAmount = null;
                else {
                    if (Decimal.TryParse(Items[7].ToString(), NumberStyles.Currency, culture, out DecimalValue))
                        FSI.BaseFundingAmount = DecimalValue;
                    else {
                        FSI.BaseFundingAmount = null;
                        fieldMessage.Add(new FieldErrorMessage("BaseFundingAmount", "Invalid Base Funding Amount Format"));
                    }
                }
                if (String.IsNullOrWhiteSpace(Items[8].ToString()))
                    FSI.BaseAnnualizedAmount = null;
                else {
                    if (Decimal.TryParse(Items[8].ToString(), NumberStyles.Currency, culture, out DecimalValue))
                        FSI.BaseAnnualizedAmount = DecimalValue;
                    else {
                        FSI.BaseAnnualizedAmount = null;
                        fieldMessage.Add(new FieldErrorMessage("BaseAnnualizedAmount", "Invalid Base Annualized Amount Format"));
                    }
                }
                FSI.FundingLetterEnclosure  = Items[9].ToString().Trim();
                FSI.FundingLetterComment1   = Items[10].ToString().Trim();
                FSI.FundingLetterComment2   = Items[11].ToString().Trim();

                if (fieldMessage.Count() == 0)
                    FSI.LineResult = ValidationManager.FundingSourceImportRule.Validate(FSI);
                else
                    FSI.LineResult = new ValidationResult(false, fieldMessage);
                return FSI;
            }
            catch (Exception ex)
            {
                _ErrorMessage = "Parse Data Row: " + ex.Message;
                return null;
            }
        }
    }
}