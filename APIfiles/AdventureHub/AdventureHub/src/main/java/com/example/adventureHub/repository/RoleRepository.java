package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adventureHub.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
