package com.dbms.project.repository;

import com.dbms.project.models.Filter;
import com.dbms.project.models.Lens;
import com.dbms.project.models.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@Configuration
@RequiredArgsConstructor
public class ShopRepository {
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public Filter getOptions(String category) {
        String sql = "SELECT DISTINCT brand FROM products WHERE product_type = ?";
        Filter filter = new Filter();
        filter.setCategory(category);
        filter.setBrand(jdbcTemplate.queryForList(sql, String.class, category));
        sql = "SELECT DISTINCT color FROM products WHERE product_type = ?";
        filter.setColor(jdbcTemplate.queryForList(sql, String.class, category));
        return filter;
    }

    public List<Product> getProducts(String category, List<String> brand, List<String> color, int limit) {
        String sql = "SELECT * FROM products WHERE product_type = :category"
                + (brand.isEmpty() ? "" : " AND brand IN (:brand)")
                + (color.isEmpty() ? "" : " AND color IN (:color)")
                + " LIMIT :limit";
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("category", category);
        parameters.addValue("brand", brand);
        parameters.addValue("color", color);
        parameters.addValue("limit", limit);
        return namedParameterJdbcTemplate.query(sql, parameters, new BeanPropertyRowMapper<>(Product.class));
    }

    public Product getProduct(String id) {
        String sql = "SELECT * FROM products WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Product.class), id);
    }
    
    public List<Lens> getLenses() {
        return jdbcTemplate.query("SELECT * FROM lens", new BeanPropertyRowMapper<>(Lens.class));
    }
}
