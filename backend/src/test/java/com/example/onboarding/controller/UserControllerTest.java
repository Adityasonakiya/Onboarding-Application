package com.example.onboarding.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.onboarding.model.LoginDTO;
import com.example.onboarding.model.User;
import com.example.onboarding.service.UserService;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    public void testCreateUser() throws Exception {
        User user = new User();
        user.setPsid(1);
        user.setPassword("password123");

        Mockito.doNothing().when(userService).createUser(user);

        mockMvc.perform(post("/api/users/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"psid\":1,\"password\":\"password123\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    public void testGetUserById_UserFound() throws Exception {
        int userId = 1;
        User user = new User();
        user.setPsid(userId);
        user.setPassword("password123");
        user.setRoleId(2);
        user.setUserManagerId(100);

        Mockito.when(userService.getUserById(userId)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/{id}", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.psid").value(userId));
    }

    @Test
    public void testGetUserById_UserNotFound() throws Exception {
        int userId = 2;

        // Mock the service response to return empty Optional
        Mockito.when(userService.getUserById(userId)).thenReturn(Optional.empty());

        // Perform GET request
        mockMvc.perform(get("/api/users/{id}", userId))
                .andExpect(status().isNotFound()); // Expect HTTP 404 NOT FOUND
    }

    @Test
    public void testLoginUser() throws Exception {
        LoginDTO loginDTO = new LoginDTO(1, "password123");
        User user = new User();
        user.setPsid(1);

        Mockito.when(userService.loginUser(Mockito.any())).thenReturn(user);

        mockMvc.perform(post("/api/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"psid\":1,\"password\":\"password123\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testLogoutUser() throws Exception {
        LoginDTO loginDTO = new LoginDTO(1, "password123");
        User user = new User();
        user.setPsid(1);

        Mockito.when(userService.getUserById(Mockito.anyInt())).thenReturn(Optional.of(user));

        mockMvc.perform(post("/api/users/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"psid\":1,\"password\":\"password123\"}"))
                .andExpect(status().isOk());
    }
}
