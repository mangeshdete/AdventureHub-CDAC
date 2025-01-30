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
        public static MyDbContext Db { get; }

        static CategoryController()
        {
            Db=new MyDbContext();
        }

        [HttpGet]
       public IActionResult GetAllCategories()
        {
            return Ok(Db.Categories.Select(c => new { c.Categoryid, c.Categoryname }).ToList());
        }
    }
}
