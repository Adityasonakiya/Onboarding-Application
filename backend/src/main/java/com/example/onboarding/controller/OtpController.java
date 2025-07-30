package com.example.onboarding.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.Employee;
import com.example.onboarding.service.EmployeeService;
import com.example.onboarding.service.OtpService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class OtpController {

    private final OtpService otpService;
    private final EmployeeService employeeService;

    public OtpController(OtpService otpService, EmployeeService employeeService) {
        this.otpService = otpService;
        this.employeeService = employeeService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }

        boolean sent = otpService.sendOtp(email);
        if (sent) {
            return ResponseEntity.ok("OTP sent successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send OTP");
        }
    }

    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
        String psid = payload.get("psid");
        String otp = payload.get("otp");

        // Employee employee = employeeService.getEmployeeByPsid(Integer.parseInt(psid));
        // String email = employee.getMailID();
        String email="adityasonakiya29@gmail.com";

        boolean isValid = otpService.verifyOtp(email, otp);
        if (isValid) {
            otpService.clearOtp(email);
            return ResponseEntity.ok("OTP verified successfully");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid OTP"));
        }
    }    

}
