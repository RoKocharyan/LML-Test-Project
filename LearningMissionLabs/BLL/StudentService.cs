using LearningMissionLabs.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LearningMissionLabs.BLL
{
    public class StudentService : IStudentService
    {
        public readonly LearningMissionContext _db;
        public StudentService(LearningMissionContext DbContext)
        {
            _db = DbContext;
        }
        public async Task<bool> AddStudent(string name, string email, string uniId)
        {
            try
            {
                {
                    await _db.Database.ExecuteSqlRawAsync("uspAddStudent @p0,@p1,@p2", parameters: new[] { name , email, uniId});
                }
            }
            catch(Exception ex)
            {

                return false;
            }
            return true;
        }
        public async Task<List<Student>> GetStudentsAsync()
        {
            var students = await _db.Students.ToListAsync();
            return students;
        }
        public async Task<Student> GetStudentById(int id)
        {
            var student = await _db.Students.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (student == null) return null;
            return student;

        }

        public async Task<bool> DeleteStudentById(int id)
        {
            
            var b = await _db.Students.FindAsync(id);
            if (b == null) return false;
            
            _db.Students.Remove(b);
            await _db.SaveChangesAsync();
            return true;
            

         }

        public Task<Student> EditeStudentById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
