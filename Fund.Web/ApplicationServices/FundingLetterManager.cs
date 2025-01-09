using System;
using System.Collections.Generic;
using System.Configuration;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.IO.Compression;
using HFund.Data.Models;
using HFund.Data.ViewModels;
using HFund.Repository;
using HFund.Utility;
using System.IO;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.CustomProperties;
using DocumentFormat.OpenXml.VariantTypes;

namespace HFund.Web.ApplicationServices
{
    public class FundingLetterManager
    {
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        static String _MIMEType = @"application/msword";
        static String _ZipMIMEType = "application/zip";
        static String _Extension = @"docx";
        static String _ZipExtension = @"zip";
        static private String HostPath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath;
        static private String FundingLetterPath = (ServerConfiguration.FundingLetter_Path.IndexOf(':') < 0 && ServerConfiguration.FundingLetter_Path.IndexOf(@"\\") < 0) ? HostPath + ServerConfiguration.FundingLetter_Path : ServerConfiguration.FundingLetter_Path;
        static private String FundingLetterTemplatePath = (ServerConfiguration.FundingLetter_TemplatePath.IndexOf(':') < 0 && ServerConfiguration.FundingLetter_TemplatePath.IndexOf(@"\\") < 0) ? HostPath + ServerConfiguration.FundingLetter_TemplatePath : ServerConfiguration.FundingLetter_TemplatePath;

        WordprocessingDocument wdDocument;
        MainDocumentPart wdMainPart;
        CustomFilePropertiesPart wdCustomPropertry;

        String FundingLetterDocument;

        FundingDetail fd = null;
        FundingLetter fl = null;
        Account HSP = null;

        HFundUnitOfWork UoW = new HFundUnitOfWork();

        static public String MIMEType { get { return _MIMEType; } private set { _MIMEType = value; } }
        static public String Extension { get { return _Extension; } private set { _Extension = value; } }
        static public String ZipMIMEType { get { return _ZipMIMEType; } private set { _ZipMIMEType = value; } }
        static public String ZipExtension { get { return _ZipExtension; } private set { _ZipExtension = value; } }

        public String FundingLetter { get { return FundingLetterDocument; } private set { FundingLetterDocument = value; } }

        public FundingLetterManager()
        {
        }

        public Boolean BatchPrint(List<FundingLetterVM> FList)
        {
            Boolean Success = false;
            String zipfileName = System.IO.Path.Combine(FundingLetterPath, "Batch_" + DateTime.Now.ToString("yyyyMMddHHmmssffffff") + @"." + ZipExtension);
            if (FList != null && FList.Count() > 0)
            {
                try
                {
                    if (File.Exists(zipfileName)) File.Delete(zipfileName);
                    ZipArchive zip = ZipFile.Open(zipfileName, ZipArchiveMode.Create);
                    foreach (var fl in FList)
                    {
                        if (Generate((int)fl.FundingDetailID))
                        {
                            if (File.Exists(FundingLetterDocument))
                                zip.CreateEntryFromFile(FundingLetterDocument, Path.GetFileName(FundingLetterDocument), CompressionLevel.Optimal);

                        }
                    }
                    zip.Dispose();
                    FundingLetterDocument = zipfileName;
                    Success = true;
                }
                catch (Exception ex)
                {
                    Log.Error(ex.Message);
                }
            }
            return Success;
        }

