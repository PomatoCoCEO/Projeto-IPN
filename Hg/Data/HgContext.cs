using Hg.Data.DbData;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data
{
    public class HgContext : IdentityDbContext<HgUser>
    {
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjTask> Tasks { get; set; }


        private readonly IConfiguration _config;
        public HgContext(IConfiguration config)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // to add configuration strings for connection
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config["ConnectionStrings:HgManagerDb"]);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Project>().HasMany(p => p.Tasks).WithOne(t => t.Project).OnDelete(DeleteBehavior.Cascade);
            base.OnModelCreating(builder);
        }

    }
}
