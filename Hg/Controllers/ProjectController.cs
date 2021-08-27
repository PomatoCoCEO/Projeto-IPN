using AutoMapper;
using Hg.Data;
using Hg.Data.DbData;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hg.Data.ViewModels;

namespace Hg.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    // [Authorize(Roles = "Manager")]
    public class ProjectController : ControllerBase
    {
        private readonly IHgRepository _repository;

        private readonly ILogger<ProjectController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<HgUser> _userManager;
        // private readonly RoleManager<IdentityRole> _roleManager;


        public ProjectController(IHgRepository repository,
            ILogger<ProjectController> logger,
            IMapper mapper,
            UserManager<HgUser> userManager)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetProjects()
        { 
            var username = User.Identity.Name;
            try
            {
                return Ok(_mapper.Map<IEnumerable<ProjectViewModel> >(_repository.GetProjects(username)));
            } catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }

        [HttpGet]
        [Route("projects/{projectId}")]
        public IActionResult GetProject(int projectId)
        {
            try
            {
                return Ok(_mapper.Map<ProjectViewModel>(_repository.GetProject(projectId)));
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Manager")]
        [Route("new")]
        public async Task<IActionResult> CreateProject([FromBody] ProjectViewModel model)
        {
            var project = _mapper.Map<Project>(model);
            project.Manager = await _userManager.FindByNameAsync(User.Identity.Name);
            List<string> invalidProgrammers = new List<string>();
            List<string> inexistent = new List<string>();
            for(int i = 0; i<model.Tasks.Count; i++)
            {
                var programmerName = model.Tasks[i].Programmer.Username;
                if(programmerName == null)
                {
                    invalidProgrammers.Add(programmerName); continue;
                }
                var programmer = await _userManager.FindByNameAsync(programmerName);
                if(programmer != null && await _userManager.IsInRoleAsync(programmer, "Programmer"))
                    project.Tasks[i].Programmer = programmer;
                else
                {
                    invalidProgrammers.Add(programmerName);
                }
            }
            if(invalidProgrammers.Count > 0)
            {
                StringBuilder ret = new StringBuilder("Error: the following users either do not exist or are not programmers: ");
                foreach(string n in invalidProgrammers) ret.Append(n + " ");
                return BadRequest(ret.ToString());
            }
            try
            {
                return Created("api/[Controller]/new", _repository.CreateProject(project));
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }

        [HttpPut]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> UpdateProject([FromBody] ProjectViewModel model)
        {
            int k = model.Id;
            model.Id = 0;
            var project = _mapper.Map<Project>(model);
            project.Manager = await _userManager.FindByNameAsync(User.Identity.Name);
            List<string> invalidProgrammers = new List<string>();
            for (int i = 0; i < model.Tasks.Count; i++)
            {
                string programmerName = model.Tasks[i].Programmer.Username;
                var programmer = await _userManager.FindByNameAsync(programmerName);
                if (programmer == null || await _userManager.IsInRoleAsync(programmer, "Programmer"))
                    project.Tasks[i].Programmer = programmer;
                else
                {
                    invalidProgrammers.Add(programmerName);
                }
            }
            if (invalidProgrammers.Count > 0)
            {
                StringBuilder ret = new StringBuilder("Error: the following users either do not exist or are not programmers: ");
                foreach (string n in invalidProgrammers) ret.Append(n + " ");
                return BadRequest(ret.ToString());
            }
            try
            {
                return Ok(_repository.UpdateProject(project,k, User.Identity.Name));
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }

        [HttpDelete("projects/{projectId}")]
        [Authorize(Roles ="Manager")]
        public IActionResult deleteProject(int projectId)
        {
            try
            {
                return Ok(_repository.DeleteProject(projectId));
            } catch(Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
