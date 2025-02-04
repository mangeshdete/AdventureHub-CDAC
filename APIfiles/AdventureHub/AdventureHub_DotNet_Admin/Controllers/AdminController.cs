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
            Db= new p14_adventurehubContext();
        }

        [HttpGet]
        public IActionResult GetPublishedEventsByStatus([FromQuery] string status,int id ) {
            if (status == "PROCESSING" )
            {

                return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status }).Where(e => e.Status == status ));
            }
            return StatusCode(500,"Invalid status");
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
            return Ok(Db.Publishevents.Select(e => new { e.Publishid, e.Eventid, e.Event.Eventname, e.City.Cityname, e.Status,e.Cityid }).Where(e => e.Cityid == id ).Where(e=>e.Status==status));
            
        }
    }
}
