package com.dbms.project.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class Product {
    private String id;
    private String name;
    private String brand;
    private double price;
    private String image;
    private String color;
    private String description;
    private Date createdAt;
    private ProductType ProductType;
}
