using AutoMapper;
using Hg.Data.DbData;
using Hg.Data.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Hg.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly SignInManager<HgUser> _signInManager;
        private readonly UserManager<HgUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;
        public AccountController(ILogger<AccountController> logger,
            SignInManager<HgUser> signInManager,
            UserManager<HgUser> userManager,
            IConfiguration configuration, IMapper mapper, IWebHostEnvironment env)
        {
            _signInManager = signInManager;
            _logger = logger;
            _userManager = userManager;
            _configuration = configuration;
            _mapper = mapper;
            _env = env;
        }

        [Route("createToken")]
        [HttpPost]
        public async Task<IActionResult> CreateToken([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid) // if there is user and password
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user != null)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (result.Succeeded)
                    {
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)

                        };
                        foreach (var r in roles) {
                            _logger.LogInformation($"{user.UserName} has role {r}");
                            claims.Add(new Claim(ClaimTypes.Role, r));
                            // claims.Append(new Claim(new ClaimsIdentity(JwtBearerDefaults.AuthenticationScheme, "", r)));
                        } // adding roles to claims
                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Key"]));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(_configuration["Token:Issuer"],
                            _configuration["Token:Audience"],
                            claims,
                            signingCredentials: creds,
                            expires: DateTime.UtcNow.AddMinutes(20)); // validity of 20 minutes

                        var userRet = _mapper.Map<UserViewModel>(user);
                        userRet.RoleNames = new(roles); // C# being C#

                        return Created("", new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            userDetails = userRet
                        });

                    }
                }
                return BadRequest("Username or password not correct");
            }
            return BadRequest("Dados inválidos para login");
        }


        [Route("signUp")]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody] SignUpViewModel model)
        {
            // var model = mdl.signup;
            //_logger.LogInformation($"model: {new JsonResult(model)}");
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = _mapper.Map<HgUser>(model);

            _logger.LogInformation("User has been mapped");
            var registration = await _userManager.CreateAsync(user, model.Password); // creating user with basic info
            _logger.LogInformation("User created");
            if (!registration.Succeeded)
            {
                return StatusCode(500, "Internal Server Error: Registration Failed");
            }

            if (model.RoleNames != null)
                foreach (string roleName in model.RoleNames) // adding roles
                {
                    await _userManager.AddToRoleAsync(user, roleName);
                }
            user.PhotoFilePath = "/Photos/anonymous/no_photo.jpg";


            return Ok("User Created");
        }

        [Route("savePhoto/{username}")]
        [HttpPost]
        public async Task<IActionResult> PostPhoto(string username)
        {
            _logger.LogInformation("Posting photo for " + username);
            try // adding profile picture
            {
                var user = await _userManager.FindByNameAsync(username);
                var httpRequest = Request.Form;
                if (httpRequest.Files.Count >= 1) // only if there is a photo that was posted
                {
                    var postedFile = httpRequest.Files[0]; //getting photo file
                    string filename = postedFile.FileName;
                    var physicalPath =  "/Photos/" + username + filename.Substring(filename.LastIndexOf("."));
                    using (var stream = new FileStream(_env.ContentRootPath + physicalPath, FileMode.Create))
                    {
                        postedFile.CopyTo(stream);
                    }
                    var previous = user.PhotoFilePath;
                    user.PhotoFilePath = physicalPath;
                    if (previous != null && !previous.Equals("/Photos/anonymous/no_photo.jpg")/*!previous.EndsWith(@"\Photos\anonymous\no_photo.jpg")*/)
                    {
                        try
                        {
                            System.IO.File.Delete(_env.ContentRootPath + previous);
                        } catch(Exception e)
                        {
                            _logger.LogError("Impossible to delete photo file of " + User.Identity.Name+": "+e.Message);

                        }
                        _logger.LogInformation("Deleting file..");
                    }
                }
                else // no photo posted : "anonymous photo"
                {
                    // user.PhotoFilePath = _env.ContentRootPath + "/Photos/anonymous/no_photo.jpg";
                    return BadRequest("No photo was posted");
                }
                await _userManager.UpdateAsync(user);
                // return new JsonResult(filename);
                return Ok("File saved");
            }
            catch (Exception e)
            {
                return new JsonResult("Exception: " + e.Message);
            }
        }
        
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("updateUser")]
        [HttpPut]
        public async Task<IActionResult> updateUser([FromBody] UserEditViewModel model) // the user is going to update itself
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);// finding user
            /**/
            // user.UserName = model.UserName; // updating parameters
            // user.PhotoFilePath = model.PhotoFilePath;
            if(model.CurrPassword != "")
            {
                _logger.LogInformation("User: " + User.Identity.Name + "trying to change password " + model.CurrPassword + " to " + model.Data.Password);
                var r = await _userManager.ChangePasswordAsync(user, model.CurrPassword, model.Data.Password);
                if(!r.Succeeded) {
                    return StatusCode(500, "Problems changing password. Update aborted");
                }
            }
            /*
            if(user.Email !=model.Data.Email)
            {
                var token = await  _userManager.GenerateEmailConfirmationTokenAsync(user); // seria necessário enviar um mail though
                await _userManager.ChangeEmailAsync(user, model.Data.Email, token);
            }
            ** Involves two factor authentication -- out of scope
           */
            user.Biography = model.Data.Biography;
         
            // vamos impossibilitar a mudança de role por agora
            user.PhoneNumber = model.Data.PhoneNumber;
            var res = await _userManager.UpdateAsync(user); // updating user
            if (res.Succeeded) { 
                // await _userManager
                return Ok("User updated"); 
            } 
            else return StatusCode(500, "Problem updating user");
        }

        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Signed Out"); // RedirectTo({HomePage});
        }
    }
}
