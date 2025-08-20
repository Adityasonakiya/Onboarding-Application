package com.example.onboarding.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.LoginDTO;
import com.example.onboarding.model.User;
import com.example.onboarding.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        try {
            Optional<User> user = userService.getUserById(id);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace(); // This will print the real cause of the 500 error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        try {
            userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginDTO loginDTO) {
        User user = userService.loginUser(loginDTO);
        if (user != null) {
            return ResponseEntity.status(HttpStatus.OK).body("User Logged in successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> payload) {
        String psid = payload.get("psid");
        // Optional: log logout event or clear any cached data
        return ResponseEntity.ok("Logged out successfully");
    }

    // @PostMapping("/logout")
    // public ResponseEntity<?> logout(@RequestBody LoginDTO loginDTO) {
    //     Optional<User> optionalUser = userService.getUserById(loginDTO.getPsid());
    //     if (optionalUser.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username");
    //     }
    //     User user = optionalUser.get();
    //     userService.logoutUser(user);
    //     return ResponseEntity.ok("User logged out successfully");
    // }
}
