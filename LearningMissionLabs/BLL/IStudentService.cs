using LearningMissionLabs.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LearningMissionLabs.BLL
{
    public interface IStudentService
    {
        Task<bool> AddStudent(string name, string email, string university);
        Task<Student> GetStudentById(int id);
        Task<List<Student>> GetStudentsAsync();
        Task<bool> DeleteStudentById(int id);
        Task<Student> EditeStudentById(int id);

    }
}