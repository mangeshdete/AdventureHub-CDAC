package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.SecurityQuestion;
import com.example.adventureHub.entity.User;
import com.example.adventureHub.repository.CustomerRepository;
import com.example.adventureHub.repository.OrganiserRepository;
import com.example.adventureHub.repository.SecurityQuestionRepository;
import com.example.adventureHub.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository urepo;
	
	@Autowired
	CustomerRepository custRepo;
	
	@Autowired
	OrganiserRepository orgRepo;
	
	@Autowired
	SecurityQuestionRepository secRepo;
	
	public List<User> getAll(){
		return urepo.findAll();
	}
	
	public User save(User u) {
		return urepo.save(u);
	}
	
	public Object login(String email, String password) {
		User u = urepo.login(email, password);
		if(u!=null) {
			Object obj = custRepo.findCustomerByUser(u);
			
			if(obj!=null)
				return obj;
			
			return orgRepo.findOrganiserByUser(u);
		}
		return null;
	}
	
	public User getUserByEmailId(String email) {
		return urepo.findUserByEmail(email);
	}
	
	public SecurityQuestion getSecurityQuestionOfUser(String email) {
		User u = urepo.findUserByEmail(email);
		if(u!=null)
		return secRepo.getSecurityQuestionByUsers(u.getUserid());
		return null;
	}
	
	public String getSecurityQuestionAnswerByEmail(String email) {
		return urepo.findSecurityqansByEmail(email);
	}
	
	public int updateUserPassword(String email, String password) {
		return urepo.updateUserPassword(email, password);
	}
}
