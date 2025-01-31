using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PublishEventController : Controller
    {
        public static readonly MyDbContext Db;

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

        
        [HttpPost]
        public IActionResult PublishNewEvent([FromBody] Publishevent? evnt)
        {
            try
            {
                if (evnt != null)
                {
                    Db.Publishevents.Add(evnt);
                    Db.SaveChanges();
                    return Ok(evnt);
                }
                return BadRequest();
            }
            catch (Exception ex) 
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetPublishedEventById([FromQuery] int id) 
        {
            Console.WriteLine(Db.Events);
            return Ok(Db.Publishevents.Where(e => e.Publishid==id).ToList());
        }
    }
}
/*
 {
    "eventid": 1,
    "organiserid": 1,
    "eventdate": "2025-02-15",
    "eventtime": "10:00:00",
    "price": 100,
    "capacity": 50,
    "status": "PROCESSING",
    "street": "Beach Road",
    "cityid": 1,
    "pincode": "500001"
  }
 */