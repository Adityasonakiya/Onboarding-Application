package com.example.onboarding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.CandidateStatus;
import com.example.onboarding.repository.CandidateStatusRepository;

@Service
public class CandidateStatusService {

    @Autowired
    CandidateStatusRepository candidateStatusRepository;

    public List<CandidateStatus> getAllCandidateStatus(){
        return candidateStatusRepository.findAll();
    }
}
