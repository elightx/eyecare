package com.dbms.project.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Discount {
    private String id;
    private int percentage;
    private int maxLimit;
    private String code;
}
