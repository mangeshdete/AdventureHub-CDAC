using AdventureHub_DotNet_Admin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub_DotNet_Admin.Controllers
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class AdminController : Controller
    {

        public static readonly p14_adventurehubContext Db;

        static AdminController()
        {
            Db = new p14_adventurehubContext();
        }

        [HttpGet]
        public IActionResult GetPublishedEventsByStatus([FromQuery] string status, int id)
        {
            if (status == "PROCESSING")
            {

                return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status }).Where(e => e.Status == status));
            }
            return StatusCode(500, "Invalid status");
        }


        [HttpGet]
        public IActionResult GetPublishedEventsThatToBeCancel([FromQuery] string status)
        {
            if (status == "TO_BE_CANCELLED")
            {

                return Ok(from e in Db.Publishevents
                          join o in Db.Cancelrequests on e.Publishid equals o.Publishid
                          select new
                          {
                              e.Publishid,
                              e.Eventid,
                              e.Event.Eventname,
                              e.City.Cityname,
                              e.Status,
                              o.CancellationReason
                          });
            }
            return StatusCode(500, "Invalid status");
        }

        [HttpGet]
        public IActionResult GetPublishedEventsThatToBeViewByCityId([FromQuery] int id)
        {
            var status = "ACTIVE";
            return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status, e.Cityid }).Where(e => e.Cityid == id).Where(e => e.Status == status));

        }

        //Get top 10 Organizers with highest rating in descending order
        [HttpGet]
        public IActionResult GetTop10HighestRatedOrganizer()
        {
            try
            {
                var topOrganizers = Db.Organisers.Select(o => new { o.Organiserid, o.Orgname, CityName = o.City.Cityname, o.Rating }).OrderByDescending(o => o.Rating).Take(10).ToList();
                return Ok(topOrganizers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching data.", Error = ex.Message });
            }
        }

        //Get Events Registered Last Month
        [HttpGet]
        public IActionResult GetEventsRegisteredLastMonth()
        {
            try
            {
                // Get the date of one month ago (without the time part)
                var oneMonthAgo = DateTime.Now.AddMonths(-1).Date; // This ensures we compare only the date

                // Fetch events that were registered in the last month and bring them to memory
                var events = Db.Publishevents
                    .Where(e => e.eventdate >= oneMonthAgo) // Filter the events by the date in memory
                    .OrderByDescending(e => e.Eventdate) // Order by Eventdate
                    .ToList();

                if (events.Any())
                {
                    return Ok(events);
                }
                else
                {
                    return NotFound("No events registered last month.");
                }
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the process
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




    }
}
