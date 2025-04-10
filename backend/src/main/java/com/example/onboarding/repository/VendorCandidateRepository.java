package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.model.VendorCandidateKey;

@Repository
public interface VendorCandidateRepository extends JpaRepository<VendorCandidate,VendorCandidateKey> {

}
