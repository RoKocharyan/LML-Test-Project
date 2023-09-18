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
    public class AdminController : ControllerBase
    {
        private readonly IUniversityService _uniService;
        private readonly IStudentService _studentService;
        public AdminController(IUniversityService service, IStudentService studentservice)
        {
            _uniService = service;
            _studentService = studentservice;   
        }

        // Students Api

        [HttpGet]
        [Route("api/Admin/sudents")]
        public async Task<ActionResult<University>> GetStudents()
        {
            var students = await _studentService.GetStudentsAsync();

            return Ok(students);
        }

        [HttpDelete]
        [Route("api/Admin/students/{id}")]
        public async Task<ActionResult<University>> DeleteStudent(int id)
        {
            if (id < 1) return BadRequest("not found");

            bool s = await _studentService.DeleteStudentById(id);
            if (!s) return BadRequest("not found");
            return Ok("deleted");
        }

        //University API

        [HttpGet]
        [Route("api/Admin/unis")]
        public async Task<ActionResult<University>> GetUniversitys()
        {
            var unis = await _uniService.FindUniversityAsync();
            return Ok(unis);
        }

        [HttpPost]
        [Route("api/Admin/unis")]
        public async Task<bool> AddUniversity([FromBody] University s)
        {
            return await _uniService.AddUniversity(s.Name, s.Address);
        }

        [HttpDelete]
        [Route("api/Admin/unis/{id}")]
        public async Task<ActionResult<University>> DeleteUniversity(int id) 
        {
            if (id < 1) return BadRequest("not found");
            bool s = await _uniService.DeleteUniversityById(id);
            if (!s) return BadRequest("not found");
            return Ok("deleted");
        }

    }

}
