package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.States;
import com.example.adventureHub.service.StatesService;

@CrossOrigin
@RestController
public class StatesController {

	@Autowired
	StatesService sservice;
	
	@GetMapping("getAllStates")
	public List<States> getAllStates(){
		return sservice.getAllStates();
	}
	
	@GetMapping("getStateByStateId")
	public States getStateByStateId(@RequestParam int stateId) {
		States st=sservice.getStateById(stateId);
		if(st!=null)
			return st;
		return null;
//		return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); //body(new States()); 
	}
}
