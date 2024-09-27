package com.dbms.project.repository;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.dbms.project.models.User;


@Configuration
public class HomeRepository {
    private final JdbcTemplate jdbcTemplate;
    public HomeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // public void Insert(long id, String name) {
    //     jdbcTemplate.update("insert into users (id, name) values (?,?)",id,name);
    // }

    // public Optional<User> findUser(long id) {
    //     List<User> users = jdbcTemplate.query(
    //         "select * from users where id = ?",
    //         new BeanPropertyRowMapper<>(User.class),
    //         id
    //     );
    //     return (users.isEmpty() ? Optional.empty() : Optional.of(users.get(0)));
    // }

    public List<User> findAllUsers() {
        return jdbcTemplate.query(
            "select * from users",
            new BeanPropertyRowMapper<>(User.class)
        );
    }
}
