package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.SubLOB;
import com.example.onboarding.repository.SubLOBRepository;

@Service
public class SubLOBService {
    @Autowired
    SubLOBRepository sublobRepo;

    public List<SubLOB> findByLobId(int lobId){
        return sublobRepo.findAllByLob_LobId(lobId);
    }
    public SubLOB findById(int sublobId){
        Optional<SubLOB> sublob = sublobRepo.findById(sublobId);
        return sublob.orElse(null);
    }
}
