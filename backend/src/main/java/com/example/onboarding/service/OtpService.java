package com.example.onboarding.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private final EmailService emailService;

    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

    OtpService(EmailService emailService) {
        this.emailService = emailService;
    }

    public boolean sendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        otpStore.put(email, otp);

        String subject = "Selection Tracker Login OTP";
        String body = "OTP for Selection Tracker login is: " + otp;

        try {
            emailService.send(email, subject, body);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public boolean verifyOtp(String email, String otp) {
        return otp.equals(otpStore.get(email));
    }

    public void clearOtp(String email) {
        otpStore.remove(email);
    }
}
