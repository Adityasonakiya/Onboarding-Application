package com.example.onboarding.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.LoginDTO;
import com.example.onboarding.model.User;
import com.example.onboarding.repository.UserRepository;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public void createUser(User user) {
        if (user == null) {
            logger.error("User object is null");
            throw new IllegalArgumentException("User object cannot be null");
        }

        if (userRepository.findByPsid(user.getPsid()).isPresent()) {
            logger.error("Username already exists: {}", user.getPsid());
            throw new RuntimeException("Username already exists");
        }

        userRepository.save(user);
        logger.info("User created successfully: {}", user.getPsid());
    }

    
    public User loginUser(LoginDTO loginDTO) {
        Optional<User> optionalUser = userRepository.findByPsid(loginDTO.getPsid());

        if (!optionalUser.isPresent()) {
            logger.error("Invalid username");
        }

        User user = optionalUser.get();
        if (!user.getPassword().equals(loginDTO.getPassword())) {
            logger.error("Invalid credentials for user: {}", loginDTO.getPsid());
            throw new RuntimeException("Invalid credentials");
        }
        logger.info("User logged in successfully: {}", loginDTO.getPsid());
        return user;
    }

}