package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adventureHub.entity.Customer;
import com.example.adventureHub.entity.User;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
	public Customer findCustomerByUser(User u);
}
