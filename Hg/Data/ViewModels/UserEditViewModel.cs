using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Data.ViewModels
{
    public class UserEditViewModel
    {
        public SignUpViewModel Data { get; set; }
        public string CurrPassword { get; set; }
    }
}
