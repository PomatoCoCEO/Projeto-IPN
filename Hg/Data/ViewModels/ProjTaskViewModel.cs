using Hg.Data.DbData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data.ViewModels
{
    public class ProjTaskViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Deadline { get; set; }
        public UserViewModel Programmer { get; set; }
        public bool Finished { get; set; } // db migration is necessary
        public ProjectViewModel Project { get; set; }
    }
}
