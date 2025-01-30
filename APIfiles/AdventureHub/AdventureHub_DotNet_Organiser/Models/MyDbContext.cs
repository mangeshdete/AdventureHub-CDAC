using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AdventureHub.Models
{
    public partial class MyDbContext : DbContext
    {
        public MyDbContext()
        {
        }

        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Event> Events { get; set; } = null!;
        public virtual DbSet<Eventregistration> Eventregistrations { get; set; } = null!;
        public virtual DbSet<Organiser> Organisers { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Paymentmode> Paymentmodes { get; set; } = null!;
        public virtual DbSet<Publishevent> Publishevents { get; set; } = null!;
        public virtual DbSet<Rating> Ratings { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Securityquestion> Securityquestions { get; set; } = null!;
        public virtual DbSet<State> States { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Tej@s2002;database=p14_adventurehub", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Categoryname)
                    .HasMaxLength(50)
                    .HasColumnName("categoryname");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("cities");

                entity.HasIndex(e => e.Stateid, "stateid_fk");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Cityname)
                    .HasMaxLength(50)
                    .HasColumnName("cityname");

                entity.Property(e => e.Stateid).HasColumnName("stateid");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.Stateid)
                    .HasConstraintName("stateid_fk");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Custid)
                    .HasName("PRIMARY");

                entity.ToTable("customers");

                entity.HasIndex(e => e.Cityid, "city_id_fk");

                entity.HasIndex(e => e.Userid, "userid_fk");

                entity.Property(e => e.Custid).HasColumnName("custid");

                entity.Property(e => e.Aadhaar)
                    .HasMaxLength(16)
                    .HasColumnName("aadhaar");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Dob)
                    .HasColumnName("dob")
                    .HasDefaultValueSql("'2000-12-12'");

                entity.Property(e => e.Fname)
                    .HasMaxLength(100)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(100)
                    .HasColumnName("lname");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .HasColumnName("pincode");

                entity.Property(e => e.Street)
                    .HasMaxLength(100)
                    .HasColumnName("street");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.Cityid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("city_id_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("userid_fk");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("events");

                entity.HasIndex(e => e.Categoryid, "catid_fk");

                entity.Property(e => e.Eventid).HasColumnName("eventid");

                entity.Property(e => e.Categoryid).HasColumnName("categoryid");

                entity.Property(e => e.Eventname)
                    .HasMaxLength(50)
                    .HasColumnName("eventname");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.Categoryid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("catid_fk");
            });

            modelBuilder.Entity<Eventregistration>(entity =>
            {
                entity.HasKey(e => e.Registrationid)
                    .HasName("PRIMARY");

                entity.ToTable("eventregistrations");

                entity.HasIndex(e => e.Custid, "eventregistrations_cust_id_fk");

                entity.HasIndex(e => e.Publishid, "eventregistrations_publish_id_fk");

                entity.Property(e => e.Registrationid).HasColumnName("registrationid");

                entity.Property(e => e.Custid).HasColumnName("custid");

                entity.Property(e => e.Participants).HasColumnName("participants");

                entity.Property(e => e.Publishid).HasColumnName("publishid");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Eventregistrations)
                    .HasForeignKey(d => d.Custid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("eventregistrations_cust_id_fk");

                entity.HasOne(d => d.Publish)
                    .WithMany(p => p.Eventregistrations)
                    .HasForeignKey(d => d.Publishid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("eventregistrations_publish_id_fk");
            });

            modelBuilder.Entity<Organiser>(entity =>
            {
                entity.ToTable("organisers");

                entity.HasIndex(e => e.Cityid, "org_city_id_fk");

                entity.HasIndex(e => e.Userid, "org_userid_fk");

                entity.Property(e => e.Organiserid).HasColumnName("organiserid");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Gst)
                    .HasMaxLength(100)
                    .HasColumnName("gst");

                entity.Property(e => e.Orgname)
                    .HasMaxLength(100)
                    .HasColumnName("orgname");

                entity.Property(e => e.Pancard)
                    .HasMaxLength(12)
                    .HasColumnName("pancard");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .HasColumnName("pincode");

                entity.Property(e => e.Rating)
                    .HasPrecision(2, 1)
                    .HasColumnName("rating");

                entity.Property(e => e.Street)
                    .HasMaxLength(100)
                    .HasColumnName("street");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Organisers)
                    .HasForeignKey(d => d.Cityid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("org_city_id_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Organisers)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("org_userid_fk");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("payments");

                entity.HasIndex(e => e.Paymentmodeid, "payments_modeid_fk");

                entity.HasIndex(e => e.Registrationid, "payments_regid_fk");

                entity.Property(e => e.Paymentid).HasColumnName("paymentid");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Date)
                    .HasColumnType("timestamp")
                    .HasColumnName("date");

                entity.Property(e => e.Paymentmodeid).HasColumnName("paymentmodeid");

                entity.Property(e => e.Paymentstatus)
                    .HasColumnType("enum('SUCCESSFULL','FAILED')")
                    .HasColumnName("paymentstatus");

                entity.Property(e => e.Registrationid).HasColumnName("registrationid");

                entity.HasOne(d => d.Paymentmode)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Paymentmodeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("payments_modeid_fk");

                entity.HasOne(d => d.Registration)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Registrationid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("payments_regid_fk");
            });

            modelBuilder.Entity<Paymentmode>(entity =>
            {
                entity.ToTable("paymentmode");

                entity.Property(e => e.Paymentmodeid).HasColumnName("paymentmodeid");

                entity.Property(e => e.Paymentmodename)
                    .HasMaxLength(20)
                    .HasColumnName("paymentmodename");
            });

            modelBuilder.Entity<Publishevent>(entity =>
            {
                entity.HasKey(e => e.Publishid)
                    .HasName("PRIMARY");

                entity.ToTable("publishevents");

                entity.HasIndex(e => e.Cityid, "publishevent_city_id_fk");

                entity.HasIndex(e => e.Eventid, "publishevent_eventid_fk");

                entity.HasIndex(e => e.Organiserid, "publishevent_orgid_fk");

                entity.Property(e => e.Publishid).HasColumnName("publishid");

                entity.Property(e => e.Capacity).HasColumnName("capacity");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Eventdate).HasColumnName("eventdate");

                entity.Property(e => e.Eventid).HasColumnName("eventid");

                entity.Property(e => e.Eventtime)
                    .HasColumnType("time")
                    .HasColumnName("eventtime");

                entity.Property(e => e.Organiserid).HasColumnName("organiserid");

                entity.Property(e => e.Pincode)
                    .HasMaxLength(6)
                    .HasColumnName("pincode");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('ACTIVE','PROCESSING','CANCELLED','COMPLETED')")
                    .HasColumnName("status");

                entity.Property(e => e.Street)
                    .HasMaxLength(100)
                    .HasColumnName("street");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Publishevents)
                    .HasForeignKey(d => d.Cityid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("publishevent_city_id_fk");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Publishevents)
                    .HasForeignKey(d => d.Eventid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("publishevent_eventid_fk");

                entity.HasOne(d => d.Organiser)
                    .WithMany(p => p.Publishevents)
                    .HasForeignKey(d => d.Organiserid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("publishevent_orgid_fk");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.ToTable("ratings");

                entity.HasIndex(e => e.Custid, "fk_cust_id");

                entity.HasIndex(e => e.Orgid, "fk_org_id");

                entity.Property(e => e.Ratingid).HasColumnName("ratingid");

                entity.Property(e => e.Custid).HasColumnName("custid");

                entity.Property(e => e.Orgid).HasColumnName("orgid");

                entity.Property(e => e.Rating1)
                    .HasPrecision(2, 1)
                    .HasColumnName("rating");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.Custid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_cust_id");

                entity.HasOne(d => d.Org)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.Orgid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_org_id");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Rolename)
                    .HasMaxLength(50)
                    .HasColumnName("rolename");
            });

            modelBuilder.Entity<Securityquestion>(entity =>
            {
                entity.HasKey(e => e.Qid)
                    .HasName("PRIMARY");

                entity.ToTable("securityquestions");

                entity.Property(e => e.Qid).HasColumnName("qid");

                entity.Property(e => e.Question)
                    .HasMaxLength(255)
                    .HasColumnName("question");
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.ToTable("states");

                entity.Property(e => e.Stateid).HasColumnName("stateid");

                entity.Property(e => e.Statename)
                    .HasMaxLength(50)
                    .HasColumnName("statename");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Roleid, "fk_role_id");

                entity.HasIndex(e => e.Securityqid, "fk_security_qid");

                entity.HasIndex(e => e.Email, "user_email_unique")
                    .IsUnique();

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Contact)
                    .HasMaxLength(15)
                    .HasColumnName("contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Securityqans)
                    .HasMaxLength(100)
                    .HasColumnName("securityqans");

                entity.Property(e => e.Securityqid).HasColumnName("securityqid");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Roleid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_role_id");

                entity.HasOne(d => d.Securityq)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Securityqid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_security_qid");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
