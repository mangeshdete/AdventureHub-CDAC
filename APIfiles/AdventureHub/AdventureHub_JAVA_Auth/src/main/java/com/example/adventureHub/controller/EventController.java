package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.Event;
import com.example.adventureHub.service.EventService;

@RestController
public class EventController {

	@Autowired
	private EventService eService;

	@GetMapping("getAllEvents")
	public List<Event> getAllEvents(){
		return eService.getAllEvents();
	}
	
	@GetMapping("getEventByEventId")//?eid={value}
	public Event getEventById(@RequestParam int eid) {
		return eService.getEventByEventId(eid);
	}
}
