package com.example.onboarding.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.VendorCandidate;

@Repository
public interface VendorCandidateRepository extends JpaRepository<VendorCandidate,Integer> {

    Optional<VendorCandidate> findByPhoneNumber(Long phoneNumber);
    @Query(value = "SELECT " +
        "(SELECT COUNT(*) FROM candidate c WHERE c.vendor_id = :vendorId) + " +
        "(SELECT COUNT(*) FROM vendor_candidate vc WHERE vc.vendor_id = :vendorId) AS total_count",
        nativeQuery = true)
Integer getCombinedCandidateCountByVendorId(@Param("vendorId") int vendorId);
}
