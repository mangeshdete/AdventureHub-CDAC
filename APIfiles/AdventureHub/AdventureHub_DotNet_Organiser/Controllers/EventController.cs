using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdventureHub.Controllers
{
    [ApiController]
    [Route("/[Controller]/[Action]")]
    public class EventController : Controller
    {
        private static readonly p14_adventurehubContext Db;
        static EventController()
        {
            Db= new p14_adventurehubContext();
        }
        [HttpGet]
        public IActionResult GetAllEventsFromCategoryId([FromQuery]int catId)
        {
            return Ok(Db.Events.Where(e => e.Categoryid==catId).Select(e => new {e.Eventid, e.Eventname}).ToList());
        }
    }
}
