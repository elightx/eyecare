package com.dbms.project.services.impl;

import com.dbms.project.repository.UserRepository;
import com.dbms.project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                var user = userRepository.findByEmail(username);
                if (user.isPresent()) {
                    return user.get();
                }
                user = userRepository.findById(username);
                if (user.isPresent()) {
                    return user.get();
                }
                throw new UsernameNotFoundException("User not found");
            }
        };
    }
}
