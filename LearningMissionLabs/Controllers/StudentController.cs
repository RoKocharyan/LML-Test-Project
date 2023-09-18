﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using LearningMissionLabs.BLL;
using LearningMissionLabs.DataModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LearningMissionLabs.Controllers
{
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ILogger<StudentController> _logger;
        private readonly IStudentService _service;
        public StudentController(ILogger<StudentController> logger, IStudentService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpPost]
        [Route("api/Student/AddStudent")]
        public async Task<bool> AddStudent([FromBody] Student s)
        {
            
            return await _service.AddStudent(s.name, s.email, s.universityId);
        }

        private bool emailValidation (string email)
        {
            const string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$";
            return Regex.IsMatch(email, regex);
        }
    }

}
