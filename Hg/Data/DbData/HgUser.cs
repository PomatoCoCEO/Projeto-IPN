using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data.DbData
{
    public class HgUser : IdentityUser
    {   // já possui Id, password e contactos na classe base
        public string Biography { get; set; }
        public string PhotoFilePath { get; set; }
        public DateTime BirthDate { get; set; }
        public List<Project> Projects { get; set; }
        public List<ProjTask> Tasks { get;set;}
        // public List<Role> Roles { get; set; }
    }
}
