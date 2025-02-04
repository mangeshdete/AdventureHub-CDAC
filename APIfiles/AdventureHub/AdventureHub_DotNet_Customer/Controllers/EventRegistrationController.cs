using AdventureHub_DotNet_Customer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace AdventureHub_DotNet_Customer.Controllers
{
    [ApiController]
    [Route("/[Controller]/[Action]")]
    public class EventRegistrationController : Controller
    {
        public static p14_adventurehubContext Db { get; }

        static EventRegistrationController()
        {
            Db = new p14_adventurehubContext();
        }
        [HttpGet]
        public IActionResult GetEventRegistrationsByCustId([FromQuery]int cid)
        {
            var events = Db.Eventregistrations.Where(e => e.Custid == cid).Select(e => new {e.Publish.Eventid, e.Publish.Event.Eventname, e.Publish.Eventdate, e.Publish.Eventtime, e.Publish.City.Cityname, e.Publish.Status }).ToList();
            return Ok(events);
        }

        //[HttpGet]
        //public IActionResult GetEventRegistrationsByEventId([FromQuery] int eid)
        //{
        //    var events = Db.Eventregistrations.Where(e => e.Eventid == eid).Select(e => new { e.Custid, e.Customer.Custname, e.Customer.Custemail, e.Customer.Custphone }).ToList();
        //    return Ok(events);
        //}
        [HttpGet]
        public IActionResult GetEventRegistrationDetailsByEventId([FromQuery] int eid)
        {
            var eventDetails = Db.Eventregistrations.Where(e => e.Publishid == eid).Select(e => new { e.Publish.Organiser.Orgname, e.Publish.Event.Eventname, e.Publish.Organiser.Rating, e.Publish.Eventdate, e.Publish.Eventtime, e.Publish.Price, e.Publish.Organiser.User.Contact}).ToList();
            return Ok(eventDetails);
        }

        [HttpGet]
        public IActionResult getCustomerById([FromQuery] int id)
        {
            return Ok(Db.Customers.Include(org => org.User).Where(o => o.Custid == id));
        }

        [HttpPut]
        public IActionResult updateCustomerDetails([FromBody] Customer updated)
        {
            Console.WriteLine("hello");
            if (updated == null)
                return BadRequest("Null Updates not allowed");

            var original = Db.Customers.Include(og => og.User).FirstOrDefault(o => o.Custid == updated.Custid);
            if (original == null)
                return BadRequest("Organiser not found");

            original.Fname = updated.Fname ?? original.Fname;
            original.Lname = updated.Lname ?? original.Lname;
            original.Street = updated.Street ?? original.Street;
            original.Cityid = updated.Cityid != 0 ? updated.Cityid : original.Cityid;
            original.Pincode = updated.Pincode ?? original.Pincode;

            if (updated.User != null)
            {
                if (original.User == null)
                    return StatusCode(500, "Error Updating User specific detaills, check for the User specific details");

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
                return StatusCode(500, "Error Updating Organiser");
            }
        }


    }
}
