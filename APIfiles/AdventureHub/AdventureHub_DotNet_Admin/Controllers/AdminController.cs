using System.Linq.Expressions;
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
        public IActionResult GetAllUpdateRequestsForAdmin()
        {
            try
            {
                return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status }).Where(e => e.Status == "PROCESSING"));

            }
            catch (Exception e)
            {
                return StatusCode(500, "Invalid status");
            }
        }


        [HttpGet]
        public IActionResult GetToBeCancelledRequestsForAdmin()
        {
            try
            {
                var cancelRequests = Db.Cancelrequests.Where(c => c.FromStatus == "TO_BE_CANCELLED" && c.ToStatus == null).Select(c => new
                {
                    c.Id,
                    c.Publish.Event.Eventname,
                    c.Publish.City.Cityname,
                    c.Publish.City.State.Statename,
                    c.Publish.Status,
                    c.CancellationReason
                });
                return Ok(cancelRequests);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        public IActionResult GetPublishedEventsThatToBeViewByCityId([FromQuery] int id)
        {
            return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status, e.Cityid }).Where(e => e.Cityid == id));

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
        public IActionResult GetAllEventsPublishedInLastMonth()
        {
            try
            {
                // Get the date of one month ago (without the time part)
                var oneMonthAgo = DateOnly.FromDateTime(DateTime.Now.AddMonths(-1));

                // Fetch events that were registered in the last month and bring them to memory
                var events = Db.Publishevents
                    .Where(e => e.Eventdate >= oneMonthAgo) // Filter the events by the date in memory
                    .OrderByDescending(e => e.Eventdate)
                    .Select(p => new { eventId = p.Publishid, p.Organiser.Orgname, p.Event.Eventname, p.eventdate, p.Eventtime, p.Capacity, p.Status, totalRegistrations = (Db.Eventregistrations.Where(e => e.Publishid == p.Publishid).Select(e => e.Participants).Sum()) })
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

        [HttpPut]
        public IActionResult ApproveCancelRequestByRegId([FromQuery] int? regId)
        {
            if (regId == 0 || regId == null) return BadRequest("Invalid Event ID");

            var eventToCancel = Db.Cancelrequests.FirstOrDefault(e => e.Id == regId);
            if (eventToCancel == null) return NotFound("Event Not Found");

            eventToCancel.ToStatus = "CANCELLED"; // Update status

            var publishedEvent = Db.Publishevents.Where(p => p.Publishid == eventToCancel.Publishid).FirstOrDefault();
            if (publishedEvent == null) return BadRequest("Published Event Not Found");

            publishedEvent.Status = "CANCELLED";
            try
            {
                Db.SaveChanges();
                return Ok("success");
            }
            catch
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut]
        public IActionResult RejectCancelRequestByRegId([FromQuery] int? regId)
        {
            if (regId == 0 || regId == null) return BadRequest("Invalid Event ID");

            var eventToCancel = Db.Cancelrequests.FirstOrDefault(e => e.Id == regId);
            if (eventToCancel == null) return NotFound("Event Not Found");

            eventToCancel.ToStatus = "ACTIVE"; // Update status

            var publishedEvent = Db.Publishevents.Where(p => p.Publishid == eventToCancel.Publishid).FirstOrDefault();
            if (publishedEvent == null) return BadRequest("Published Event Not Found");

            publishedEvent.Status = "ACTIVE";
            try
            {
                Db.SaveChanges();
                return Ok("success");
            }
            catch
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        [HttpPut]
        public IActionResult ApproveUpdateRequestByPublishId([FromQuery] int? pid)
        {
            if (pid == 0 || pid == null)
                return BadRequest("Invalid Input");

            var publishedEvent = Db.Publishevents.Where(p => p.Publishid == pid).FirstOrDefault();
            if (publishedEvent == null) return BadRequest("Event Not Found");

            publishedEvent.Status = "ACTIVE";

            try
            {
                Db.SaveChanges();
                return Ok("success");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        public IActionResult GetAllPaymentsForAdmin()
        {
            return Ok(Db.Payments.Select(p => new { transactionId = p.Paymentid, p.Registration.Cust.Fname, p.Registration.Cust.Lname, p.Paymentmode.Paymentmodename, p.Date, p.Amount, p.Paymentstatus }).ToList());
        }

    }
}
