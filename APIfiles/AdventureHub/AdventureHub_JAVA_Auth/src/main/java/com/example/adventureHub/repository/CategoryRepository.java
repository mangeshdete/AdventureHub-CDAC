package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adventureHub.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
