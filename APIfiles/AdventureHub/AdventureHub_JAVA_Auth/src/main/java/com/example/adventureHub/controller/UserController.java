package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.SecurityQuestion;
import com.example.adventureHub.entity.User;
import com.example.adventureHub.entity.UserLoginByEmailAndPassword;
import com.example.adventureHub.service.UserService;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	UserService uservice;
	
	@GetMapping("/getAllUsers")
	public List<User> getAllUsers(){
		return uservice.getAll();
	}
	
	@GetMapping("getUserByEmailId")
	public ResponseEntity<Boolean> getUserByEmailId(@RequestParam String email){
		User u = uservice.getUserByEmailId(email);
		if(u != null)
			return ResponseEntity.ok(true);
		return ResponseEntity.ok(false);
	}
	
	@PostMapping("userLogin")
	public ResponseEntity<Object> userLogin(@RequestBody UserLoginByEmailAndPassword data) {
		Object u= uservice.login(data.getEmail(),data.getPassword());
		if(u!=null)
			return ResponseEntity.ok(u);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("getSecurityQuestionByEmailId")
	public ResponseEntity<SecurityQuestion> getSecurityQuestionByEmailId(@RequestParam String email){
		SecurityQuestion que = uservice.getSecurityQuestionOfUser(email);
		if(que!=null)
			return ResponseEntity.ok(que);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("getSecurityAnswerByEmailId")
	public ResponseEntity<String> getSecurityAnswerByEmail(@RequestParam String email){
		String ans = uservice.getSecurityQuestionAnswerByEmail(email);
		if(ans!=null)
			return ResponseEntity.ok(ans);
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping("resetPassword")
	public ResponseEntity<Integer> resetPassword(@RequestBody UserLoginByEmailAndPassword data){
		int result =  uservice.updateUserPassword(data.getEmail(), data.getPassword());
		if(result!=0)//password update successful
			return ResponseEntity.ok(result);
		return ResponseEntity.noContent().build();
	}
}












