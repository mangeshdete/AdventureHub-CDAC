package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.City;
import com.example.adventureHub.entity.States;
import com.example.adventureHub.repository.CityRepository;

@Service
public class CityService {

	@Autowired
	CityRepository cityrepo;
	
	public List<City> getAllCities(){
		return cityrepo.findAll();
	}
	
	public City getCityByCityId(int id) {
		return cityrepo.findById(id).get();
	}
	
	public List<City> getCitiesByStateId(States st){
		return cityrepo.getCitiesByStateId(st);
	}
	
}
