package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.Event;
import com.example.adventureHub.repository.EventRepository;

@Service
public class EventService {

	@Autowired
	private EventRepository eRepo;
	
	public List<Event> getAllEvents(){
		return eRepo.findAll();
	}
	
	public Event getEventByEventId(int eid){
		return eRepo.findById(eid).get();
	}
}
