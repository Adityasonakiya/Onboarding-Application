package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.CandidateStatus;

@Repository
public interface CandidateStatusRepository extends JpaRepository<CandidateStatus,Integer>{

}
