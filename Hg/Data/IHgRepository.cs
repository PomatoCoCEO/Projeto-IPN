using Hg.Data.DbData;
using Hg.Data.Stats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data
{
    public interface IHgRepository
    {
        public ProgrammerStats GetProgrammerStats(HgUser pr);
        public ManagerStats GetManagerStats(HgUser pr);
        public IEnumerable<Project> GetProjects(string username);
        public IEnumerable<ProjTask> GetTasks(string username);
        public IEnumerable<ProjTask> GetTasksByProject(int projId);
        public ProjTask GetTask(string username, int taskId);
        public Project GetProject(int id);
        public int CreateProject(Project project);
        public int UpdateProject(Project project, int id, string username);
        public int SetTaskFinished(int tskId, string username);
        public int DeleteProject(int projectId);
        public IEnumerable<string> GetProgrammers();
    }
}
