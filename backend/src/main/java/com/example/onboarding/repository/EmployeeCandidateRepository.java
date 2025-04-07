package com.example.onboarding.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.EmployeeCandidateDTO;

@Repository
public interface EmployeeCandidateRepository extends JpaRepository<EmployeeCandidateDTO,Integer>{

    @Query(value = "SELECT " +
    "COALESCE(emp.psid, cnd.candidate_id, vc.vendor_candidate_id) as id, " +
    "COALESCE(emp.first_name, cnd.first_name, vc.first_name) as firstName, " +
    "COALESCE(emp.last_name, cnd.last_name, vc.last_name) as lastName, " +
    "lob.lob_name as lobName, " +
    "selection.hsbchiring_manager as hsbchiringManager, " +
    "obs.onboarding_status as onboardingStatus, " +
    "bgvs.bgv_status as bgvStatus " +
    "FROM selection_details selection " +
    "LEFT JOIN employee emp ON selection.ps_id = emp.psid " +
    "LEFT JOIN candidate cnd ON selection.candidate_id = cnd.candidate_id " +
    "LEFT JOIN vendor_candidate vc ON selection.vendor_candidate_id = vc.vendor_candidate_id " +
    "JOIN lob lob ON selection.lob_id = lob.lob_id " +
    "LEFT JOIN tagging_details td ON " +
    "     (td.ps_id = emp.psid"+
    " OR td.candidate_id = cnd.candidate_id OR td.vendor_candidate_id = vc.vendor_candidate_id) " +
    "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
    "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
    "WHERE selection.created_by = :createdBy", nativeQuery = true)
Page<EmployeeCandidateDTO> findAllCandidates(@Param("createdBy") Integer createdBy, Pageable pageable);

    
@Query(value = "SELECT " +
               "COALESCE(cnd.candidate_id, emp.psid, vc.vendor_candidate_id) as id, " +
               "COALESCE(cnd.first_name, emp.first_name, vc.first_name) as firstName, " +
               "COALESCE(cnd.last_name, emp.last_name, vc.last_name) as lastName, " +
               "lob.lob_name as lobName, " +
               "selection.hsbchiring_manager as hsbchiringManager, " +
               "obs.onboarding_status as onboardingStatus, " +
               "bgvs.bgv_status as bgvStatus " +
               "FROM selection_details selection " +
               "LEFT JOIN candidate cnd ON selection.candidate_id = cnd.candidate_id " +
               "LEFT JOIN employee emp ON selection.ps_id = emp.psid " +
               "LEFT JOIN vendor_candidate vc ON selection.vendor_candidate_id = vc.vendor_candidate_id " +
               "JOIN lob lob ON selection.lob_id = lob.lob_id " +
               "LEFT JOIN tagging_details td ON " +
               "     (td.ps_id = emp.psid OR td.ps_id = cnd.candidate_id OR td.ps_id = vc.vendor_candidate_id) " +
               "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
               "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
               "WHERE COALESCE(cnd.candidate_id, emp.psid, vc.vendor_candidate_id) = :id", nativeQuery = true)
Optional<EmployeeCandidateDTO> findEmployeeCandidateOrVendorById(@Param("id") int id);

}
