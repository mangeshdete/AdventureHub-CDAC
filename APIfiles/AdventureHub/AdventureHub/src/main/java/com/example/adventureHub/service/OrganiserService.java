package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.Organiser;
import com.example.adventureHub.repository.OrganiserRepository;

@Service
public class OrganiserService {

	@Autowired
	private OrganiserRepository orgRepo;
	
	public List<Organiser> getAllOrganisers(){
		return orgRepo.findAll();
	}
	
	public Organiser saveNewOrganiser(Organiser org) {
		return orgRepo.save(org);
	}
}
