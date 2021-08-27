using Hg.Data.DbData;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data
{
    public class HgSeeder
    {
        private readonly HgContext _ctx;
        private readonly IWebHostEnvironment _env;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<HgUser> _userManager;

        public HgSeeder(HgContext ctx, IWebHostEnvironment env, RoleManager<IdentityRole> roleManager, UserManager<HgUser> userManager)
        {
            _ctx = ctx;
            _env = env;
            _roleManager = roleManager;
            _userManager = userManager;
        }


        public async Task SeedAsync()
        {
            _ctx.Database.EnsureCreated(); // ensuring db creation
            // StoreUser user = await _userManager.FindByEmailAsync("paulo2j@sapo.pt");
            string[] roleNames = { "Manager", "Programmer" }; // role names to consider
            foreach (var name in roleNames) {
                IdentityRole role = await _roleManager.FindByNameAsync(name);
                if (role == null)
                {
                    var newRole = new IdentityRole()
                    {
                        Name = name
                    };
                    var result = await _roleManager.CreateAsync(newRole);
                    if (result != IdentityResult.Success)
                    {
                        throw new InvalidOperationException("Could not create new role"+name+" in seeder");
                    }
                }
            }
            var users = new List<HgUser>();
            string[] programmers = { "gennady", "tourist" };
            foreach(var name in programmers)
            {
                HgUser user = await _userManager.FindByNameAsync(name);
                if(user == null)
                {
                    user = new HgUser()
                    {
                        UserName = name,
                        Email = name+"@gmail.com",
                        BirthDate = new DateTime(2001,12,12),
                        PhotoFilePath= "/Photos/anonymous/no_photo.jpg"
                    };
                    await _userManager.CreateAsync(user, "P@ssw0rd!");
                    await _userManager.AddToRoleAsync(user, "Programmer");
                }
                users.Add(user);
            }
            string[] managers = { "gates", "santos" };
            foreach(var name in managers)
            {
                HgUser user = await _userManager.FindByNameAsync(name);
                if (user == null)
                {
                    user = new HgUser()
                    {
                        UserName = name,
                        Email = name + "@topmanager.com",
                        BirthDate = new DateTime(1975, 12, 12),
                        PhotoFilePath= "/Photos/anonymous/no_photo.jpg"
                    };
                    await _userManager.CreateAsync(user, "P@ssw0rd!");
                    await _userManager.AddToRoleAsync(user, "Manager");
                    
                }
                users.Add(user);
            }

            var p1 = new Project()
            {
                Title = "Race Manager",
                Description = "OS Project: handle concurrency andshared memory",
                Budget = 200.00M,
                Tasks = {},
                Manager = users[2]
            };
            p1.Tasks = new List<ProjTask>(){
                new ProjTask()
                {
                    Title = "Plan Planning",
                    Description = "First Meeting",
                    Deadline = new DateTime(2021, 9, 1),
                    Finished = false,
                    Programmer = users[0],
                    Project = p1
                },
                    new ProjTask()
                    {
                        Title = "Draw Diagram",
                        Description = "Draw Sync Diagram",
                        Deadline = new DateTime(2021, 9, 6),
                        Finished = false,
                        Programmer = users[1],
                        Project = p1
                    }
            };
            var p2 = new Project()
            {
                Title = "Network Messaging App",
                Description = "Networks Project: handle sockets and multicast",
                Budget = 500.00M,
                Tasks =
                {
                   
                }, Manager =users[3]
            };
            p2.Tasks = new List<ProjTask>()
            {
                 new ProjTask()
                    {
                        Title="Plan Planning",
                        Description="First Meeting - Outline work distribution",
                        Deadline=new DateTime(2021, 6, 2),
                        Finished = false,
                        Programmer = users[1]
                    },
                    new ProjTask()
                    {
                        Title="Finish Project",
                        Description="Implement multicast and deliver code and report",
                        Deadline=new DateTime(2021, 9, 6),
                        Finished = false,
                        Programmer = users[0]
                    }
            };
            _ctx.Projects.Add(p1);
            _ctx.Projects.Add(p2);
            _ctx.SaveChanges();
        }
    }
}
