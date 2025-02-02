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
            var events = Db.Eventregistrations.Where(e => e.Custid == cid).Select(e => new {e.Publish.Eventid, e.Publish.Event.Eventname, e.Publish.Eventdate, e.Publish.Eventtime, e.Publish.City.Cityname}).ToList();
            return Ok(events);
        }
    }
}
