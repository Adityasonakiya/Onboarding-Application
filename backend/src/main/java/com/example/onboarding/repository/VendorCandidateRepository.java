package com.example.onboarding.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.VendorCandidate;

@Repository
public interface VendorCandidateRepository extends JpaRepository<VendorCandidate,Integer> {

    Optional<VendorCandidate> findByPhoneNumber(Long phoneNumber);

}
