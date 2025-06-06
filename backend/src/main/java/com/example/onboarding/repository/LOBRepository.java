package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.LOB;

@Repository
public interface LOBRepository extends JpaRepository<LOB, Integer> {
    List<LOB> findByActiveTrue();
}
