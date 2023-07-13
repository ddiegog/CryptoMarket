using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CryptoMarket_API.DBEntities;

public partial class CryptoMarketContext : DbContext
{
    public CryptoMarketContext()
    {
    }

    public CryptoMarketContext(DbContextOptions<CryptoMarketContext> options)
        : base(options)
    {
    }

    public virtual DbSet<GenericType> GenericTypes { get; set; }

    public virtual DbSet<Log> Logs { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GenericType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__GenericT__3214EC0781F613AA");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Log>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Logs__3214EC0769FB0966");

            entity.Property(e => e.Text).HasColumnType("ntext");
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Transact__3214EC07B9E6CAC7");

            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.FromWallet)
                .HasMaxLength(42)
                .IsUnicode(false);
            entity.Property(e => e.Message)
                .HasMaxLength(250)
                .IsUnicode(false);
            entity.Property(e => e.ToWallet)
                .HasMaxLength(42)
                .IsUnicode(false);

            entity.HasOne(d => d.FromWalletNavigation).WithMany(p => p.TransactionFromWalletNavigations)
                .HasForeignKey(d => d.FromWallet)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__FromW__6C190EBB");

            entity.HasOne(d => d.ToWalletNavigation).WithMany(p => p.TransactionToWalletNavigations)
                .HasForeignKey(d => d.ToWallet)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__ToWal__6D0D32F4");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Wallet).HasName("PK__Users__BE6DEB8982D56053");

            entity.Property(e => e.Wallet)
                .HasMaxLength(42)
                .IsUnicode(false);
            entity.Property(e => e.Active)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.Img)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LastLogin).HasColumnType("datetime2");
            entity.Property(e => e.Level).HasDefaultValueSql("((0))");
            entity.Property(e => e.Nick).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
