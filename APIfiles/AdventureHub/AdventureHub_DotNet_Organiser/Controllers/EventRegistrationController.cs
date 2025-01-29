using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub.Controllers
{
    [Route("/[controller]/[action]")]
    [ApiController]
    public class EventRegistrationController:ControllerBase
    {
        public static MyDbContext Db { get; }

        static EventRegistrationController()
        {
            Db = new MyDbContext();
        }

        //[HttpGet]
        //public IActionResult GetAllEventRegistrations()
        //{
        //    var allEvents = Db.Eventregistrations.Include(e => e.Cust).Include(e => e.Publish).Include(e => e.Payments).ToList();
        //    return Ok(allEvents);
        //}

        //[HttpGet]
        //public IActionResult GetEventRegistrationByRegistrationId([FromQuery]int regId)
        //{
        //    var eventReg = Db.Eventregistrations.Include(e => e.Cust).Include(e => e.Publish).FirstOrDefault(e => e.Registrationid==regId);
        //    return Ok(eventReg);
        //}

        //[HttpGet]
        //public IActionResult GetEventRegistrationsByOrganiserId([FromQuery] int orgId)
        //{
        //    var orgRegs = Db.Eventregistrations.Where(e => e.Publish.Organiserid==orgId).ToList();
        //    //.Include(e => e.Cust).Include(e => e.Publish)
        //    return Ok(orgRegs);
        //}

        //Get all the EventRegistrations 
        [HttpGet]
        public IActionResult GetEventRegistrationsByEventIdAndOrganiserById([FromQuery] int eventId, [FromQuery] int orgId)
        {
            var eventRegistrations = Db.Eventregistrations.Where(e => e.Publish.Eventid==eventId).Where(e => e.Publish.Organiserid==orgId).ToList();
            return Ok(eventRegistrations);
        } 

    }
}
