using AutoMapper;
using Hg.Data.DbData;
using Hg.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hg.Data
{
    public class HgMapper : Profile
    {
        public HgMapper()
        {
            CreateMap<SignUpViewModel, HgUser>().ReverseMap();
            CreateMap<ProjTaskViewModel, ProjTask>().ReverseMap();
            CreateMap<ProjectViewModel, Project>().ReverseMap();
            CreateMap<HgUser, UserViewModel>().ReverseMap();
        }
    }
}
