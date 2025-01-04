package com.example.adventureHub.entity;

import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="cities")
public class City {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int cityid;
	String cityname;
	
	@JsonIgnoreProperties("cities")
	@ManyToOne
	@JoinColumn(name="stateid") 
	States states;
	
//	@JsonIgnoreProperties("cities")
//	@OneToMany(mappedBy = "cities")
//	@Cascade(value = CascadeType.ALL)
//	Set<Customer>customers;
//	
//	@
//	Set<Organiser> organisers;

	public City() {
		super();
		// TODO Auto-generated constructor stub
	}


	public City(int cityid, String cityname, States states) {
		super();
		this.cityid = cityid;
		this.cityname = cityname;
		this.states = states;
//		for(Customer c: customers)
//			c.setCities(this);
//		this.customers = customers;
	}


	public int getCityid() {
		return cityid;
	}


	public void setCityid(int cityid) {
		this.cityid = cityid;
	}


	public String getCityname() {
		return cityname;
	}


	public void setCityname(String cityname) {
		this.cityname = cityname;
	}


	public States getStates() {
		return states;
	}


	public void setStates(States states) {
		this.states = states;
	}

//
//	public Set<Customer> getCustomers() {
//		return customers;
//	}
//
//
//	public void setCustomers(Set<Customer> customers) {
//		for(Customer c: customers)
//			c.setCities(this);
//		this.customers = customers;
//	}

	
	
}
