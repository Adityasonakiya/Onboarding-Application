package com.example.onboarding.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.EmployeeCandidateDTO;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate,Long>{

        @Query(value = "SELECT cnd.phone_number as id, cnd.first_name as firstName, cnd.last_name as lastName, lob.lob_name as lobName, "
                        +
                        "selection.hsbchiring_manager as hsbchiringManager, obs.onboarding_status as onboardingStatus, "
                        +
                        "bgvs.bgv_status as bgvStatus " +
                        "FROM candidate cnd " +
                        "JOIN selection_details selection ON selection.candidate_phone_number = cnd.phone_number " +
                        "JOIN lob lob ON selection.lob_id = lob.lob_id " +
                        "LEFT JOIN tagging_details td ON cnd.phone_number = td.candidate_phone_number " +
                        "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
                        "LEFT JOIN bgvstatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
                        "WHERE cnd.phone_number = :phoneNumber", nativeQuery = true)
        Optional<EmployeeCandidateDTO> findEmployeeCandidateByPhoneNumber(@Param("phoneNumber") Long phoneNumber);

        @Query(value = "SELECT emp.candidate_id as id, emp.first_name as firstName, emp.last_name as lastName, lob.lob_name as lobName, "
                        +
                        "selection.hsbchiring_manager as hsbchiringManager, obs.onboarding_status as onboardingStatus, "
                        +
                        "bgvs.bgv_status as bgvStatus, emp.phone_number as phoneNumber " +
                        "FROM candidate emp " + 
                        "JOIN selection_details selection ON selection.candidate_phone_number = emp.phone_number " +
                        "JOIN lob lob ON selection.lob_id = lob.lob_id " +
                        "LEFT JOIN tagging_details td ON emp.phone_number = td.candidate_phone_number " +
                        "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
                        "LEFT JOIN bgvstatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
                        "WHERE LOWER(emp.first_name) LIKE LOWER(CONCAT('%', :query, '%')) " +
                        " OR LOWER(emp.middle_name) LIKE LOWER(CONCAT('%', :query, '%')) " +
                        " OR LOWER(emp.last_name) LIKE LOWER(CONCAT('%', :query, '%'))", nativeQuery = true)
        List<EmployeeCandidateDTO> searchByCandidateName(@Param("query") String query);

}
