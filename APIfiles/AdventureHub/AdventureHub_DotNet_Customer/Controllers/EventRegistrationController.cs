using AdventureHub.Models;
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
        public IActionResult GetEventRegistrationsByCustId([FromQuery] int cid)
        {
            var events = Db.Eventregistrations.Where(e => e.Custid == cid).Where(e => e.Cancellationreason==null).Select(e => new { e.Registrationid, e.Publish.Eventid, e.Publish.Event.Eventname, e.Publish.Eventdate, e.Publish.Eventtime, e.Publish.City.Cityname, e.Publish.Status }).ToList();
            return Ok(events);
        }

        [HttpGet]
        public IActionResult GetEventRegistrationDetailsByEventId([FromQuery] int eid)
        {
            var eventDetails = Db.Eventregistrations.Where(e => e.Publishid == eid).Select(e => new { e.Publish.Organiser.Orgname, e.Publish.Event.Eventname, e.Publish.Organiser.Rating, e.Publish.Eventdate, e.Publish.Eventtime, e.Publish.Price, e.Publish.Organiser.User.Contact }).ToList();
            return Ok(eventDetails);
        }

        [HttpPut]
        public IActionResult CancelEventRegistrationByRegistrationId([FromQuery] int rid, [FromBody] CancelRequestMessageHelper message)
        {
            var record = Db.Eventregistrations.FirstOrDefault(r => r.Registrationid == rid);
            if (record == null)
                return Ok("Registration doesn't exist");
            //var payment = Db.Payments.FirstOrDefault(p => p.Registrationid == rid);
            //Db.Payments.Remove(payment);
            //Db.Eventregistrations.Remove(record);

            record.Status = "CANCELLED";
            record.Cancellationreason = message.message;

            try
            {
                Db.SaveChanges();
                return Ok("success");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Error Cancelling Event, please try again later");
            }
        }
        [HttpGet]
        public IActionResult GetAllRefundRequestsByCustomerId([FromQuery] int cid)
        {
            try
            {
                // Get customer's latest status and cancellation reason
                var registration = Db.Eventregistrations
                    .Where(r => r.Custid == cid)
                    .Select(r => new { r.Status, r.Cancellationreason, r.Publishid })
                    .FirstOrDefault();

                if (registration == null)
                    return Ok(null);

                var price = Db.Publishevents.Where(r => r.Publishid.Equals(Db.Eventregistrations.Where(e => e.Custid == cid).Select(e => e.Publishid).FirstOrDefault())).Select(e => e.Price).FirstOrDefault();

                // Get all refund records for the customer
                var records = Db.Eventregistrations
                    .Where(r => r.Custid == cid && r.Cancellationreason!=null )
                    .Select(r => new
                    {
                        eventName = r.Publish != null ? r.Publish.Event.Eventname : "Unknown Event",
                        refundStatus = r.Status == "ACTIVE" && r.Cancellationreason != null && r.Cancellationreason!="" ? "APPROVED"
                                       : r.Status == "CANCELLED" && r.Cancellationreason == "" ? "REJECTED"
                                       : r.Status == "CANCELLED" && r.Cancellationreason != null ? "PENDING"
                                       : "TO_BE_REVIEWED",
                        participants = r.Participants,
                        pricePerPerson = price.ToString(),
                        refundAmount = r.Participants * price // Use price from above
                    })
                    .ToList();

                return Ok(records);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
