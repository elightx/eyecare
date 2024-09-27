package com.dbms.project.repository;

import java.util.List;
import java.util.Optional;

import com.dbms.project.models.Role;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.dbms.project.models.User;
import org.springframework.stereotype.Repository;


@Repository
@Configuration
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";
        List<User> users = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class), email);
        return users.stream().findFirst();
    }


    public Optional<User> findById(String id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        List<User> users = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class), id);
        return users.stream().findFirst();
    }

    public User saveUser(User user) {
    	String sql = "INSERT INTO users (name, email, passwd, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)";
    	int rowsAffected = jdbcTemplate.update(sql, user.getName(), user.getEmail(), user.getPasswd(), user.getPhone(), user.getAddress(), user.getRole().name());
        if (rowsAffected == 0) return null;
        return findByEmail(user.getEmail()).orElse(null);
    }

    public boolean adminExists(Role role) {
        String sql = "SELECT * FROM users WHERE role = ?";
        List<User> users = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(User.class), role.name());
        return !users.isEmpty();
    }

    public boolean updateName(String userId, String name) {
        String sql = "UPDATE users SET name = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, name, userId);
        return rowsAffected != 0;
    }

    public boolean updateAddress(String userId, String address) {
        String sql = "UPDATE users SET address = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, address, userId);
        return rowsAffected != 0;
    }

    public boolean updatePhone(String userId, String phone) {
        String sql = "UPDATE users SET phone = ? WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, phone, userId);
        return rowsAffected != 0;
    }
}
