using AdventureHub.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub.Controllers
{
    [ApiController]
    [Route("/[Controller]/[Action]")]
    public class OrganiserController : Controller
    {
        public readonly MyDbContext Db;
        public OrganiserController() 
        {
            Db = new MyDbContext();
        }

        [HttpGet]
        public IActionResult getOrganiserById([FromQuery]int id)
        {
            return Ok(Db.Organisers.Include(org => org.User).Where(o => o.Organiserid==id));
        }

        [HttpPut]
        public IActionResult updateOrganiserDetails([FromBody] Organiser updated)
        {
            Console.WriteLine("hello");
            if (updated == null)
                return BadRequest("Null Updates not allowed");

            var original = Db.Organisers.Include(og => og.User).FirstOrDefault(o => o.Organiserid== updated.Organiserid);
            if (original == null)
                return BadRequest("Organiser not found");

            original.Orgname= updated.Orgname ?? original.Orgname;
            original.Street= updated.Street ?? original.Street;
            original.Cityid= updated.Cityid !=0 ? updated.Cityid : original.Cityid;
            original.Pincode= updated.Pincode ?? original.Pincode;

            if (updated.User != null)
            {
                if (original.User == null)
                    return StatusCode(500,"Error Updating User specific detaills, check for the User specific details");

                original.User.Contact = updated.User.Contact ?? original.User.Contact;
                original.User.Email = updated.User.Email ?? original.User.Email;
            }

            Console.WriteLine(original);
            try
            {
                Db.SaveChanges();
                return Ok(original);
            }
            catch (Exception ex)
            {
                return StatusCode(500,"Error Updating Organiser");
            }
        }
    }
}
