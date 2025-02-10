using AdventureHub_DotNet_Customer.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdventureHub_DotNet_Customer.Controllers
{
    [ApiController]
    [Route("customer/[controller]/[action]")]
    public class PaymentController : Controller
    {
        public static readonly p14_adventurehubContext Db;

        static PaymentController()
        {
            Db = new p14_adventurehubContext();
        }
        [HttpGet]
        public IActionResult GetPaymentHistoryByCustId([FromQuery] int cid)
        {
            var registrationIds = Db.Eventregistrations
                .Where(r => r.Custid == cid)
                .Select(r => r.Registrationid)
                .ToList(); // Get all Registration IDs

            var payments = Db.Payments
                .Where(p => registrationIds.Contains(p.Registrationid)) // Match all registrations
                .Select(r => new {
                    r.Registration.Publish.Event.Eventname,
                    r.Amount,
                    r.Date,
                    r.Paymentstatus
                })
                .ToList(); // Fetch results

            return Ok(payments);
        }


        [HttpGet]
        public IActionResult GetPaymentModes()
        {
            var PaymentModes = Db.Paymentmodes.Select(p => new { p.Paymentmodeid, p.Paymentmodename }).ToList();
            return Ok(PaymentModes);

        }
    }
}
