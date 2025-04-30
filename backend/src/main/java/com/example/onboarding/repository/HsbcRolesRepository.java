package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.HsbcRoles;

@Repository
public interface HsbcRolesRepository extends JpaRepository<HsbcRoles, Integer>{
    List<HsbcRoles> findByRoleTitleContainingIgnoreCase(String query);
}
