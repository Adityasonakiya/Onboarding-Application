package com.example.onboarding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.BGVStatus;
import com.example.onboarding.repository.BGVStatusRepository;

@Service
public class BGVStatusService {
    @Autowired
    BGVStatusRepository bgvStatusRepository;

    public List<BGVStatus> getAllBgv(){
        return bgvStatusRepository.findAll();
    }
    
}
