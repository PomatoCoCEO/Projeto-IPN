using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data.ViewModels
{
    public class UserViewModel
    {
        public string Username { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<string> RoleNames { get; set; } // could be chosen with checkboxes
        public string Biography { get; set; }
        public string PhotoFilePath { get; set; }
    }
}
