using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PublishEventController : Controller
    {
        public static MyDbContext Db { get; }

        static PublishEventController()
        {
            Db = new MyDbContext();
        }

        //Get All the Events which are published by any Organiser by Organiser Id
        [HttpGet]
        public IActionResult GetPublishedEventsByOrganiserId([FromQuery] int orgId)
        {
            // var publishedEvents=Db.Publishevents.Include(p => p.City).Include(p => p.Event).Where(e => e.Organiserid == orgId).ToList();
            var publishedEvents = Db.Publishevents.Where(e => e.Organiserid == orgId).OrderByDescending(e => e.Eventdate).Select(p => new {p.Eventid ,p.City.Cityname, p.Event.Eventname, p.Eventdate, p.Status }).ToList();
            return Ok(publishedEvents);
        }
    }
}
