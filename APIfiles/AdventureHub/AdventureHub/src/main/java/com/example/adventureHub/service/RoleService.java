package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.Role;
import com.example.adventureHub.repository.RoleRepository;

@Service
public class RoleService {
	
	@Autowired
	RoleRepository rrepo;
	
	public List<Role> getAllRoles(){
		return rrepo.findAll();
	}
	
	public Role getRoleById(int rid) {
		return rrepo.findById(rid).get();
	}
}
