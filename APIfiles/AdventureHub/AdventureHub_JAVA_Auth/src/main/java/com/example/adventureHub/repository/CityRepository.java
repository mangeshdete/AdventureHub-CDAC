package com.example.adventureHub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.adventureHub.entity.City;
import com.example.adventureHub.entity.States;

public interface CityRepository extends JpaRepository<City, Integer> {

	@Query("From City where states=?1")
	public List<City> getCitiesByStateId(States stateid);
	
}
