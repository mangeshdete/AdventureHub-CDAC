package com.example.adventureHub.entity;

import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int userid;
	String password;
	String contact;
	String email;
	String securityqans;
	
	@JsonIgnoreProperties("usertype")
	@ManyToOne
	@JoinColumn(name="roleid")
	Role roleid;
	
//	@JsonIgnoreProperties("users")
	@ManyToOne
	@JoinColumn(name="securityqid")
	SecurityQuestion questions;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(int userid, String password, String contact, String email, String securityqans,
			Role roleid, SecurityQuestion questions) {
		super();
		this.userid = userid;
		this.password = password;
		this.contact = contact;
		this.email = email;
		this.securityqans = securityqans;
		this.roleid = roleid;
		this.questions = questions;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSecurityqans() {
		return securityqans;
	}

	public void setSecurityqans(String securityqans) {
		this.securityqans = securityqans;
	}

	public Role getRoleid() {
		return roleid;
	}

	public void setRoleid(Role roleid) {
		this.roleid = roleid;
	}

	public SecurityQuestion getQuestions() {
		return questions;
	}

	public void setQuestions(SecurityQuestion questions) {
		this.questions = questions;
	}

}
