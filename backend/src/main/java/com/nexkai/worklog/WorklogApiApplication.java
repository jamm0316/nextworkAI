package com.nexkai.worklog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class WorklogApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorklogApiApplication.class, args);
	}

}
