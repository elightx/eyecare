package com.dbms.project;

import com.dbms.project.models.Role;
import com.dbms.project.models.User;
import com.dbms.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ProjectApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

	public void run(String... args) {
		if (userRepository.adminExists(Role.ADMIN)) return;
		User user = new User();
		user.setEmail("admin@gmail.com");
		user.setName("Admin");
		user.setAddress("Admin Address");
		user.setPhone("1234567890");
		user.setRole(Role.ADMIN);
		user.setPasswd(new BCryptPasswordEncoder().encode("admin"));
		userRepository.saveUser(user);
	}
}
