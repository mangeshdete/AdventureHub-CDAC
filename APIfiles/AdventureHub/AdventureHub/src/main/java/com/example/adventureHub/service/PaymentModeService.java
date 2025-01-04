package com.example.adventureHub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adventureHub.repository.PaymentModeRepository;

@Service
public class PaymentModeService {
	
	@Autowired
	PaymentModeRepository pmrepo;
}
