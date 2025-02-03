using AdventureHub_DotNet_Customer.Models;
using Microsoft.AspNetCore.Mvc;

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
            



    }
}
