package com.dbms.project.services.impl;

import com.dbms.project.dto.JWTAuthenticationResponse;
import com.dbms.project.dto.RefreshTokenRequest;
import com.dbms.project.dto.SignInRequest;
import com.dbms.project.models.Role;
import com.dbms.project.models.User;
import com.dbms.project.repository.UserRepository;
import com.dbms.project.dto.SignUpRequest;
import com.dbms.project.services.AuthenticationService;
import com.dbms.project.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public User signUp(SignUpRequest signUpRequest) {
        User user = new User();

        user.setEmail(signUpRequest.getEmail());
        user.setName(signUpRequest.getName());
        user.setAddress(signUpRequest.getAddress());
        user.setPhone(signUpRequest.getPhone());
        user.setPasswd(passwordEncoder.encode(signUpRequest.getPasswd()));
        user.setRole(Role.GUEST);

        return userRepository.saveUser(user);
    }

    public JWTAuthenticationResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInRequest.getEmail(),
                signInRequest.getPasswd()));
        var user = userRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);

        JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshToken);
        return jwtAuthenticationResponse;
    }

    public JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getRefreshToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));
        if (!jwtService.isTokenValid(refreshTokenRequest.getRefreshToken(), user)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }
        var jwt = jwtService.generateToken(user);
        JWTAuthenticationResponse jwtAuthenticationResponse = new JWTAuthenticationResponse();
        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setRefreshToken(refreshTokenRequest.getRefreshToken());
        return jwtAuthenticationResponse;
    }
}
