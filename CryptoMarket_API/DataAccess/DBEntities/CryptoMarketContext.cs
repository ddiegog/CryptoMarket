using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DataAccess.DBEntities;

public partial class CryptoMarketContext : DbContext
{
    private IConfiguration _configuration; 
    
    public CryptoMarketContext(DbContextOptions<CryptoMarketContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<GenericType> GenericTypes { get; set; }

    public virtual DbSet<Log> Logs { get; set; }

    public virtual DbSet<Transaction> Transactions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        string? connectionString = _configuration.GetConnectionString("CryptoMarketConnection");
        optionsBuilder.UseSqlServer(connectionString);
    } 

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
            entity.HasKey(e => e.Id).HasName("PK__Transact__3214EC0784C6166A");

            entity.Property(e => e.Date).HasColumnType("date");
            entity.Property(e => e.FromWallet)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.ToWallet)
                .HasMaxLength(40)
                .IsUnicode(false);

            entity.HasOne(d => d.FromWalletNavigation).WithMany(p => p.TransactionFromWalletNavigations)
                .HasForeignKey(d => d.FromWallet)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__FromW__5812160E");

            entity.HasOne(d => d.ToWalletNavigation).WithMany(p => p.TransactionToWalletNavigations)
                .HasForeignKey(d => d.ToWallet)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Transacti__ToWal__59063A47");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Wallet).HasName("PK__Users__BE6DEB893E03C904");

            entity.Property(e => e.Wallet)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.Img)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.LastLogin).HasColumnType("date");
            entity.Property(e => e.Level).HasDefaultValueSql("((0))");
            entity.Property(e => e.Nick).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
