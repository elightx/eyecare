package com.dbms.project.services;

import com.dbms.project.dto.JWTAuthenticationResponse;
import com.dbms.project.dto.RefreshTokenRequest;
import com.dbms.project.dto.SignInRequest;
import com.dbms.project.models.User;
import com.dbms.project.dto.SignUpRequest;

public interface AuthenticationService {
    User signUp(SignUpRequest signUpRequest);
    JWTAuthenticationResponse signIn(SignInRequest signInRequest);

    JWTAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
