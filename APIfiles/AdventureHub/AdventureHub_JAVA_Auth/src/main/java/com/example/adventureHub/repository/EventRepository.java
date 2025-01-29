package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adventureHub.entity.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

}
