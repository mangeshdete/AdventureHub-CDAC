package com.example.adventureHub.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="organisers")
public class Organiser{

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int organiserid;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="userid")
	private User user;
	
	private String orgname;
	private String gst;
	private String pancard;
	private String street;
	
	@ManyToOne
	@JoinColumn(name="cityid")
	private City city;
	
	private String pincode;

	public Organiser() {
		super();
	}

	public Organiser(int organiserid, User user, String orgname, String gst, String pancard, String street, City city,
			String pincode) {
		super();
		this.organiserid = organiserid;
		this.user = user;
		this.orgname = orgname;
		this.gst = gst;
		this.pancard = pancard;
		this.street = street;
		this.city = city;
		this.pincode = pincode;
	}

	public int getOrganiserid() {
		return organiserid;
	}

	public void setOrganiserid(int organiserid) {
		this.organiserid = organiserid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getOrgname() {
		return orgname;
	}

	public void setOrgname(String orgname) {
		this.orgname = orgname;
	}

	public String getGst() {
		return gst;
	}

	public void setGst(String gst) {
		this.gst = gst;
	}

	public String getPancard() {
		return pancard;
	}

	public void setPancard(String pancard) {
		this.pancard = pancard;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}
}