        public Boolean Generate(int FundingLetterID)
        {
            Boolean Success = false;

            fl = UoW.FundingLetterRepo.GetFundingLetterById(FundingLetterID);
            fd = UoW.FundingDetailRepo.GetFundingDetailById(FundingLetterID);

            if (fl == null || fd == null || fd.HSPID == null || !new[] { SystemValues.FundingLetterTypeID, SystemValues.RecoveryLetterTypeID }.Contains(fd.FundingEntityTypeID)) return Success;
            HSP = UoW.AccountRepo.GetAccountById((int)fd.HSPID);
            if (HSP == null) return Success;

            int fundingLetterTemplateID = (fl.FundingLetterTemplateID == null) ? SystemValues.DefaultFundingLetterTemplate : (int)fl.FundingLetterTemplateID;
            FundingLetterTemplate FLT = UoW.DBContext.FundingLetterTemplates.Find(fundingLetterTemplateID);

            if (FLT != null && createFundingLetterForm(fd, FLT.TemplateFileName))
            {
                if (populateFundingLetter(fd.FundingEntityID)) Success = true;
                closeFundingLetterForm();
            }

            return Success;
        }
        private Boolean createFundingLetterForm(FundingDetail fd, String templateFileName)
        {
            String sourceFile = System.IO.Path.Combine(FundingLetterTemplatePath, templateFileName);

            FundingLetterDocument = System.IO.Path.Combine(FundingLetterPath, "Funding Letter " + fd.FundingDetailID.ToString() + @"." + Extension);
            try
            {
                if (!System.IO.Directory.Exists(FundingLetterPath))
                {
                    System.IO.Directory.CreateDirectory(FundingLetterPath);
                }

                System.IO.File.Copy(sourceFile, FundingLetterDocument, true);
                wdDocument = WordprocessingDocument.Open(FundingLetterDocument, true);
                wdMainPart = wdDocument.MainDocumentPart;
                wdCustomPropertry = wdDocument.CustomFilePropertiesPart;

                return true;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }

        }

        void closeFundingLetterForm()
        {
            if (wdDocument != null)
            {
                wdDocument.Close();
            }
        }

        Boolean updateCustomPropertyVTInt32(String Tag, int intValue)
        {
            try
            {
                var Property = wdCustomPropertry.Properties.Where(p => ((CustomDocumentProperty)p).Name.Value == Tag).FirstOrDefault();
                Property.GetFirstChild<VTInt32>().Text = intValue.ToString();

            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }
            return true;
        }

