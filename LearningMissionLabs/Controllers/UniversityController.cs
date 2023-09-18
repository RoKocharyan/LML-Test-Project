using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using LearningMissionLabs.BLL;
using LearningMissionLabs.DataModel;
using LearningMissionLabs.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using University = LearningMissionLabs.Model.University;

namespace LearningMissionLabs.Controllers
{
    [ApiController]
    public class UniversityController : ControllerBase
    {
        private readonly ILogger<UniversityController> _logger;
        private readonly IUniversityService _service;
        public UniversityController(ILogger<UniversityController> logger, IUniversityService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        [Route("api/University")]
        public async Task<ActionResult<University>> FindUniversity()
        {
            var unis = await _service.FindUniversityAsync();
            return Ok(unis);

        }


    }

}
