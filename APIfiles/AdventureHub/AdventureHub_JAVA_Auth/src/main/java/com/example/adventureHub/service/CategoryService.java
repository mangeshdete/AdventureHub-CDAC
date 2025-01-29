package com.example.adventureHub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.entity.Category;
import com.example.adventureHub.entity.Event;
import com.example.adventureHub.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepository crepo;
	
	public List<Category> getAllCategories(){
		return crepo.findAll();
	}
	
	public Category getCategoryById(int catId) {
		return crepo.findById(catId).get();
	}
}