        Boolean updateContentControlEmail(String Tag, String Email)
        {
            try
            {
                HyperlinkRelationship relation = wdMainPart.AddHyperlinkRelationship(new Uri("mailto:" + Email, UriKind.RelativeOrAbsolute), true);
                String relationID = relation.Id;

                List<SdtBlock> SdtBlocks = wdMainPart.Document.Body.Descendants<SdtBlock>().Where(r => r.SdtProperties.GetFirstChild<Tag>().Val == Tag).ToList();
                foreach (SdtBlock StandBlock in SdtBlocks)
                {
                    StandBlock.SdtContentBlock.Descendants<RunProperties>().FirstOrDefault().Color = new DocumentFormat.OpenXml.Wordprocessing.Color() { Val = "0000FF" };
                    StandBlock.SdtContentBlock.Descendants<RunProperties>().FirstOrDefault().Underline = new Underline() { Val = DocumentFormat.OpenXml.Wordprocessing.UnderlineValues.Single };
                    Text ContentText = StandBlock.Descendants<Text>().FirstOrDefault();
                    if (ContentText != null) ContentText.Remove();
                    Run StandRun = StandBlock.SdtContentBlock.Descendants<Run>().FirstOrDefault();
                    if (StandRun != null) StandRun.Append(new Hyperlink(
                                                          new ProofError() { Type = ProofingErrorValues.GrammarStart },
                                                          new Run(
                                                          new RunProperties(
                                                          new RunStyle() { Val = "Hyperlink" }),
                                                          new Text(Email)))
                    { History = new DocumentFormat.OpenXml.OnOffValue(true), Id = relationID });
                }

                List<SdtRun> ContentControlList = wdMainPart.Document.Body.Descendants<SdtRun>().Where(r => r.SdtProperties.GetFirstChild<Tag>().Val == Tag).ToList();
                foreach (SdtRun ContentControl in ContentControlList)
                {
                    RunProperties RunProperty = new RunProperties(new Underline() { Val = DocumentFormat.OpenXml.Wordprocessing.UnderlineValues.Single });
                    RunProperty.Color = new DocumentFormat.OpenXml.Wordprocessing.Color() { Val = "0000FF" };
                    SdtContentRun ContentRun = ContentControl.GetFirstChild<SdtContentRun>();
                    ContentRun.GetFirstChild<Run>().GetFirstChild<RunProperties>().Append(RunProperty);
                    ContentRun.GetFirstChild<Run>().GetFirstChild<Text>().Remove();
                    ContentRun.GetFirstChild<Run>().Append(new Hyperlink(
                                                           new ProofError() { Type = ProofingErrorValues.GrammarStart },
                                                           new Run(
                                                           new RunProperties(
                                                           new RunStyle() { Val = "Hyperlink" }),
                                                           new Text(Email)))
                    { History = new DocumentFormat.OpenXml.OnOffValue(true), Id = relationID });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }
            return true;
        }

        Boolean paragraphText(Run run, string textualData)
        {
            try
            {
                string[] newLineArray = { "\r\n", "\n" };
                string[] textArray = textualData.Split(newLineArray, StringSplitOptions.None);

                bool first = true;

                foreach (string textLine in textArray)
                {
                    if (first)
                    {
                        first = false;
                        if (run.Descendants<Text>().FirstOrDefault() != null)
                            run.Descendants<Text>().FirstOrDefault().Text = textLine;
                        else run.Append(new Text(textLine));
                    }
                    else
                    {
                        run.AppendChild(new Break());
                        run.AppendChild<Text>(new Text(textLine));
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }
            return true;
        }

        String FormatAmount(Decimal? Amount)
        {
            if (Amount == null) return String.Empty;
            return String.Format("{0:C0}", (fd.FundingEntityTypeID == SystemValues.RecoveryLetterTypeID) ? Math.Abs((Decimal)Amount) : Amount);
        }

        public void AppendFundingTableLine(Table FundingTable, Boolean IsTotal, String DeliverableText, Decimal? OneTimeAmount, Decimal? BaseAmount, String RowHeight = "250")
        {
            RunProperties runProp = new RunProperties();
            RunFonts runFont = new RunFonts();
            runFont.Ascii = "Arial";
            FontSize size = new FontSize();
            size.Val = "20";
            runProp.Append(runFont);
            runProp.Append(size);
            RunProperties runProp2 = (RunProperties)runProp.Clone();
            RunProperties runProp3 = (RunProperties)runProp.Clone();

            Run run1 = new Run(); //run1.AppendChild(new Break());
            paragraphText(run1, DeliverableText);
            if (IsTotal)
            {
                runProp.AppendChild(new Bold());
                runProp2.AppendChild(new Bold());
                runProp3.AppendChild(new Bold());
            }
            if (fd.FundingEntityTypeID == SystemValues.RecoveryLetterTypeID)
            {
                if (OneTimeAmount != null) OneTimeAmount = Math.Abs((Decimal)OneTimeAmount);
                if (BaseAmount != null) BaseAmount = Math.Abs((Decimal)BaseAmount);
            }
            Run run2 = new Run(); //run2.AppendChild(new Break());   
            run2.AppendChild<Text>(new Text(FormatAmount(OneTimeAmount)));
            Run run3 = new Run(); //run3.AppendChild(new Break());
            run3.AppendChild<Text>(new Text(FormatAmount(BaseAmount)));

            run1.PrependChild<RunProperties>(runProp);
            run2.PrependChild<RunProperties>(runProp2);
            run3.PrependChild<RunProperties>(runProp3);

            ParagraphProperties ParaProperties2 = new ParagraphProperties() { ParagraphStyleId = new ParagraphStyleId() { Val = FundingTable.GetHashCode().ToString() } };
            ParaProperties2.Append(new Justification() { Val = JustificationValues.Center });

            ParagraphProperties ParaProperties3 = (ParagraphProperties)ParaProperties2.Clone();

            TableCell tc1 = new TableCell(new Paragraph(run1));
            TableCell tc2 = new TableCell(new Paragraph(ParaProperties2, run2));
            TableCell tc3 = new TableCell(new Paragraph(ParaProperties3, run3));

            TableRow tr = new TableRow(new TableRowProperties(new TableRowHeight() { Val = Convert.ToUInt32(RowHeight) }));
            tr.Append(tc1);
            tr.Append(tc2);
            tr.Append(tc3);
            FundingTable.Append(tr);
        }

        Boolean updateContentControlText(String Tag, String Text)
        {
            try
            {
                List<SdtBlock> SdtBlocks = wdMainPart.Document.Body.Descendants<SdtBlock>().Where(r => r.SdtProperties.GetFirstChild<Tag>().Val == Tag).ToList();
                foreach (SdtBlock StandBlock in SdtBlocks)
                {
                    StandBlock.SdtContentBlock.Descendants<RunProperties>().FirstOrDefault().Color = new DocumentFormat.OpenXml.Wordprocessing.Color() { Val = "000000" };
                    Run ContentRun = StandBlock.Descendants<Run>().FirstOrDefault();
                    if (ContentRun != null) paragraphText(ContentRun, Text);
                }

                List<SdtRun> ContentControlList = wdMainPart.Document.Body.Descendants<SdtRun>().Where(r => r.SdtProperties.GetFirstChild<Tag>().Val == Tag).ToList();
                foreach (SdtRun ContentControl in ContentControlList)
                {
                    RunProperties RunProperty = new RunProperties(new Color() { Val = "000000" });
                    SdtContentRun ContentRun = ContentControl.GetFirstChild<SdtContentRun>();
                    ContentRun.GetFirstChild<Run>().GetFirstChild<RunProperties>().Append(RunProperty);
                    ContentRun.GetFirstChild<Run>().GetFirstChild<Text>().Text = Text;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }
            return true;
        }

        private void removeParaLine(String SignName)
        {
            foreach (Paragraph p in wdMainPart.Document.Body.Descendants<Paragraph>())
            {
                if (p.InnerText.Contains(SignName)) p.Remove();
            }

        }

        private void buildFundingTable()
        {
            String RowHeight = "250";

            List<FundingTableVM> ftList = UoW.IdentifiedFundingTypeRepo.GetFundingTable(fl.FundingDetailID).Where(c => c.FiscalYear == fd.FiscalYear).ToList();
            int DeliverableCount = ftList.Count();
            Decimal? TotalOneTimeAmount = ftList.Sum(c => (Decimal?)c.OneTimeAmount);
            Decimal? TotalBaseAmount = ftList.Sum(c => (Decimal?)c.BaseAmount);

            switch (DeliverableCount)
            {
                case 1:
                    RowHeight = "2000";
                    break;
                case 2:
                    RowHeight = "750";
                    break;
                case 3:
                    RowHeight = "500";
                    break;
                default:
                    RowHeight = "250";
                    break;
            }
            IEnumerable<TableProperties> tableProperties = wdMainPart.Document.Body.Descendants<TableProperties>().Where(tp => tp.TableCaption != null);
            foreach (TableProperties tProp in tableProperties)
            {
                if (tProp.TableCaption.Val.InnerText.Equals("#FundingTable"))
                {
                    Table fundingTable = (Table)tProp.Parent;
                    foreach (FundingTableVM tr in ftList)
                    {
                        AppendFundingTableLine(fundingTable, false, tr.DeliverableDescription, tr.OneTimeAmount, tr.BaseAmount, RowHeight);
                    }
                    if (DeliverableCount > 1) AppendFundingTableLine(fundingTable, true, "Total", TotalOneTimeAmount, TotalBaseAmount, "500");
                }
            }

        }

        Boolean populateFundingLetter(int ProjectID)
        {
            try
            {
                String LeadName = String.Empty;
                String LeadEmail = String.Empty;
                String LeadPhone = String.Empty;
                String HSPLeadName = String.Empty;
                String HSPLeadFullName = String.Empty;
                String HSPJobTitle = String.Empty;
                String CEOName = String.Empty;
                String PreparedBy = String.Empty;
                String ProgramName = String.Empty;
                String FiscalYear = String.Empty;
                String NextFiscalYear = String.Empty;
                String FundingAmount = String.Empty;
                String NSOneTimeAmount = String.Empty;
                String OneTimeAmount = String.Empty;
                String BaseAmount = String.Empty;
                String BaseAnnualizedAmount = String.Empty;
                String FundingLetterDate = String.Empty;
                String SMTDirector = String.Empty;
                String FundingType = String.Empty;
                String TPBE = String.Empty;
                String FundingDescription = String.Empty;
                String MHSAA = String.Empty;
                String SectorAgreement = String.Empty;
                String AdminLetterRefNo = String.Empty;

                Project pr = UoW.ProjectRepo.GetProjectById(ProjectID);
                FundingDetail pd = UoW.FundingDetailRepo.GetFundingDetailById(ProjectID);

                if (pr != null && pd != null)
                {
                    AdminLetterRefNo = UoW.AdminLetterRepo.GetAdminLetterById(pd.FundingEntityID)?.ReferenceNo;
                    if (pd.TCLHINLeadID != null)
                    {
                        UserProfile USF = UoW.UserProfileRepo.GetUserProfileById((int)pd.TCLHINLeadID);
                        if (USF != null)
                        {
                            LeadName = USF.UserFullName ?? String.Empty;
                            LeadEmail = USF.UserEmailID ?? String.Empty;
                            LeadPhone = USF.UserPhoneNo ?? String.Empty;
                        }
                    }
                    if (fd.FiscalYear != null)
                    {
                        FiscalYear FYR = UoW.FiscalYearRepo.GetFiscalYearById((int)fd.FiscalYear);
                        if (FYR != null)
                        {
                            FiscalYear = FYR.Description.Replace('/', '-');
                            NextFiscalYear = UoW.FiscalYearRepo.GetFiscalYearById((int)fd.FiscalYear + 1)?.Description.Replace('/', '-');
                        }
                    }
                    if (pr.HSPLeadID != null)
                    {
                        UserProfile HUP = UoW.UserProfileRepo.GetUserProfileById((int)pr.HSPLeadID);
                        if (HUP != null)
                        {
                            if (!String.IsNullOrEmpty(HUP.UserSalutation))
                            {
                                HSPLeadName = HUP.UserSalutation + " ";
                                HSPLeadFullName = HUP.UserSalutation + " ";
                            }
                            HSPLeadName = HSPLeadName + (HUP.UserLastName ?? String.Empty);
                            HSPLeadFullName = HSPLeadFullName + (HUP.UserFullName ?? String.Empty);
                            HSPJobTitle = HUP.UserJobTitle ?? String.Empty;
                        }
                    }
                    if (pr.ProgramID != null)
                    {
                        Program PRG = UoW.ProgramRepo.GetProgramById((int)pr.ProgramID);
                        if (PRG != null) ProgramName = PRG.ProgramDescription;
                    }

                    if (pr.TPBEID != null)
                    {
                        TPBE TP = UoW.TPBERepo.GetTPBEById((int)pr.TPBEID);
                        if (TP != null)
                        {
                            TPBE = TP.TPBEShortName;
                            if (TP.SectorID == SystemValues.HospitalSector)
                            {
                                MHSAA = @"H-SAA";
                                SectorAgreement = @"Hospital Service Accountability Agreement";
                            }
                            if (TP.SectorID == SystemValues.LongTermCareHomeSector)
                            {
                                MHSAA = @"L-SAA";
                                SectorAgreement = @"Long-Term Care Home Service Accountability Agreement";
                            }
                            else
                            {
                                MHSAA = @"MSAA";
                                SectorAgreement = @"Multi-Sector Service Accountability Agreement";
                            }
                        }
                    }

                    if (fl.LHINSignatureID != null)
                    {
                        UserProfile UPF = UoW.UserProfileRepo.GetUserProfileById((int)fl.LHINSignatureID);
                        if (UPF != null) CEOName = UPF.UserFullName ?? String.Empty;
                    }

                    if (pd.SMTLeadID != null)
                    {
                        UserProfile UPF = UoW.UserProfileRepo.GetUserProfileById((int)pd.SMTLeadID);
                        if (UPF != null) SMTDirector = UPF.UserFullName ?? String.Empty;
                        if (!String.IsNullOrEmpty(UPF.UserJobTitle)) SMTDirector = SMTDirector + ", " + UPF.UserJobTitle;
                    }
                    if (fl.PreparedBy != null)
                    {
                        UserProfile UPF = UoW.UserProfileRepo.GetUserProfileById((int)fl.PreparedBy);
                        if (UPF != null) PreparedBy = UPF.UserFullName ?? String.Empty;
                    }

                    FundingType = UoW.IdentifiedFundingTypeRepo.FundingType(fl.FundingDetailID);
                    //FundingAmount = String.Format("{0:C}", UoW.IdentifiedFundingTypeRepo.TotalOneTimeBaseAllocatdAmount(fd.FundingDetailID));
                    FundingAmount = FormatAmount(fl.FundingAmount);
                    Decimal Amount = UoW.IdentifiedFundingTypeRepo.OneTimePaidAmount(fl.FundingDetailID);
                    if (Amount != 0)
                    {
                        OneTimeAmount = FormatAmount(Amount);
                        NSOneTimeAmount = FormatAmount(Math.Abs(Amount));
                    }
                    Decimal AnnualizedAmount = pr.BaseAnnualizedAmount ?? 0;
                    Amount = UoW.IdentifiedFundingTypeRepo.BasePaidAmount(fl.FundingDetailID);
                    if (AnnualizedAmount != 0 || Amount != 0) BaseAmount = FormatAmount(Amount);
                    if (AnnualizedAmount != 0)
                    {
                        BaseAnnualizedAmount = FormatAmount(Amount);
                        FundingDescription = BaseAmount + ", " + FiscalYear + " Base Funding. Annualized up to " + BaseAnnualizedAmount + " in " + NextFiscalYear;
                    }
                }
                buildFundingTable();
                if (!String.IsNullOrEmpty(CEOName)) removeParaLine(CEOName + @", " + fl.LHINSignatureTitle);
                updateCustomPropertyVTInt32("FundingLetterID", fl.FundingDetailID);
                updateContentControlText("FundingLetterNo", fd.FundingDetailID.ToString("0000000"));
                updateContentControlText("FundingLetterDate", (fl.SendOutDate ?? DateTime.Now).ToString("MMMM dd, yyyy"));
                updateContentControlText("HSPLead", HSPLeadFullName);
                updateContentControlText("HSPName", HSP.Name);
                updateContentControlText("HSPLeadLastName", HSPLeadName);
                updateContentControlText("HSPLeadTitle", HSPJobTitle);
                updateContentControlText("HSPAddress1", HSP.Address1 + ", " + HSP.Address2);
                updateContentControlText("HSPAddress2", HSP.CountyName + ", " + HSP.Province + " " + HSP.PostalCode);
                updateContentControlText("ProjectName", fd.Name);
                updateContentControlText("ProjectCharterDate", fl.FundingLetterCreateDate.ToString("MMMM dd, yyyy"));
                updateContentControlText("MHSAA", MHSAA);
                updateContentControlText("SectorAgreement", SectorAgreement);
                updateContentControlText("LHINLead", LeadName);
                updateContentControlText("LHINLeadPhone", LeadPhone);
                updateContentControlText("CEOName", CEOName);
                updateContentControlText("CEOTitle", fl.LHINSignatureTitle);
                updateContentControlText("FundingType", FundingType);
                updateContentControlText("FundingTypeLCase", FundingType.ToLower());
                updateContentControlText("FiscalYear", FiscalYear);
                updateContentControlText("ProgramName", ProgramName);
                updateContentControlText("Deliverables", fl.FundingLetterDeliverables);
                updateContentControlText("FundingAmount", FundingAmount);
                updateContentControlText("NSOneTimeAmount", NSOneTimeAmount);
                updateContentControlText("OneTimeAmount", OneTimeAmount);
                updateContentControlText("BaseAmount", BaseAmount);
                updateContentControlText("FundingDescription", FundingDescription);
                updateContentControlText("SMTDirector", SMTDirector);
                updateContentControlText("PreparedBy", PreparedBy);
                updateContentControlText("CEOEDSalutation", fl.CEOEDSalutation ?? String.Empty);
                updateContentControlText("CEOEDFirstName", fl.CEOEDFirstName ?? String.Empty);
                updateContentControlText("CEOEDLastName", fl.CEOEDLastName ?? String.Empty);
                updateContentControlText("CEOEDTitle", fl.CEOEDTitle ?? String.Empty);
                updateContentControlText("BoardSalutation", fl.BoardSalutation ?? String.Empty);
                updateContentControlText("BoardFirstName", fl.BoardFirstName ?? String.Empty);
                updateContentControlText("BoardLastName", fl.BoardLastName ?? String.Empty);
                updateContentControlText("BoardTitle", fl.BoardTitle ?? String.Empty);
                updateContentControlText("MPPSalutation", fl.MPPSalutation ?? String.Empty);
                updateContentControlText("MPPFirstName", fl.MPPFirstName ?? String.Empty);
                updateContentControlText("MPPLastName", fl.MPPLastName ?? String.Empty);
                updateContentControlText("MPPArea", fl.MPPArea ?? String.Empty);
                updateContentControlText("Enclosure", fl.Enclosure ?? String.Empty);
                updateContentControlText("AdditionalComment1", fl.AdditionalComment1 ?? String.Empty);
                updateContentControlText("AdditionalComment2", fl.AdditionalComment2 ?? String.Empty);
                updateContentControlText("TPBE", TPBE ?? String.Empty);
                updateContentControlText("CreatedDate", fl.FundingLetterCreateDate.ToString("MMM dd, yyyy"));

                if (String.IsNullOrEmpty(AdminLetterRefNo))
                {
                    updateContentControlText("AdminLetterRefNo", @"@{AdminLetterRefNo@}");
                    removeParaLine(@"@{AdminLetterRefNo@}");
                }
                else updateContentControlText("AdminLetterRefNo", AdminLetterRefNo);

                updateContentControlEmail("LHINLeadEmail", LeadEmail);

                return true;

            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return false;
            }
        }

        public Boolean AddRecipientsToFundingLetter(string path, FundingDetail fundingLetterDetail)
        {
            List<UserProfile> signerList = new List<UserProfile>();
            bool success = false;
            try
            {
                if (fundingLetterDetail.SigningChiefRegionalOfficer != null)
                {
                    UserProfile signingChiefRegionalOfficer = UoW.UserProfileRepo.GetUserProfileById((int)fundingLetterDetail.SigningChiefRegionalOfficer);
                    if (signingChiefRegionalOfficer.UserEmailID != null || signingChiefRegionalOfficer.UserEmailID.Length > 0)
                    {
                        signerList.Add(signingChiefRegionalOfficer);
                    }
                }

                if (fundingLetterDetail.SigningVicePresident != null)
                {
                    UserProfile signingVicePresident = UoW.UserProfileRepo.GetUserProfileById((int)fundingLetterDetail.SigningVicePresident);
                    if (signingVicePresident.UserEmailID != null || signingVicePresident.UserEmailID.Length > 0)
                    {
                        signerList.Add(signingVicePresident);
                    }
                }

                if (fundingLetterDetail.SigningDirector != null)
                {
                    UserProfile signingDirector = UoW.UserProfileRepo.GetUserProfileById((int)fundingLetterDetail.SigningDirector);
                    if (signingDirector.UserEmailID != null || signingDirector.UserEmailID.Length > 0)
                    {
                        signerList.Add(signingDirector);
                    }
                }

                using (WordprocessingDocument doc = WordprocessingDocument.Open(path, true))
                {
                    String text = "";
                    Body body = doc.MainDocumentPart.Document.Body;
                    IEnumerable<Paragraph> paragraphs = body.Descendants<Paragraph>();
                    List<string> pData = new List<string>();
                    foreach (Paragraph p in paragraphs)
                    {

                        if (p.InnerText.Contains("*signature_"))
                        {

                            IEnumerable<Run> runs = p.Descendants<Run>();
                            if (runs != null)
                            {
                                foreach (Run r in runs)
                                {
                                    if (r.InnerText == "*")
                                    {
                                        string innertext = r.InnerText.Replace("*", " ");
                                        r.RemoveAllChildren<Text>();
                                        r.AppendChild(new Text(innertext));
                                    }
                                    if (r.InnerText == "*signature_1*")
                                    {
                                        string innertext = r.InnerText.Replace("*signature_1*", " ");
                                        r.RemoveAllChildren<Text>();
                                        r.AppendChild(new Text(innertext));
                                    }

                                    if (r.InnerText == "*signature_1")
                                    {
                                        string innertext = r.InnerText.Replace("*signature_1", " ");
                                        r.RemoveAllChildren<Text>();
                                        r.AppendChild(new Text(innertext));
                                    }

                                    if (r.InnerText == "signature")
                                    {
                                        string innertext = r.InnerText.Replace("signature", " ");
                                        r.RemoveAllChildren<Text>();
                                        r.AppendChild(new Text(innertext));
                                    }
                                    if (r.InnerText == "_1")
                                    {
                                        string innertext = r.InnerText.Replace("_1", " ");
                                        r.RemoveAllChildren<Text>();
                                        r.AppendChild(new Text(innertext));
                                    }
                                    if (r.InnerText == "_1*")
                                    {
                                        string innertext = r.InnerText.Replace("_1*", " ");
                                        r.RemoveAllChildren<Text>();
                                        r.AppendChild(new Text(innertext));
                                    }
                                }
                            }
                            Run run = p.AppendChild(new Run());
                            run.AppendChild(new RunProperties(new RunFonts() { Ascii = "Calibri (Body)" }, new FontSize { Val = "22" }));
                            Text FullName = new Text();
                            Text Position = new Text();
                            Text Location = new Text();
                            if (signerList.Count > 0)
                            {
                                int SignitureNumber = signerList.Count;
                                foreach (UserProfile item in signerList)
                                {
                                    FullName = new Text(item.UserSalutation + " " + item.UserFullName);
                                    Position = new Text(item.UserJobTitle);
                                    Location = new Text(item.UserCompany);
                                    if (!String.IsNullOrEmpty(FullName.ToString()))
                                    {

                                        run.AppendChild(new Break());
                                        run.AppendChild(new RunProperties(new Color() { Val = "FFFFFF" }));
                                        run.AppendChild(new Text("*signature_" + SignitureNumber.ToString() + "*"));
                                        run.AppendChild(new Break());
                                        run.AppendChild(new Break());
                                        run.AppendChild(new RunProperties(new Color() { Val = "000000" }));
                                        run.AppendChild(FullName);
                                        if (!String.IsNullOrEmpty(Position.ToString()))
                                        {
                                            run.AppendChild(new Break());
                                            run.AppendChild(Position);
                                        }
                                        if (!String.IsNullOrEmpty(Location.ToString()))
                                        {
                                            run.AppendChild(new Break());
                                            run.AppendChild(Location);
                                        }
                                    }
                                    run.AppendChild(new Break());
                                    SignitureNumber--;
                                }
                            }
                        }
                    }
                    doc.MainDocumentPart.Document.Save();
                }
                success = true;
            }
            catch (Exception ex)
            {
                success = false;
                Log.Error("Error in adding recipients into the funding letter /" + ex.Message);
            }
            return success;
        }
    }

}