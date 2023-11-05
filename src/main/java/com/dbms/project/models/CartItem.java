package com.dbms.project.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CartItem {
    public String id;
    public int quantity;
    public Product product;
    public Lens lens;
}
