package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.SelectionDetails;

@Repository
public interface SelectionDetailsRepository extends JpaRepository<SelectionDetails, Integer> {
    SelectionDetails findByEmployee_Psid(int psid); 
    SelectionDetails findByCandidate_CandidateId(int candidateId);
}
