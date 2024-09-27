package com.dbms.project.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Filter {
    private String category;
    private List<String> brand;
    private List<String> color;
    private int limit;
}
