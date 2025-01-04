package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.Customer;
import com.example.adventureHub.service.CustomerService;

@CrossOrigin
@RestController
public class CustomerController {

	@Autowired
	CustomerService cservice;
	
	@PostMapping("/registerNewCustomer")
	public Customer registerNewCustomer(@RequestBody Customer c) {
		Customer cust = cservice.registerNewCustomer(c);
		if(cust!=null)
			return cust;
		return null;
	}
	
	@GetMapping("/getAllCustomers")
	public List<Customer>getAll(){
		return cservice.getAll();
	}
}
