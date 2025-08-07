package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Roles;

@Repository
public interface RolesRepository extends JpaRepository<Roles,Integer>{ 
}
