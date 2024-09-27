package com.dbms.project.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String name;
    private String email;
    private String passwd;
    private String phone;
    private String address;
}
