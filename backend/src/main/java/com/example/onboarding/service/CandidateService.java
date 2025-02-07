package com.example.onboarding.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.repository.CandidateRepository;

@Service
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;

    
    public Candidate getCandidateById(int candidateId) {
        Optional<Candidate> candidate = candidateRepository.findById(candidateId);
        return candidate.orElse(null);
    }
}
