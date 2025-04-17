package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;

@Repository
public interface SelectionDetailsRepository extends JpaRepository<SelectionDetails, Integer> {

        @Query(value = "SELECT * FROM selection_details sd WHERE sd.ps_id = :psId ORDER BY sd.create_date DESC LIMIT 1", nativeQuery = true)
        SelectionDetails findSelectionDetailsByPsId(@Param("psId") Integer psId);

        SelectionDetails findByCandidate_PhoneNumber(Long phoneNumber);

        SelectionDetails findByVendorCandidate_PhoneNumber(Long phoneNumber);

        Boolean existsByEmployee_Psid(int psId);

        Boolean existsByCandidate_PhoneNumber(Long phoneNumber);

        //Boolean existsByVendorCandidate_VendorCandidateId(int vendorCandidateId);

        @Query(value = "(" +
               "SELECT emp.psid AS id, emp.first_name AS firstName, emp.last_name AS lastName, " +
               "lob.lob_name AS lobName, selection.hsbchiring_manager AS hsbchiringManager, " +
               "obs.onboarding_status AS onboardingStatus, bgvs.bgv_status AS bgvStatus, emp.phone_number as phoneNumber " +
               "FROM employee emp " +
               "LEFT JOIN selection_details selection ON selection.ps_id = emp.psid " +
               "LEFT JOIN lob lob ON selection.lob_id = lob.lob_id " +
               "LEFT JOIN tagging_details td ON emp.psid = td.ps_id " +
               "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
               "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
               "WHERE selection.created_by = :createdBy " +
               ")" +
               "UNION ALL " + 
               "(" +
               "SELECT cnd.vendor_id AS id, cnd.first_name AS firstName, cnd.last_name AS lastName, " +
               "lob.lob_name AS lobName, selection.hsbchiring_manager AS hsbchiringManager, " +
               "obs.onboarding_status AS onboardingStatus, bgvs.bgv_status AS bgvStatus, cnd.phone_number as phoneNumber " +
               "FROM  candidate cnd " +
               "LEFT JOIN selection_details selection ON selection.candidate_id = cnd.candidate_id " +
               "LEFT JOIN lob lob ON selection.lob_id = lob.lob_id " +
               "LEFT JOIN tagging_details td ON cnd.candidate_id = td.candidate_id " +
               "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
               "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
               "WHERE selection.created_by = :createdBy " +
               ")" +
               "UNION ALL " +
               "(" +
               "SELECT vc.vendor_id AS id, vc.first_name AS firstName, vc.last_name AS lastName, " +
               "lob.lob_name AS lobName, selection.hsbchiring_manager AS hsbchiringManager, " +
               "obs.onboarding_status AS onboardingStatus, bgvs.bgv_status AS bgvStatus, vc.phone_number as phoneNumber " +
               "FROM vendor_candidate vc " +
               "LEFT JOIN selection_details selection ON selection.vendor_candidate_id = vc.vendor_candidate_id " +
               "LEFT JOIN lob lob ON selection.lob_id = lob.lob_id " +
               "LEFT JOIN tagging_details td ON vc.vendor_candidate_id = td.vendor_candidate_id " +
               "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id " +
               "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id " +
               "WHERE selection.created_by = :createdBy " +
               ")",
               countQuery = "SELECT COUNT(*) FROM (" +
               "SELECT emp.psid AS id " +
               "FROM employee emp " +
               "LEFT JOIN selection_details selection ON selection.ps_id = emp.psid " + // Fixed emp. -> emp.psid
               "WHERE selection.created_by = :createdBy " +
               "UNION ALL " +
               "SELECT cnd.candidate_id AS id " +
               "FROM candidate cnd " +
               "LEFT JOIN selection_details selection ON selection.candidate_id = cnd.candidate_id " +
               "WHERE selection.created_by = :createdBy " +
               "UNION ALL " +
               "SELECT vc.vendor_candidate_id AS id " +
               "FROM vendor_candidate vc " +
               "LEFT JOIN selection_details selection ON selection.vendor_candidate_id = vc.vendor_candidate_id " +
               "WHERE selection.created_by = :createdBy " +
               ") AS totalCount",
        nativeQuery = true)
        Page<EmployeeCandidateDTO> findEmployeeCandidates(@Param("createdBy") Integer createdBy, Pageable pageable);
        


        @Query(value = "SELECT count(*) AS selection_count, lb.lob_name, sd.pricing_model, sd.hsbcselection_date " +
                        "FROM selectiontracker.selection_details sd, selectiontracker.lob lb " +
                        "WHERE sd.lob_id = lb.lob_id " +
                        "GROUP BY lb.lob_id, sd.pricing_model, sd.hsbcselection_date", nativeQuery = true)
        List<SelectionDTO> findSelections();

        @Query(value = "SELECT COUNT(*) as ctool_count,lb.lob_name, os.onboarding_status, bs.bgv_status, td.update_date " +
                        "FROM selection_details sd, lob lb,tagging_details td,onboarding_status os, BGVStatus bs " +
                        "where sd.ps_id = td.ps_id " +
                        "and sd.lob_id=lb.lob_id " +
                        "and td.onboarding_status_id = os.status_id " +
                        "and td.bgvstatus_id = bs.bgv_status_id " +
                        "GROUP BY lb.lob_id, os.status_id, bs.bgv_status_id, td.update_date", nativeQuery = true)
        List<CtoolDto> findCtool();

        @Query(value = "SELECT count(*) as awaited_count,sd.delivery_manager,sd.pricing_model,bs.bgv_status,os.onboarding_status, td.update_date "
                        +
                        "from selection_details sd,tagging_details td,BGVStatus bs,onboarding_status os " +
                        "where sd.ps_id = td.ps_id " +
                        "and td.bgvstatus_id = bs.bgv_status_id " +
                        "and td.onboarding_status_id = os.status_id " +
                        "group by bs.bgv_status_id,sd.pricing_model,sd.delivery_manager,os.status_id, td.update_date", nativeQuery = true)
        List<AwaitedCasesDTO> findAwaitedCases();
}

// select count(*),os.onboarding_status,bs.bgv_status from selection_details sd
// , tagging_details td, onboarding_status os, BGVStatus bs
// where sd.ps_id = td.ps_id
// and td.onboarding_status_id = os.status_id
// and td.bgvstatus_id = bs.bgv_status_id
// group by os.status_id,bs.bgv_status_id
