package com.example.onboarding.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.User;
import com.example.onboarding.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
 
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }
    public User createUser(User u){
        return userRepository.save(u);
    }
}