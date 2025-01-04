package com.example.adventureHub.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="categories")
public class Category {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int categoryid;
	String categoryname;
	
	@JsonIgnoreProperties("category")
	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
	private List<Event> events;
	
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(int categoryid, String categoryname, List<Event> events) {
		super();
		this.categoryid = categoryid;
		this.categoryname = categoryname;
		for(Event e: events)
			e.setCategory(this);
		this.events = events;
	}

	public int getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(int categoryid) {
		this.categoryid = categoryid;
	}

	public String getCategoryname() {
		return categoryname;
	}

	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		for(Event e: events)
			e.setCategory(this);
		this.events = events;
	}
}
