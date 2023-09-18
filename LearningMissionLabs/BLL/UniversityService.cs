
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using LearningMissionLabs.Model;

namespace LearningMissionLabs.BLL
{
    public class UniversityService : IUniversityService
    {
        private readonly LearningMissionContext _db;
        public UniversityService(LearningMissionContext db)
        {
            _db = db;
        }

        public async Task<bool> AddUniversity(string name, string address)
        {
            try
            {
                {
                    await _db.Database.ExecuteSqlRawAsync("uspAddUniversity @p0,@p1", parameters: new[] { name, address });
                }
            }
            catch (Exception ex)
            {

                return false;
            }
            return true;
        }

        public async Task<bool> DeleteUniversityById(int id)
        {
            
            var b = await _db.Universities.FindAsync(id);
            if (b == null)
            {
                return false;
            }
            _db.Universities.Remove(b);
            await _db.SaveChangesAsync();
            return true;
        }

        public Task<bool> EditUniversityById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<University>> FindUniversityAsync()
        {
            var unis = await _db.Universities.ToListAsync();
            return unis;
        }

        public async Task<University> GetUniversityById(int id)
        {
            var university = await _db.Universities.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (university == null) return null;
            return university;
        }
    }
}
