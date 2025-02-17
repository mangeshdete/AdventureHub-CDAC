package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	private UserRepository urepo;
	
	@Autowired
	private CustomerRepository custRepo;
	
	@Autowired
	private OrganiserRepository orgRepo;
	
	@Autowired
	private SecurityQuestionRepository secRepo;
		
	@Autowired
	private UserServices service;
	
	public List<User> getAll(){
		return urepo.findAll();
	}
	
	public User save(User u) {
		String encryptedPassword = service.encryptPassword(u.getPassword());
		u.setPassword(encryptedPassword);
		return urepo.save(u);
	}
	
	public Object login(String email, String password) {
		User user=urepo.findUserByEmail(email);
		if(user!=null) 
		{
			boolean flag = false;
			flag=service.checkPassword(password, user.getPassword());
			System.out.println(flag);
			if(flag) 
			{
				if(user.getRoleid().getRoleid()==3)
					return user;
				
				Object obj = custRepo.findCustomerByUser(user);
				
				if(obj!=null)
					return obj;
				
				return orgRepo.findOrganiserByUser(user);
			}
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
		return urepo.updateUserPassword(email, service.encryptPassword(password));
	}
}
