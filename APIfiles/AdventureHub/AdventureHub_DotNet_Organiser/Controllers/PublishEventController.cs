﻿using System.Diagnostics.Metrics;
using AdventureHub.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AdventureHub.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PublishEventController : Controller
    {
        public static readonly MyDbContext Db;

        static PublishEventController()
        {
            Db = new MyDbContext();
        }

        //Get All the Events which are published by any Organiser by Organiser Id
        [HttpGet]
        public IActionResult GetPublishedEventsByOrganiserId([FromQuery] int orgId)
        {
            // var publishedEvents=Db.Publishevents.Include(p => p.City).Include(p => p.Event).Where(e => e.Organiserid == orgId).ToList();
            var publishedEvents = Db.Publishevents.Where(e => e.Organiserid == orgId).OrderByDescending(e => e.Eventdate).Select(p => new {p.Eventid ,p.City.Cityname, p.Event.Eventname, p.Eventdate, p.Status }).ToList();
            return Ok(publishedEvents);
        }

        
        [HttpPost]
        public IActionResult PublishNewEvent([FromBody] Publishevent? evnt)
        {
            try
            {
                if (evnt != null)
                {
                    Db.Publishevents.Add(evnt);
                    Db.SaveChanges();
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex) 
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult GetPublishedEventById([FromQuery] int id) 
        {
            return Ok(Db.Publishevents.Select(e => new {e.Publishid, e.Eventid, e.Eventdate, e.Eventtime, e.Price, e.Street, e.Pincode, e.City.Cityname, e.City.State.Statename, e.Status, e.Capacity, e.Event.Eventname}).Where(e => e.Publishid==id));
            //return Ok(Db.Publishevents.Where(e => e.Publishid == id).Include(e => e.Event).Include(e => e.City).Include(e => e.City.State   ));
        }
        [HttpPut]
        public IActionResult UpdatePulishedEventDetails([FromBody] Publishevent? updated)
        {
            if (updated == null)
                return BadRequest("Null Updates not allowed");

            // 🔹 Fetch the original record using Publishid
            var original = Db.Publishevents
                .Include(pe => pe.Event)
                .FirstOrDefault(pe => pe.Publishid == updated.Publishid);

            if (original == null)
                return NotFound("Published Event not found");

            // 🔹 Update only provided fields (avoid overwriting with null)
            original.Eventdate = updated.Eventdate;
            original.Eventtime = updated.Eventtime;
            original.Status = updated.Status;
            original.Capacity = updated.Capacity;
            original.Street = updated.Street ?? original.Street;
            original.Pincode = updated.Pincode ?? original.Pincode;
            original.Price = updated.Price != 0 ? updated.Price : original.Price;

            /*
             {
                 "publishid": 1,
                 "eventid": 1,
                 "eventdate": "2025-02-15",
                 "eventtime": "10:00:56",
                 "price": 150,
                 "street": "New Beach Road",
                 "pincode": "500002",
                 "cityid": 9,
                 "status": "PROCESSING",
                 "capacity": 200
            }
             */
            try
            {
                Db.SaveChanges();
                return Ok();
            }
            catch (Exception ex){
                return StatusCode(500, "Error Updating Published Event: " + ex.Message);
            }
        }

    }
}
/*
Request JSON for Updation and same to be recieved from get publishedEvent
 {
    "publishid": 1,
    "eventid": 1,
    "eventdate": "2025-02-15",
    "eventtime": "10:00:56",
    "price": 150,
    "street": "New Beach Road",
    "pincode": "500002",
    "cityid": 9,
    "status": "PROCESSING",
    "capacity": 200
  }
 */