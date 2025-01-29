package com.example.adventureHub.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.City;
import com.example.adventureHub.entity.States;
import com.example.adventureHub.service.CityService;
import com.example.adventureHub.service.StatesService;

@CrossOrigin
@RestController
public class CityController {
	
	@Autowired
	CityService cityservice;
	
	@Autowired
	StatesService stService;
	
	@GetMapping("getAllCities")
	public List<City> getAllCities(){
		return cityservice.getAllCities();
	}
	
	@GetMapping("getCityByCityId")
	public City getCityByCityId(@RequestParam int cityId) {
		return cityservice.getCityByCityId(cityId);
	}
	
	@GetMapping("getCitiesByStateId")
	public List<City> getAllCitiesByStateId(@RequestParam int stateId){
		States st = stService.getStateById(stateId);
		if(st!=null)
			return cityservice.getCitiesByStateId(st);
		return new ArrayList<City>();
	}
}
