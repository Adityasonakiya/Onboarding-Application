package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.OnboardingStatus;
import com.example.onboarding.service.OnboardingStatusService;

@CrossOrigin("*")
@RestController
public class OnboardingStatusController {
    @Autowired
    OnboardingStatusService onboardingStatusService;

    @GetMapping("/OnboardingStatuses")
    public ResponseEntity<List<OnboardingStatus>> getAllOnboardingStatus(){
        List<OnboardingStatus> OnboardingStatuses=onboardingStatusService.getAllOnboardingStatus();
        if(OnboardingStatuses!=null){
            return new ResponseEntity<>(OnboardingStatuses,HttpStatus.OK);
        } 
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
