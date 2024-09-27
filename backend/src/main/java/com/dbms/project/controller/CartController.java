package com.dbms.project.controller;

import com.dbms.project.dto.AddProduct;
import com.dbms.project.models.CartItem;
import com.dbms.project.repository.CartRepository;
import com.dbms.project.services.JWTService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/cart", produces = MediaType.APPLICATION_JSON_VALUE)
public class CartController {
    private final CartRepository cartRepository;
    private final JWTService jwtService;

    @PostMapping("/add")
    public boolean addProduct(@RequestBody AddProduct addProduct, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return cartRepository.addProduct(userId, addProduct.getProductId(), addProduct.getLensId(), addProduct.getQuantity());
    }

    @GetMapping("/get")
    public List<CartItem> getCart(@RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return cartRepository.getCart(userId);
    }


    @Data
    private static class UpdateProduct {
        private String id;
        private int quantity;
    }
    @PostMapping("/quantity")
    public boolean updateQuantity(@RequestBody UpdateProduct updateProduct, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return cartRepository.updateQuantity(userId, updateProduct.getId(), updateProduct.getQuantity());
    }
}
