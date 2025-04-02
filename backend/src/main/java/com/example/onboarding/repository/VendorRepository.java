package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {

}
