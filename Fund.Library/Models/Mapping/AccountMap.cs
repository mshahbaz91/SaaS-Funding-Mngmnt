using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HFund.EF.Library.Models.Mapping
{
    public class AccountMap : EntityTypeConfiguration<Account>
    {
        public AccountMap()
        {
            // Primary Key
            this.HasKey(t => t.AccountID);

            // Properties
            this.Property(t => t.AccountNumber)
                .HasMaxLength(20);

            this.Property(t => t.OrganizationtypeName)
                .HasMaxLength(4000);

            this.Property(t => t.Name)
                .HasMaxLength(200);

            this.Property(t => t.TerritoryName)
                .HasMaxLength(200);

            this.Property(t => t.CountyName)
                .HasMaxLength(100);

            this.Property(t => t.SectorName)
                .HasMaxLength(100);

            this.Property(t => t.SubsectorName)
                .HasMaxLength(100);

            this.Property(t => t.ParentAccountName)
                .HasMaxLength(200);

            this.Property(t => t.CreatedBy)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UpdatedBy)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Address1)
                .HasMaxLength(500);

            this.Property(t => t.Address2)
                .HasMaxLength(500);

            this.Property(t => t.Province)
                .HasMaxLength(50);

            this.Property(t => t.PostalCode)
                .HasMaxLength(10);

            this.Property(t => t.BoardSalutation)
                .HasMaxLength(50);

            this.Property(t => t.BoardFirstName)
                .HasMaxLength(50);

            this.Property(t => t.BoardLastName)
                .HasMaxLength(50);

            this.Property(t => t.BoardTitle)
                .HasMaxLength(150);

            this.Property(t => t.BoardEmail)
                .HasMaxLength(50);

            this.Property(t => t.CEOEDSalutation)
                .HasMaxLength(50);

            this.Property(t => t.CEOEDFirstName)
                .HasMaxLength(50);

            this.Property(t => t.CEOEDLastName)
                .HasMaxLength(50);

            this.Property(t => t.CEOEDTitle)
                .HasMaxLength(150);

            this.Property(t => t.CEOEDEmail)
                .HasMaxLength(50);

            this.Property(t => t.PhoneNo)
                .HasMaxLength(25);

            this.Property(t => t.FaxNo)
                .HasMaxLength(25);

            this.Property(t => t.AlternateEmail)
                .HasMaxLength(150);

            this.Property(t => t.AlternatePhoneNo)
                .HasMaxLength(150);

            this.Property(t => t.MPPSalutation)
                .HasMaxLength(50);

            this.Property(t => t.MPPFirstName)
                .HasMaxLength(50);

            this.Property(t => t.MPPLastName)
                .HasMaxLength(50);

            this.Property(t => t.MPPArea)
                .HasMaxLength(100);

            this.Property(t => t.FinanceMGRCFO)
                .HasMaxLength(500);

            this.Property(t => t.BoardPhoneNo)
                .HasMaxLength(25);

            this.Property(t => t.BoardFaxNo)
                .HasMaxLength(25);

            this.Property(t => t.CEOEDPhoneNo)
                .HasMaxLength(25);

            this.Property(t => t.CEOEDFaxNo)
                .HasMaxLength(25);

            this.Property(t => t.MPPPhoneNo)
                .HasMaxLength(25);

            this.Property(t => t.MPPFaxNo)
                .HasMaxLength(25);

            this.Property(t => t.MPPEmail)
                .HasMaxLength(50);

            this.Property(t => t.CEOEDFullName)
                .HasMaxLength(101);

            // Table & Column Mappings
            this.ToTable("Account");
            this.Property(t => t.AccountID).HasColumnName("AccountID");
            this.Property(t => t.AccountNumber).HasColumnName("AccountNumber");
            this.Property(t => t.OrganizationType).HasColumnName("OrganizationType");
            this.Property(t => t.OrganizationtypeName).HasColumnName("OrganizationtypeName");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.TerritoryName).HasColumnName("TerritoryName");
            this.Property(t => t.CountyName).HasColumnName("CountyName");
            this.Property(t => t.SectorName).HasColumnName("SectorName");
            this.Property(t => t.SubsectorName).HasColumnName("SubsectorName");
            this.Property(t => t.ParentAccountName).HasColumnName("ParentAccountName");
            this.Property(t => t.LHIN_AccountId).HasColumnName("LHIN_AccountId");
            this.Property(t => t.LHIN_TerritoryId).HasColumnName("LHIN_TerritoryId");
            this.Property(t => t.LHIN_CountyID).HasColumnName("LHIN_CountyID");
            this.Property(t => t.LHIN_SectorId).HasColumnName("LHIN_SectorId");
            this.Property(t => t.LHIN_SubsectorID).HasColumnName("LHIN_SubsectorID");
            this.Property(t => t.LHIN_ParentAccountId).HasColumnName("LHIN_ParentAccountId");
            this.Property(t => t.LHIN_ModifiedOn).HasColumnName("LHIN_ModifiedOn");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.UpdatedDate).HasColumnName("UpdatedDate");
            this.Property(t => t.UpdatedBy).HasColumnName("UpdatedBy");
            this.Property(t => t.Address1).HasColumnName("Address1");
            this.Property(t => t.Address2).HasColumnName("Address2");
            this.Property(t => t.Province).HasColumnName("Province");
            this.Property(t => t.PostalCode).HasColumnName("PostalCode");
            this.Property(t => t.FundingLetterTemplateID).HasColumnName("FundingLetterTemplateID");
            this.Property(t => t.BoardSalutation).HasColumnName("BoardSalutation");
            this.Property(t => t.BoardFirstName).HasColumnName("BoardFirstName");
            this.Property(t => t.BoardLastName).HasColumnName("BoardLastName");
            this.Property(t => t.BoardTitle).HasColumnName("BoardTitle");
            this.Property(t => t.BoardEmail).HasColumnName("BoardEmail");
            this.Property(t => t.CEOEDSalutation).HasColumnName("CEOEDSalutation");
            this.Property(t => t.CEOEDFirstName).HasColumnName("CEOEDFirstName");
            this.Property(t => t.CEOEDLastName).HasColumnName("CEOEDLastName");
            this.Property(t => t.CEOEDTitle).HasColumnName("CEOEDTitle");
            this.Property(t => t.CEOEDEmail).HasColumnName("CEOEDEmail");
            this.Property(t => t.PhoneNo).HasColumnName("PhoneNo");
            this.Property(t => t.FaxNo).HasColumnName("FaxNo");
            this.Property(t => t.PreferredFormContact).HasColumnName("PreferredFormContact");
            this.Property(t => t.PLSCopy).HasColumnName("PLSCopy");
            this.Property(t => t.AlternateContact).HasColumnName("AlternateContact");
            this.Property(t => t.AlternateEmail).HasColumnName("AlternateEmail");
            this.Property(t => t.AlternatePhoneNo).HasColumnName("AlternatePhoneNo");
            this.Property(t => t.MPPSalutation).HasColumnName("MPPSalutation");
            this.Property(t => t.MPPFirstName).HasColumnName("MPPFirstName");
            this.Property(t => t.MPPLastName).HasColumnName("MPPLastName");
            this.Property(t => t.MPPArea).HasColumnName("MPPArea");
            this.Property(t => t.FinanceMGRCFO).HasColumnName("FinanceMGRCFO");
            this.Property(t => t.BoardPhoneNo).HasColumnName("BoardPhoneNo");
            this.Property(t => t.BoardFaxNo).HasColumnName("BoardFaxNo");
            this.Property(t => t.CEOEDPhoneNo).HasColumnName("CEOEDPhoneNo");
            this.Property(t => t.CEOEDFaxNo).HasColumnName("CEOEDFaxNo");
            this.Property(t => t.MPPPhoneNo).HasColumnName("MPPPhoneNo");
            this.Property(t => t.MPPFaxNo).HasColumnName("MPPFaxNo");
            this.Property(t => t.DistrictID).HasColumnName("DistrictID");
            this.Property(t => t.MPPEmail).HasColumnName("MPPEmail");
            this.Property(t => t.CEOEDFullName).HasColumnName("CEOEDFullName");
            this.Property(t => t.SubRegionID).HasColumnName("SubRegionID");

            // Relationships
            this.HasOptional(t => t.District)
                .WithMany(t => t.Accounts)
                .HasForeignKey(d => d.DistrictID);
            this.HasOptional(t => t.FundingLetterTemplate)
                .WithMany(t => t.Accounts)
                .HasForeignKey(d => d.FundingLetterTemplateID);
            this.HasOptional(t => t.SubRegion)
                .WithMany(t => t.Accounts)
                .HasForeignKey(d => d.SubRegionID);

        }
    }
}
