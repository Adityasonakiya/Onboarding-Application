package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate,Integer>{

}
