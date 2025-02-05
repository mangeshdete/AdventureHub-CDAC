using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AdventureHub.Controllers
{
    [Route("/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static p14_adventurehubContext Db { get; }

        static CategoryController()
        {
            Db=new p14_adventurehubContext();
        }

        [HttpGet]
       public IActionResult GetAllCategories()
        {
            return Ok(Db.Categories.Select(c => new { c.Categoryid, c.Categoryname }).ToList());
        }
    }
}
