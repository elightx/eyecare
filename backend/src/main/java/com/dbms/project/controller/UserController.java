package com.dbms.project.controller;

import com.dbms.project.models.User;
import com.dbms.project.repository.UserRepository;
import com.dbms.project.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final JWTService jwtService;

    @GetMapping("/get")
    public User getUser(@RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/setName")
    public boolean setName(@RequestBody String name, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return userRepository.updateName(userId, name);
    }

    @PostMapping("/setAddress")
    public boolean setAddress(@RequestBody String address, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return userRepository.updateAddress(userId, address);
    }

    @PostMapping("/setPhone")
    public boolean setPhone(@RequestBody String phone, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return userRepository.updatePhone(userId, phone);
    }
}
