package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.Organiser;
import com.example.adventureHub.service.OrganiserService;

@CrossOrigin
@RestController
public class OrganiserController {

	@Autowired
	private OrganiserService orgSer;
	
	@GetMapping("getAllOrganisers")
	public List<Organiser> getAllOrganisers(){
		return orgSer.getAllOrganisers();
	}
	
	@PostMapping("saveNewOrganiser")
	public Organiser saveNewOrganiser(@RequestBody Organiser org) {
		return orgSer.saveNewOrganiser(org);
	}
}
