package com.example.onboarding.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.EmployeeCandidateDTO;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate,Integer>{
//      @Query(value = "SELECT cnd.candidate_id as id, cnd.first_name, cnd.last_name, lob.lob_name, selection.hsbchiring_manager, obs.onboarding_status, bgvs.bgv_status "
//                         +
//                         "FROM candidate cnd JOIN selection_details selection ON selection.candidate_id = cnd.candidate_id " +
//                         "JOIN lob lob ON selection.lob_id = lob.lob_id LEFT JOIN tagging_details td ON cnd.candidate_id = td.candidate_id LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id "
//                         +
//                         "WHERE selection.created_by = :createdBy", nativeQuery = true)
//         Page<EmployeeCandidateDTO> findEmployeeCandidates(@Param("createdBy") Integer createdBy, Pageable pageable);

        @Query(value = "SELECT cnd.candidate_id as id, cnd.first_name as firstName, cnd.last_name as lastName, lob.lob_name as lobName, "
                        +
                        "selection.hsbchiring_manager as hsbchiringManager, obs.onboarding_status as onboardingStatus, "
                        +
                        "bgvs.bgv_status as bgvStatus " +
                        "FROM candidate cnd " +
                        "JOIN selection_details selection ON selection.candidate_id = cnd.candidate_id " +
                        "JOIN lob lob ON selection.lob_id = lob.lob_id " +
                        "LEFT JOIN tagging_details td ON cnd.candidate_id = td.candidate_id " +
                        "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
                        "LEFT JOIN bgvstatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
                        "WHERE cnd.candidate_id = :candidate_id", nativeQuery = true)
        Optional<EmployeeCandidateDTO> findEmployeeCandidateByCandidateId(@Param("candidate_id") int candidateId);

}
