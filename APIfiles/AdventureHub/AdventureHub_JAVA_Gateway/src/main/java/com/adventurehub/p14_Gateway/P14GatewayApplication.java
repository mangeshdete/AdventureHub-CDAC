package com.adventurehub.p14_Gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableDiscoveryClient
public class P14GatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(P14GatewayApplication.class, args);
	}
}
