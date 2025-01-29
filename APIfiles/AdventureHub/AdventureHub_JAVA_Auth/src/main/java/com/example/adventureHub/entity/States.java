package com.example.adventureHub.entity;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="states")
public class States {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int stateid;
	String statename;
	
	@JsonIgnoreProperties("states")
	@OneToMany(mappedBy = "states")
	Set<City>cities;
	
	public States() {
		super();
	}

	public States(int stateid, String statename, Set<City> cities) {
		super();
		this.stateid = stateid;
		this.statename = statename;
		this.cities = cities;
		for(City c : cities)
			c.setStates(this);
	}

	public int getStateid() {
		return stateid;
	}

	public void setStateid(int stateid) {
		this.stateid = stateid;
	}

	public String getStatename() {
		return statename;
	}

	public void setStatename(String statename) {
		this.statename = statename;
	}

	public Set<City> getCities() {
		return cities;
	}

	public void setCities(Set<City> cities) {
		for(City c : cities)
			c.setStates(this);
		this.cities = cities;
	}
	
}
