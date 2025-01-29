package com.example.adventureHub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="events")
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int eventid;
	@Column(name="eventname")
	private String eventName;
	
	@JsonIgnoreProperties("events")
	@ManyToOne
	@JoinColumn(name="categoryid")
	private Category category;

	public Event() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Event(int eventid, String eventName, Category category) {
		super();
		this.eventid = eventid;
		this.eventName = eventName;
		this.category = category;
	}

	public int getEventid() {
		return eventid;
	}

	public void setEventid(int eventid) {
		this.eventid = eventid;
	}

	public String getEventName() {
		return eventName;
	}

	public void setEventName(String eventName) {
		this.eventName = eventName;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}
}
