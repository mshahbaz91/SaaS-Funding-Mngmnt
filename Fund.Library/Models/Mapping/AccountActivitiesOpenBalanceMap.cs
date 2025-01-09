using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HFund.EF.Library.Models.Mapping
{
    public class AccountActivitiesOpenBalanceMap : EntityTypeConfiguration<AccountActivitiesOpenBalance>
    {
        public AccountActivitiesOpenBalanceMap()
        {
            // Primary Key
            this.HasKey(t => t.AccountActivitiesOpenBalanceID);

            // Properties
            this.Property(t => t.CreatedBy)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UpdatedBy)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("AccountActivitiesOpenBalance");
            this.Property(t => t.AccountActivitiesOpenBalanceID).HasColumnName("AccountActivitiesOpenBalanceID");
            this.Property(t => t.AccountID).HasColumnName("AccountID");
            this.Property(t => t.FiscalYear).HasColumnName("FiscalYear");
            this.Property(t => t.FunctionalCenterID).HasColumnName("FunctionalCenterID");
            this.Property(t => t.UnitofMeasureID).HasColumnName("UnitofMeasureID");
            this.Property(t => t.BeginningVolume).HasColumnName("BeginningVolume");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.UpdatedDate).HasColumnName("UpdatedDate");
            this.Property(t => t.UpdatedBy).HasColumnName("UpdatedBy");

            // Relationships
            this.HasRequired(t => t.Account)
                .WithMany(t => t.AccountActivitiesOpenBalances)
                .HasForeignKey(d => d.AccountID);
            this.HasRequired(t => t.FiscalYear1)
                .WithMany(t => t.AccountActivitiesOpenBalances)
                .HasForeignKey(d => d.FiscalYear);
            this.HasRequired(t => t.FunctionalCenter)
                .WithMany(t => t.AccountActivitiesOpenBalances)
                .HasForeignKey(d => d.FunctionalCenterID);
            this.HasRequired(t => t.UnitofMeasure)
                .WithMany(t => t.AccountActivitiesOpenBalances)
                .HasForeignKey(d => d.UnitofMeasureID);

        }
    }
}
