using Hg.Data.DbData;
using Hg.Data.Stats;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data
{
    public class HgRepository : IHgRepository
    {
        private readonly HgContext _ctx;
        private readonly UserManager<HgUser> _userManager;
        private readonly ILogger<HgRepository> _logger;
        public HgRepository(HgContext ctx, UserManager<HgUser> userManager, ILogger<HgRepository> logger)
        {
            _ctx = ctx;
            _userManager = userManager;
            _logger = logger;
        }

        public int CreateProject(Project project)
        {
            _ctx.Add(project);
            return _ctx.SaveChanges();
        }

        public int SetTaskFinished(int tskId, string username)
        {
            var tsk = _ctx.Tasks.Where(t => t.Id == tskId).Include(t => t.Programmer).FirstOrDefault();
            if (tsk == null) return -1; // NOT FOUND
            if (tsk.Deadline < new DateTime()) return -2; // TOO LATE
            if (tsk.Finished) return -3; // ALREADY FINISHED
            if (tsk.Programmer.UserName != username) return -4; // NOT ASSIGNED TO THIS USER
            tsk.Finished = true;
            _ctx.Update(tsk);
            return _ctx.SaveChanges();
        }

        public Project GetProject(int id) // project details
        {
            return _ctx.Projects.Where(p => p.Id == id).Include(p => p.Tasks).ThenInclude(t => t.Programmer).Include(p => p.Manager).FirstOrDefault();
        }

        public IEnumerable<Project> GetProjects(string username)
        {
            return _ctx.Projects.Where(p => p.Manager.UserName == username).Include(p => p.Tasks).ThenInclude(t => t.Programmer).Include(p => p.Manager).ToList();
        }

        public IEnumerable<ProjTask> GetTasks(string username)
        {
            return _ctx.Tasks.Where(p => p.Programmer.UserName == username).Include(t => t.Project).ThenInclude(p =>p.Tasks).ToList();
        }

        public IEnumerable<ProjTask> GetTasksByProject(int projId)
        {
            return _ctx.Tasks.Where(t => t.Project.Id == projId).Include(t => t.Programmer).ToList();
        }

        public ProjTask GetTask(string username, int taskId)
        {
            return _ctx.Tasks.Where(t => t.Programmer.UserName == username && t.Id == taskId).Include(p => p.Project).FirstOrDefault();
        }


        public int UpdateProject(Project project, int id, string username)
        {
            var pr = _ctx.Projects.Where(p => p.Id == id).FirstOrDefault();
            if (pr == null) return -1;
            if (pr.Manager.UserName != username) return -2;
            // pr = project; pr.Id = id;
            pr.Description = project.Description;
            pr.Budget = project.Budget;
            pr.Tasks = project.Tasks;
            pr.Title = project.Title;
            _ctx.Update(pr);
            return _ctx.SaveChanges();
        }

        public ProgrammerStats GetProgrammerStats(HgUser pr)
        {
            ProgrammerStats ans = new();
            // this should be done in only one DB trip
            ans.TasksAssigned = _ctx.Tasks.Where(t => t.Programmer.Id == pr.Id).Count();
            ans.TasksCompleted = _ctx.Tasks.Where(t => t.Programmer.Id == pr.Id && t.Finished).Count();
            ans.TasksFailed = _ctx.Tasks.Where(t => t.Programmer.Id == pr.Id && !t.Finished && t.Deadline < DateTime.Now).Count();
            return ans;
        }

        public ManagerStats GetManagerStats(HgUser pr)
        {
            ManagerStats ans = new();
            // this should be done in only one DB trip
            ans.NoProjects = _ctx.Projects.Where(p => p.Manager.Id == pr.Id).Count();
            ans.BudgetSum = _ctx.Projects.Where(p => p.Manager.Id == pr.Id).Sum(p => p.Budget);
            return ans;
        }

        public int DeleteProject(int projectId)
        {
            var p = _ctx.Projects.Where(pr => pr.Id == projectId).FirstOrDefault();
            _ctx.Projects.Remove(p);
            return _ctx.SaveChanges();
        }

        public IEnumerable<string> GetProgrammers()
        {
            var c = _ctx.Roles.Where(r => r.Name == "Programmer").FirstOrDefault(); // O(1)
            _logger.LogInformation("c: " + Newtonsoft.Json.JsonConvert.SerializeObject(c));
            var ids = _ctx.UserRoles.Where(ur => ur.RoleId == c.Id).Select(ur => ur.UserId).OrderBy(id => id).ToList(); // O(KN log N)
            _logger.LogInformation("ids: " + Newtonsoft.Json.JsonConvert.SerializeObject(ids));
            // var userNames = _ctx.Users.Where(u => ids.BinarySearch(u.Id) > 0).Select(u => u.UserName).ToList(); // O(KN log N)
            var userNames = _ctx.Users.ToList().Where(u => ids.BinarySearch(u.Id) >= 0).Select(u => u.UserName);
            _logger.LogInformation("userNames: " + Newtonsoft.Json.JsonConvert.SerializeObject(userNames));
            /*from u in _ctx.Users
             where 
                (from i in ids 
                 where i == u.Id 
                 select i)
                 .Count() > 0
            select u.UserName;*/
            return userNames;
        }
    }
}
