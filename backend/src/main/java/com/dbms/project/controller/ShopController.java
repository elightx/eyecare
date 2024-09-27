package com.dbms.project.controller;

import java.util.List;

import com.dbms.project.dto.ProductId;
import com.dbms.project.dto.ShopRequest;
import com.dbms.project.models.Filter;
import com.dbms.project.models.Lens;
import com.dbms.project.models.Product;
import com.dbms.project.models.ProductType;
import com.dbms.project.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api/shop", produces = MediaType.APPLICATION_JSON_VALUE)
public class ShopController {

    private final ShopRepository shopRepository;

    @PostMapping("/options")
    public Filter getOptions(@RequestBody ShopRequest shopRequest) {
        String category = shopRequest.getCategory();
        return shopRepository.getOptions(category);
    }

    @PostMapping("/products")
    public List<Product> getProducts(@RequestBody Filter filter) {
        String category = filter.getCategory();
        List<String> brand = filter.getBrand();
        List<String> color = filter.getColor();
        int limit = filter.getLimit();
        return shopRepository.getProducts(category, brand, color, limit);
    }

    @PostMapping("/product")
    public Product getProduct(@RequestBody ProductId productId) {
        return shopRepository.getProduct(productId.getId());
    }

    @GetMapping("/lenses")
    public List<Lens> getLenses() {
        return shopRepository.getLenses();
    }

}
