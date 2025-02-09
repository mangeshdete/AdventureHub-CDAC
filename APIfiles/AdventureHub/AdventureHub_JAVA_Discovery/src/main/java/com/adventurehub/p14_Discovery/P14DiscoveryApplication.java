package com.adventurehub.p14_Discovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableEurekaServer
public class P14DiscoveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(P14DiscoveryApplication.class, args);
	}

}
