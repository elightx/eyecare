package com.dbms.project.dto;

import lombok.Data;

@Data
public class SignInRequest {
    private String email;
    private String passwd;
}
