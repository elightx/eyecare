package com.dbms.project.repository;


import com.dbms.project.models.Wishlist;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Configuration
@RequiredArgsConstructor
public class WishlistRepository {

    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public boolean addProduct(String userId, String id) {
        String sql = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
        int rowsAffected = jdbcTemplate.update(sql, userId, id);
        return rowsAffected != 0;
    }

    public boolean removeProduct(String userId, String id) {
        String sql = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";
        int rowsAffected = jdbcTemplate.update(sql, userId, id);
        return rowsAffected != 0;
    }

    public List<Wishlist> getWishlist(String userId) {
        String sql = "SELECT * FROM wishlist WHERE user_id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Wishlist.class), userId);
    }

    public boolean toggleProduct(String userId, String id) {
        String sql = "SELECT COUNT(*) FROM wishlist WHERE user_id = ? AND product_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, userId, id);
        if (count == 0) {
            sql = "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)";
            int rowsAffected = jdbcTemplate.update(sql, userId, id);
            return rowsAffected != 0;
        } else {
            sql = "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?";
            int rowsAffected = jdbcTemplate.update(sql, userId, id);
            return rowsAffected != 0;
        }
    }
}
