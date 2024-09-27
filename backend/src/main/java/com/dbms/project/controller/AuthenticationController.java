package com.dbms.project.controller;

import com.dbms.project.dto.JWTAuthenticationResponse;
import com.dbms.project.dto.RefreshTokenRequest;
import com.dbms.project.dto.SignInRequest;
import com.dbms.project.models.User;
import com.dbms.project.dto.SignUpRequest;
import com.dbms.project.services.AuthenticationService;
import com.dbms.project.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        User signUpResponse = null;
        try {
            signUpResponse = authenticationService.signUp(signUpRequest);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

        if (signUpResponse == null)
            return ResponseEntity.badRequest().build();

        return ResponseEntity.ok().build();
    }

    @PostMapping("/signin")
    public ResponseEntity<JWTAuthenticationResponse> signIn(@RequestBody SignInRequest signInRequest) {
        System.out.println(signInRequest.getEmail() + " " + signInRequest.getPasswd());
        try {
            return ResponseEntity.ok().body(authenticationService.signIn(signInRequest));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

/*
    @PostMapping("/refresh")
    public ResponseEntity<JWTAuthenticationResponse> signIn(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            return ResponseEntity.ok().body(authenticationService.refreshToken(refreshTokenRequest));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
*/
}
