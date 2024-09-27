package com.dbms.project.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class Order {
    private String id;
    private int amount;
    private Date createdAt;
    private String address;
}
