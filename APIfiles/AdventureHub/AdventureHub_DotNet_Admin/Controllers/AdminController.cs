using AdventureHub_DotNet_Admin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdventureHub_DotNet_Admin.Controllers
{
    [ApiController]
    [Route("/[controller]/[action]")]
    public class AdminController : Controller
    {

        public static readonly p14_adventurehubContext Db;

        static AdminController()
        {
            Db= new p14_adventurehubContext();
        }

        [HttpGet]
        public IActionResult GetPublishedEventsByStatus([FromQuery] string status) {
            if (status == "PROCESSING")
            {

                return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status }).Where(e => e.Status == status));
            }
            return StatusCode(500,"Invalid status");
        }


        [HttpGet]
        public IActionResult GetPublishedEventsThatToBeCancel([FromQuery] string status)
        {
            if (status == "TO_BE_CANCELLED")
            {

                return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status }).Where(e => e.Status == status));
            }
            return StatusCode(500, "Invalid status");
        }

        [HttpGet]
        public IActionResult GetPublishedEventsThatToBeViewByCityId([FromQuery] int id)
        {
            return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status,e.Cityid }).Where(e => e.Cityid == id));
            
        }
    }
}
