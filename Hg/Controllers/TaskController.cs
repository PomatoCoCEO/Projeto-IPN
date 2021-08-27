using AutoMapper;
using Hg.Data;
using Hg.Data.DbData;
using Hg.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles ="Programmer")]
    public class TaskController : ControllerBase
    {


        private readonly IHgRepository _repository;

        private readonly ILogger<TaskController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<HgUser> _userManager;

        public TaskController(IHgRepository repository,
            ILogger<TaskController> logger,
            IMapper mapper,
            UserManager<HgUser> userManager)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("tasks")]
        public IActionResult GetTasks()
        {
            _logger.LogInformation(User.Identity.Name + " tried to access this method");
            try
            {
                var intermediate = (_repository.GetTasks(User.Identity.Name));
                var ret = _mapper.Map<IEnumerable<ProjTaskViewModel>>(intermediate);
                /*
                     var aid = new JsonSerializerSettings();
                     aid.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    _logger.LogInformation("Tasks:" + Newtonsoft.Json.JsonConvert.SerializeObject(intermediate, aid));
                    _logger.LogInformation("Tasks:" + Newtonsoft.Json.JsonConvert.SerializeObject(ret, aid));
                */
                return Ok(ret);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }

        [HttpGet]
        [Route("tasks/{taskId}")]
        public IActionResult GetTask(int taskId)
        {
            try
            {
                var task = _repository.GetTask(User.Identity.Name, taskId);
                if (task == null) return BadRequest("Task not found or not assigned to this user");
                return Ok(_mapper.Map<ProjTaskViewModel>(task));
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }

        // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Programmer")]
        // por algum motivo o frontend dá um token incorreto ou assim e este método não é executado pelo facto de o role "Programmer" não estar incluído 
        [HttpPut]
        [Route("tasks/{taskId}")]
        public IActionResult SetAsFinished(int taskId)
        {
            try
            {
                int k = _repository.SetTaskFinished(taskId, User.Identity.Name);
                string[] errors = { "NOT FOUND", "DEADLINE ALREADY PASSED", "TASK ALREADY FINISHED" };
                if (k < 0) return BadRequest(errors[-k - 1]);
                else return Ok(k);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Server error: " + e);
            }
        }
    }
}
