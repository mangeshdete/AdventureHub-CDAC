using AdventureHub_DotNet_Customer.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdventureHub_DotNet_Customer.Controllers
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class PaymentController : Controller
    {
        public static readonly p14_adventurehubContext Db;

        static PaymentController()
        {
            Db = new p14_adventurehubContext();
        }
        [HttpGet]
        public IActionResult getPaymentHistoryByCustId([FromQuery] int cid)
        {
            //var payments = Db.Payments.Where(p => p.Registrationid ==
            //    (Db.Eventregistrations.Where(r => r.Custid == cid).
            //        Select(r => r.Registrationid).FirstOrDefault())).Select(r => new { r.Registration.Publish.Event.Eventname, r.Amount, r.Date, r.Paymentstatus });
            var payments = Db.Payments.Where(p => p.Registration.Custid == cid).Select(r => new { r.Registration.Publish.Event.Eventname, r.Amount, r.Date, r.Paymentstatus });

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


