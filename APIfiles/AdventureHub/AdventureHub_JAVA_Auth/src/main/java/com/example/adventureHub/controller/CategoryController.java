package com.example.adventureHub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.entity.Category;
import com.example.adventureHub.service.CategoryService;

@RestController
public class CategoryController {
	
	@Autowired
	CategoryService cservice;
	
	@GetMapping("getAllCategories")
	public List<Category> getAllCategories(){
		return cservice.getAllCategories();
	}
	
	@GetMapping("getCategoryById")//?catid={value}
	public Category getCategoryByCategoryId(@RequestParam int catid) {
		return cservice.getCategoryById(catid);
	}
}
