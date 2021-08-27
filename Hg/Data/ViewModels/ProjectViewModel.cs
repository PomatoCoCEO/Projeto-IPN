using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data.ViewModels
{
    public class ProjectViewModel
    {
        public int Id { get; set; }
        [MaxLength(128)]
        public string Title { get; set; }
        [MaxLength(1024)]
        public string Description { get; set; }
        public decimal Budget { get; set; }
        public UserViewModel Manager { get; set; }
        public List<ProjTaskViewModel> Tasks { get; set; }
    }
}
