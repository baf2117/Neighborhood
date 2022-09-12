namespace neighborhood
{
    using Microsoft.EntityFrameworkCore;

    class NeighborhoodContext : DbContext
    {
        public NeighborhoodContext(DbContextOptions<NeighborhoodContext> options) : base(options)
        {
        }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Visits> Visits { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Profile>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).HasColumnType("varchar(100)");
                entity.Property(p => p.LastName).HasColumnType("varchar(100)");
                entity.Property(p => p.Email).HasColumnType("varchar(100)");
                entity.Property(p => p.UserId).HasColumnType("varchar(100)");
                entity.Property(p => p.Address).HasColumnType("varchar(100)");
                entity.Property(p => p.Flags).HasColumnType("bigint");
                entity.Property(p => p.Phone).HasColumnType("varchar(100)");
                entity.ToTable("Profiles");
            });

            modelBuilder.Entity<Visits>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).HasColumnType("varchar(100)");
                entity.Property(p => p.Phone).HasColumnType("varchar(100)");
                entity.Property(p => p.DPI).HasColumnType("varchar(13)");
                entity.Property(p => p.Date).HasColumnType("datetime2(7))");
                entity.HasOne(p => p.Profile);
                entity.ToTable("Visits");
            });

            modelBuilder.Entity<Notifications>(entity =>
            {
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Description).HasColumnType("varchar(max)");
                entity.HasOne(p => p.Profile);
                entity.ToTable("Notifications");
            });

            modelBuilder.Entity<Profile>().HasIndex(p => p.UserId);
        }
    }
}