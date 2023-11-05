package com.dbms.project.controller;


import com.dbms.project.dto.ProductId;
import com.dbms.project.models.Wishlist;
import com.dbms.project.repository.WishlistRepository;
import com.dbms.project.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/wishlist", produces = MediaType.APPLICATION_JSON_VALUE)
public class WishlistController {

    private final JWTService jwtService;
    private final WishlistRepository wishlistRepository;

    @PostMapping("/add")
    public boolean addWishlist(@RequestBody ProductId productId, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return wishlistRepository.addProduct(userId, productId.getId());
    }

    @PostMapping("/remove")
    public boolean removeWishlist(@RequestBody ProductId productId, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return wishlistRepository.removeProduct(userId, productId.getId());
    }

    @PostMapping("/product")
    public boolean isProductInWishlist(@RequestBody ProductId productId, @RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return wishlistRepository.toggleProduct(userId, productId.getId());
    }

    @GetMapping("/get")
    public List<Wishlist> getWishlist(@RequestHeader("Authorization") String token) {
        String userId = jwtService.extractUserName(token.substring(7));
        return wishlistRepository.getWishlist(userId);
    }
}
