package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.onboarding.model.LoginDTO;
import com.example.onboarding.model.User;
import com.example.onboarding.repository.UserRepository;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    private User user;

    // @BeforeEach
    // public void setUp() {
    //     MockitoAnnotations.openMocks(this);
    //     user = new User();
    //     user.setPsid(1);
    //     user.setPassword("password123");
    // }

    
    // @Test
    // public void testCreateUser() {
    //     when(userRepository.findByPsid(user.getPsid())).thenReturn(Optional.empty());
        
    //     userService.createUser(user);
    //     verify(userRepository, times(1)).save(user);
    // }
    
    // @Test
    // public void testGetUserById() {
    //     int userId = 1;
    //     when(userRepository.findById(userId)).thenReturn(Optional.of(user));

    //     Optional<User> result = userService.getUserById(userId);
    //     assertTrue(result.isPresent());
    //     assertEquals(userId, result.get().getPsid());
    //     verify(userRepository, times(1)).findById(userId);
    // }
    // @Test
    // public void testLoginUser() {
    //     LoginDTO loginDTO = new LoginDTO(1, "password123");
    //     when(userRepository.findByPsid(loginDTO.getPsid())).thenReturn(Optional.of(user));

    //     User result = userService.loginUser(loginDTO);
    //     assertNotNull(result);
    //     assertEquals(1, result.getPsid());
    //     verify(userRepository, times(1)).save(user);
    // }

    // @Test
    // public void testLogoutUser() {
    //     userService.logoutUser(user);
    //     assertNotNull(user.getLastLogout()); // Check if timestamp is set
    //     verify(userRepository, times(1)).save(user);
    // }
}
