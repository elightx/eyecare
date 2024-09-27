package com.dbms.project.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dbms.project.repository.HomeRepository;

import lombok.Data;



@RestController
@RequestMapping(value="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class HelloController {

    private final HomeRepository homeRepository;

    public HelloController(HomeRepository homeRepository) {
        this.homeRepository = homeRepository;
    }

    class Person {
        public String name;
        public int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
    }

    Person p = new Person("person", 20);

    @GetMapping("/hello")
    public HelloController.Person hello() {

        // homeRepository.Insert(2, "Hello2");

        return p;
    }

    @Data
    public static class Fizzle {
        private List<String> foo;
        private boolean bar;
        private int baz;

        public Fizzle(Fizzle input) {
            this.foo = input.foo;
            this.bar = input.bar;
            this.baz = input.baz;
        }

        public Fizzle(List<String> foo, boolean bar, int baz) {
            this.foo = foo;
            this.bar = bar;
            this.baz = baz;
        }
    }

    Fizzle f = new Fizzle(List.of("foo", "bar"), true, 1);

    @PostMapping("/hello2")
    @ResponseBody
    public Fizzle Display(@RequestBody Fizzle input) {
        // Optional < User > user = homeRepository.findUser(1);
        // model.addAttribute("user", user.get());

        // return "received";
        // Fizzle f = new Fizzle(input);

        return input;
    }
}
