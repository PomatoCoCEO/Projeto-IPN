using AutoMapper;
using Hg.Data;
using Hg.Data.DbData;
using Hg.Data.Stats;
using Hg.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Controllers
{
    [Route("api/[controller]/")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<HgUser> _signInManager;
        private readonly UserManager<HgUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env; 
        private readonly IHgRepository _repository;

        public UserController(ILogger<AccountController> logger,
            SignInManager<HgUser> signInManager,
            UserManager<HgUser> userManager,
            IConfiguration configuration, IMapper mapper, IWebHostEnvironment env, IHgRepository repository)
        {
            _signInManager = signInManager;
            _logger = logger;
            _userManager = userManager;
            _configuration = configuration;
            _mapper = mapper;
            _env = env;
            _repository = repository;
        }

        [HttpGet]
        [Authorize(Roles = "Manager")]
        [Route("programmers/prog")]
        public IActionResult GetProgrammers()
        {
            try
            {
                return Ok(_repository.GetProgrammers());
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e.Message);
            }
        }

        [HttpGet]
        [Route("{username}")]
        public async Task<IActionResult> GetUserDetails(string username)
        {
            var pr = await _userManager.FindByNameAsync(username);
            var ans = new UserDetails();
            if (pr!=null) ans.info = _mapper.Map<UserViewModel>(pr);
            else return BadRequest("Invalid request: the user does not exist");
            ans.info.RoleNames = new List<string>();
            if (await _userManager.IsInRoleAsync(pr, "Programmer"))
            {
                ans.programmerStats = _repository.GetProgrammerStats(pr);
                ans.info.RoleNames.Add("Programmer");
            }
            if (await _userManager.IsInRoleAsync(pr, "Manager"))
            {
               ans.managerStats = _repository.GetManagerStats(pr);
                ans.info.RoleNames.Add("Manager");
            }
            return Ok(ans);
        }




    }
    
}
