package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.Role;
import com.example.adventureHub.service.RoleService;
@CrossOrigin
@RestController
public class RoleController {

	@Autowired
	RoleService rservice;
	
	@GetMapping("getAllRoles")
	public List<Role> getAllRoles(){
		return rservice.getAllRoles();
	}
	
	@GetMapping("getRoleByRoleId")
	public Role getRoleByRoleId(@RequestParam int rid) {
		return rservice.getRoleById(rid);
	}
}
