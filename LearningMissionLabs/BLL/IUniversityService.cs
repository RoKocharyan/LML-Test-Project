
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using LearningMissionLabs.Model;

namespace LearningMissionLabs.BLL
{
    public interface IUniversityService
    {
        Task<bool> AddUniversity(string name, string address);
        Task<List<University>> FindUniversityAsync();
        Task<University> GetUniversityById(int id);
        Task<bool> DeleteUniversityById(int id);
        Task<bool> EditUniversityById(int id);
    }
}