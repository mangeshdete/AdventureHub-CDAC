using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub.Controllers
{
    [Route("/[controller]/[action]")]
    [ApiController]
    public class EventRegistrationController:ControllerBase
    {
        public static p14_adventurehubContext Db { get; }

        static EventRegistrationController()
        {
            Db = new p14_adventurehubContext();
        }

        //Get all the EventRegistrations 
        [HttpGet]
        public IActionResult GetEventRegistrationsByEventIdAndOrganiserById([FromQuery] int eventId, [FromQuery] int orgId)
        {
            var eventRegistrations = Db.Eventregistrations.Where(e => e.Publish.Eventid==eventId).Where(e => e.Publish.Organiserid==orgId).Select(e => new {e.Cust.Fname, e.Cust.Lname, e.Cust.Dob, e.Cust.User.Contact, e.Participants}).ToList();
            return Ok(eventRegistrations);
        }

        [HttpGet]
        public IActionResult GetParticipantNumbersByPublishId([FromQuery] int id)
        {
            // Sum all participants for the given Publishid
            var totalParticipants = Db.Eventregistrations
                .Where(e => e.Publishid == id)
                .Sum(e => e.Participants);

            return Ok(totalParticipants);
        }

    }
}
