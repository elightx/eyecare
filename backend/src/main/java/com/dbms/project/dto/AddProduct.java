package com.dbms.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AddProduct {
    private String productId;
    private String lensId;
    private int quantity;
}
