package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.OnboardingStatus;

@Repository
public interface OnboardingStatusRepository extends JpaRepository<OnboardingStatus,Integer>{

}
