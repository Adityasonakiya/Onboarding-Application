package com.example.onboarding.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
        List<Employee> findByLocation(String location);

        @Query(value = "SELECT emp.psid as id, emp.first_name, emp.last_name, lob.lob_name, selection.hsbchiring_manager, obs.onboarding_status, bgvs.bgv_status "
                        +
                        "FROM employee emp JOIN selection_details selection ON selection.ps_id = emp.psid " +
                        "JOIN lob lob ON selection.lob_id = lob.lob_id LEFT JOIN tagging_details td ON emp.psid = td.ps_id LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id "
                        +
                        "WHERE selection.created_by = :createdBy", nativeQuery = true)
        Page<EmployeeCandidateDTO> findEmployeeCandidates(@Param("createdBy") Integer createdBy, Pageable pageable);

        @Query(value = "SELECT emp.psid as id, emp.first_name as firstName, emp.last_name as lastName, lob.lob_name as lobName, "
                        +
                        "selection.hsbchiring_manager as hsbchiringManager, obs.onboarding_status as onboardingStatus, "
                        +
                        "bgvs.bgv_status as bgvStatus " +
                        "FROM employee emp " +
                        "JOIN selection_details selection ON selection.ps_id = emp.psid " +
                        "JOIN lob lob ON selection.lob_id = lob.lob_id " +
                        "LEFT JOIN tagging_details td ON emp.psid = td.ps_id " +
                        "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
                        "LEFT JOIN bgvstatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
                        "WHERE emp.psid = :psid", nativeQuery = true)
        Optional<EmployeeCandidateDTO> findEmployeeCandidateByPsid(@Param("psid") int psid);

}
