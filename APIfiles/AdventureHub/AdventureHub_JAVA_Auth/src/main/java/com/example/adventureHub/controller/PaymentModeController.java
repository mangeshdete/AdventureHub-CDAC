package com.example.adventureHub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.adventureHub.service.PaymentModeService;

@RestController
public class PaymentModeController {
	
	@Autowired
	PaymentModeService pmservice;
}
