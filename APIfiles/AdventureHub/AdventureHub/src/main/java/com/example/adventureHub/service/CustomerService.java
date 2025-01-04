package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.Customer;
import com.example.adventureHub.repository.CustomerRepository;


@Service
public class CustomerService {

	@Autowired
	CustomerRepository crepo;
	
	public Customer registerNewCustomer(Customer c){
		return crepo.save(c);
	}
	
	public List<Customer> getAll()
	{
		List<Customer> custs =crepo.findAll();
		if(custs!=null) return custs;
		return null;
	}
	
}

