using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data.DbData
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(128)]
        public string Title { get; set; }
        [MaxLength(1024)]
        public string Description { get; set; }
        public decimal Budget { get; set; }
        // public List<User> Programmers { get; set; }
        public HgUser Manager { get; set; }
        // [ForeignKey("User")]
        // public int ManagerId { get; set; }
        public List<ProjTask> Tasks { get; set; }

    }
}
