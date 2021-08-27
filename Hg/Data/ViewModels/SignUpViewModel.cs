using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hg.Data.ViewModels
{
    public class SignUpViewModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        // [Required]
        public string Password { get; set; }
        // [Required]
        public List<string> RoleNames { get; set; } // could be chosen with checkboxes
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string Biography { get; set; }
    }
    /*
    public class PostSignup
    {
        public SignUpViewModel signup;
    }*/
}
