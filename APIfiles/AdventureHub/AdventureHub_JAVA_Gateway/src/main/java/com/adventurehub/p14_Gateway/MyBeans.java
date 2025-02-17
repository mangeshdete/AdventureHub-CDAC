package com.adventurehub.p14_Gateway;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

 import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class MyBeans {
	// Default URL where requests from React will be sent
	// http://localhost:8140/
	@Bean
	public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("p14Auth", r -> r.path("/auth/**")// when 'auth' will be appended to the default URL, send the request to service named 'p14Auth'
						 .uri("http://localhost:8142"))
//						.uri("lb://p14Auth"))

				.route("p14Organiser", r -> r.path("/organiser/**")// when 'organiser' will be appended to the default URL, send the request to service named 'p14Organiser'
						 .uri("http://localhost:9143"))
//						.uri("lb://p14Organiser"))

				.route("p14Customer", r -> r.path("/customer/**")// when 'customer' will be appended to the default URL, send the request to service named 'p14Organiser'
						 .uri("http://localhost:9144"))
//						.uri("lb://p14Customer"))

				.route("p14Admin", r -> r.path("/admin/**")// when 'admin' will be appended to the default URL, send the request to service named 'p14Admin'
						 .uri("http://localhost:9145"))
//						.uri("lb://p14Admin"))
				.build();

	}

	@Bean
	public CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOriginPatterns(Arrays.asList("http://localhost:3014")); // Frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
	    config.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    
	    source.registerCorsConfiguration("/auth/**", config);
	    source.registerCorsConfiguration("/organiser/**", config);
	    source.registerCorsConfiguration("/customer/**", config);
	    source.registerCorsConfiguration("/admin/**", config);

	    return new CorsWebFilter(source);
	}


}
