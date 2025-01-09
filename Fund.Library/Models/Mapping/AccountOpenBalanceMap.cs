using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HFund.EF.Library.Models.Mapping
{
    public class AccountOpenBalanceMap : EntityTypeConfiguration<AccountOpenBalance>
    {
        public AccountOpenBalanceMap()
        {
            // Primary Key
            this.HasKey(t => t.AccountOpenBalanceID);

            // Properties
            this.Property(t => t.CreatedBy)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.UpdatedBy)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("AccountOpenBalance");
            this.Property(t => t.AccountOpenBalanceID).HasColumnName("AccountOpenBalanceID");
            this.Property(t => t.AccountID).HasColumnName("AccountID");
            this.Property(t => t.FiscalYear).HasColumnName("FiscalYear");
            this.Property(t => t.SAASectorID).HasColumnName("SAASectorID");
            this.Property(t => t.RevenueLineID).HasColumnName("RevenueLineID");
            this.Property(t => t.TPBEID).HasColumnName("TPBEID");
            this.Property(t => t.OpenBalance).HasColumnName("OpenBalance");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");
            this.Property(t => t.CreatedBy).HasColumnName("CreatedBy");
            this.Property(t => t.UpdatedDate).HasColumnName("UpdatedDate");
            this.Property(t => t.UpdatedBy).HasColumnName("UpdatedBy");

            // Relationships
            this.HasRequired(t => t.Account)
                .WithMany(t => t.AccountOpenBalances)
                .HasForeignKey(d => d.AccountID);
            this.HasRequired(t => t.FiscalYear1)
                .WithMany(t => t.AccountOpenBalances)
                .HasForeignKey(d => d.FiscalYear);
            this.HasOptional(t => t.RevenueLine)
                .WithMany(t => t.AccountOpenBalances)
                .HasForeignKey(d => d.RevenueLineID);
            this.HasRequired(t => t.SAASector)
                .WithMany(t => t.AccountOpenBalances)
                .HasForeignKey(d => d.SAASectorID);
            this.HasOptional(t => t.TPBE)
                .WithMany(t => t.AccountOpenBalances)
                .HasForeignKey(d => d.TPBEID);

        }
    }
}
