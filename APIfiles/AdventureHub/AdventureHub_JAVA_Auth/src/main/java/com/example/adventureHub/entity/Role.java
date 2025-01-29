package com.example.adventureHub.entity;

import java.util.Set;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="role")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int roleid;
	String rolename;
	
	@JsonIgnoreProperties("roleid")
	@OneToMany(mappedBy = "roleid")
	@Cascade(value = CascadeType.ALL)
	Set<User> usertype;

	public Role() {
		super();
	}

	public Role(int roleid, String rolename, Set<User> usertype) {
		super();
		this.roleid = roleid;
		this.rolename = rolename;
		for(User u: usertype)
			u.setRoleid(this);
		this.usertype = usertype;
	}

	public int getRoleid() {
		return roleid;
	}

	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public Set<User> getUsertype() {
		return usertype;
	}

	public void setUsertype(Set<User> usertype) {
		for(User u: usertype)
			u.setRoleid(this);
		this.usertype = usertype;
	}
	
	
}
