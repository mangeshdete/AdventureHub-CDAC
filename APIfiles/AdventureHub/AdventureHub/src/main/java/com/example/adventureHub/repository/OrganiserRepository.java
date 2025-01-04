package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adventureHub.entity.Organiser;
import com.example.adventureHub.entity.User;

public interface OrganiserRepository extends JpaRepository<Organiser, Integer> {

	public Organiser findOrganiserByUser(User u);
}
