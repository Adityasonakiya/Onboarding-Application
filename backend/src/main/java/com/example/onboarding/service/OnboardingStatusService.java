package com.example.onboarding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.OnboardingStatus;
import com.example.onboarding.repository.OnboardingStatusRepository;

@Service
public class OnboardingStatusService {
    @Autowired
    OnboardingStatusRepository onboardingStatusRepository;

    public List<OnboardingStatus> getAllOnboardingStatus(){
        return onboardingStatusRepository.findAll();
    }
}
