package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.Customer;
import com.example.adventureHub.entity.User;
import com.example.adventureHub.repository.CustomerRepository;


@Service
public class CustomerService {

	@Autowired
	private CustomerRepository crepo;
	
	@Autowired
	private UserServices service;
	
	public Customer registerNewCustomer(Customer c){
		c.getUser().setPassword(service.encryptPassword(c.getUser().getPassword()));
		return crepo.save(c);
	}
	
	public List<Customer> getAll()
	{
		List<Customer> custs =crepo.findAll();
		if(custs!=null) return custs;
		return null;
	}
	
}

