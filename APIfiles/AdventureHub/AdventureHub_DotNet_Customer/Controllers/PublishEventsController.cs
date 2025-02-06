using AdventureHub_DotNet_Customer.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdventureHub_DotNet_Customer.Controllers
{
    [Controller]
    [Route("/[controller]/[action]")]
    public class PublishEventsController : Controller
    {
        public static readonly p14_adventurehubContext Db;

        static PublishEventsController()
        {
            Db = new p14_adventurehubContext();
        }

        [HttpGet]
        public IActionResult GetNumberOfActiveEventsByStateId([FromQuery]int? stateid){
            if (stateid == null)
                return BadRequest();

            return Ok(Db.Publishevents.Where(p => p.Status=="ACTIVE" && p.City.Stateid==stateid).Count());
        }

        [HttpGet]
        public IActionResult getPublishedEventsByCityIdOrStateId([FromQuery]int? cityid, [FromQuery]int? stateid)
        {
            if(cityid == null || stateid == null)
                return BadRequest();
            //If Events are available in user's City, send those events
            var eventsByCity = Db.Publishevents.Where(p => p.Cityid==cityid && p.Status=="ACTIVE").Select(p => new { 
                p.Publishid, 
                p.Event.Eventname, 
                p.Organiser.Rating, 
                p.Price, 
                p.City.State.Statename, 
                p.City.Cityname, 
                p.Street, 
                p.Pincode,
                p.Capacity,
                totalRegistrations = Db.Eventregistrations
                                        .Where(e => e.Publishid == p.Publishid)
                                        .Sum(e => e.Participants)
        }).ToList();
            if (eventsByCity.Any()) 
                return Ok(eventsByCity);

            //If Events are not available in user's City,send events published in the user's state
            var eventsByState = Db.Publishevents.Where(p => p.City.Stateid == stateid && p.Status == "ACTIVE").Select(p => new {
                p.Publishid,
                p.Event.Eventname,
                p.Organiser.Rating,
                p.Price,
                p.City.State.Statename,
                p.City.Cityname,
                p.Street,
                p.Pincode,
                p.Capacity,
                totalRegistrations = Db.Eventregistrations
                                        .Where(e => e.Publishid == p.Publishid)
                                        .Sum(e => e.Participants)
            }).ToList();
            if(eventsByState.Any())
                return Ok(eventsByState);

            //If not in the state either, send all events
            var allEvents = Db.Publishevents.Where(p => p.Status=="ACTIVE").Select(p => new { 
                p.Publishid, 
                p.Event.Eventname, 
                p.Organiser.Rating, 
                p.Price, 
                p.City.State.Statename, 
                p.City.Cityname, 
                p.Street, 
                p.Pincode,
                p.Capacity,
                totalRegistrations = Db.Eventregistrations
                                        .Where(e => e.Publishid == p.Publishid)
                                        .Sum(e => e.Participants)
            }).ToList();
            return Ok(allEvents);
        }

        [HttpGet]
        public IActionResult getAllPublishedEventsByStateId([FromQuery]int? stateid)
        {
            try {
                if (stateid == null && stateid!=0)
                    return Ok(null);

                return Ok(Db.Publishevents.Where(p => p.City.Stateid == stateid && p.Status == "ACTIVE").Select(p => new { 
                    p.Publishid, 
                    p.Event.Eventname, 
                    p.Organiser.Rating, 
                    p.Price, 
                    p.City.State.Statename, 
                    p.City.Cityname, 
                    p.Street, 
                    p.Pincode,
                    p.Capacity,
                    totalRegistrations = Db.Eventregistrations
                                        .Where(e => e.Publishid == p.Publishid)
                                        .Sum(e => e.Participants)
                }).ToList());
            }
            catch {
                return StatusCode(500,"Internal Server Error");
            }
        }

        [HttpPost]
        public IActionResult CustomerRegistrationForAnEvent([FromBody] Eventregistration eventReg)
        {
            try
            {
                if (eventReg == null)
                    return BadRequest();

                //get number of participants by the eventregistration object
                int participants = eventReg.Participants;

                //get the max capacity
                int capacity = Db.Publishevents.Where(p => p.Publishid == eventReg.Publishid).Select(p => p.Capacity).FirstOrDefault();

                //get the total participants registered for that event
                int totalRegistered = Db.Eventregistrations.Where(e => e.Publishid == eventReg.Publishid).Sum(e => e.Participants);

                //check if the participants exceeds the max capacityy
                if (participants > (capacity - totalRegistered))
                    return BadRequest("Number of Participants exceeds the maximum capacity by "+(participants-(capacity-totalRegistered))+" participants");

                //if not, then add it into the database
                Db.Eventregistrations.Add(eventReg);
                Db.SaveChanges();
                return Ok(eventReg);
            }
            catch(Exception e) 
            {
                return StatusCode(500,"Internal Server Error");
            }
        }
    }
}
