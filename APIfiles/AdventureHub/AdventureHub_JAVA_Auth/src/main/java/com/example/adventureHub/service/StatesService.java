package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.States;
import com.example.adventureHub.repository.StatesRepository;

@Service
public class StatesService {

	@Autowired
	StatesRepository srepo;
	
	public List<States> getAllStates(){
		return srepo.findAll();
	}
	
	public States getStateById(int id) {		
		return srepo.findById(id).get();
	}
}
