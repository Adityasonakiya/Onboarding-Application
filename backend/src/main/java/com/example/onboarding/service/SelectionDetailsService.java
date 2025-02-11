package com.example.onboarding.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.repository.SelectionDetailsRepository;

@Service
public class SelectionDetailsService {
    @Autowired
    private SelectionDetailsRepository selectionDetailsRepository;

    public SelectionDetails getSelectionDetailsByPsid(int psid) {
        return selectionDetailsRepository.findByEmployeePsid(psid);
    }

    public SelectionDetails getSelectionDetailsByCandidateId(int candidateId) {
        return selectionDetailsRepository.findByCandidateCandidateId(candidateId);
    }
}
