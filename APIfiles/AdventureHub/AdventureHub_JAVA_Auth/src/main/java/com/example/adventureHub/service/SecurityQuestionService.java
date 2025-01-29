package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.SecurityQuestion;
import com.example.adventureHub.repository.SecurityQuestionRepository;

@Service
public class SecurityQuestionService {
	
	@Autowired
	SecurityQuestionRepository sqrepo;
	
	public List<SecurityQuestion> getAllSecurityQuestions(){
		return sqrepo.findAll();
	}
	
	public SecurityQuestion getSecurityQuestionById(int secId){
		return sqrepo.findById(secId).get();
	}
}
