package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.SecurityQuestion;
import com.example.adventureHub.service.SecurityQuestionService;

@CrossOrigin
@RestController
public class SecurityQuestionController {
	
	@Autowired
	SecurityQuestionService sqservice;
	
	@GetMapping("getAllSecurityQuestions")
	public List<SecurityQuestion> getAllSecurityQuestions(){
		return sqservice.getAllSecurityQuestions();
	}
	
	@GetMapping("getSecurityQuestionById")//this url should have ?sqid={value} appended
	public SecurityQuestion getSecurityQuestionById(@RequestParam int sqid) {
		return sqservice.getSecurityQuestionById(sqid);
	}
}
