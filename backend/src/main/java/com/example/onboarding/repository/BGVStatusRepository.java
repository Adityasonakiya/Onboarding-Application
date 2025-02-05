package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.BGVStatus;

@Repository
public interface BGVStatusRepository extends JpaRepository<BGVStatus,Integer>{

}
