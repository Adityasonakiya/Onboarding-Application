package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    List<Employee> findByLocation(String location);

    @Query(value = "SELECT emp.psid as id, emp.first_name, emp.last_name, lob.lob_name, selection.hsbchiring_manager, obs.onboarding_status, bgvs.bgv_status " +
                   "FROM employee emp, lob lob, selection_details selection, onboarding_status obs, BGVStatus bgvs, tagging_details td " +
                   "WHERE selection.created_by = 10713037 AND selection.ps_id = emp.psid AND selection.lob_id = lob.lob_id " +
                   "AND emp.psid = td.ps_id AND td.onboarding_status_id = obs.status_id AND td.bgvstatus_id = bgvs.bgv_status_id " +
                   "UNION " +
                   "SELECT cnd.candidate_id as id, cnd.first_name, cnd.last_name, lob.lob_name, selection.hsbchiring_manager, obs.onboarding_status, bgvs.bgv_status " +
                   "FROM candidate cnd, lob lob, selection_details selection, onboarding_status obs, BGVStatus bgvs, tagging_details td " +
                   "WHERE selection.created_by = 10713037 AND selection.candidate_id = cnd.candidate_id AND selection.lob_id = lob.lob_id " +
                   "AND cnd.candidate_id = td.candidate_id AND td.onboarding_status_id = obs.status_id AND td.bgvstatus_id = bgvs.bgv_status_id", nativeQuery = true)
    List<EmployeeCandidateDTO> findEmployeeCandidates();
}