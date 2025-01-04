package com.example.adventureHub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adventureHub.entity.PaymentMode;

public interface PaymentModeRepository extends JpaRepository<PaymentMode, Integer> {

}
