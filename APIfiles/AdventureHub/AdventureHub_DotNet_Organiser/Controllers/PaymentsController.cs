using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdventureHub.Controllers
{
    [ApiController]
    [Route("/[Controller]/[Action]")]
    public class PaymentsController : Controller
    {
        public static readonly p14_adventurehubContext Db;

        static PaymentsController()
        {
            Db = new p14_adventurehubContext();
        }

        [HttpGet]
        public IActionResult GetAllRefundRequestsByPublishId([FromQuery] int pid)
        {
            var price = Db.Publishevents.Where(p => p.Publishid == pid).Select(p => p.Price).FirstOrDefault();
            var requests = Db.Eventregistrations.Where(e => e.Publishid == pid && e.Status == "CANCELLED" && e.Cancellationreason != null).Select(e => new { e.Registrationid, e.Publish.Event.Eventname, e.Publish.Eventdate, e.Publish.Eventtime, e.Cust.Fname, e.Cust.Lname, Amount = e.Participants * price });
            return Ok(requests);
        }

        [HttpPut]
        public IActionResult ApproveRefundRequestByRegistrationId([FromQuery] int rid)
        {
            var registration = Db.Eventregistrations.Where(e => e.Registrationid == rid).FirstOrDefault();
            if (registration == null)
                return Ok("failed");

            registration.Status = "ACTIVE";
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

        [HttpPut]
        public IActionResult RejectRefundRequestByRegistrationId([FromQuery] int rid)
        {
            var registration = Db.Eventregistrations.Where(e => e.Registrationid == rid).FirstOrDefault();
            if (registration == null)
                return Ok("failed");

            registration.Cancellationreason = "";
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
    }
}
