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
import com.example.onboarding.model.ExcelDataDTO;
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

    // Boolean existsByVendorCandidate_VendorCandidateId(int vendorCandidateId);
    @Query(value = "("
            + "SELECT emp.psid AS id, emp.first_name AS firstName, emp.last_name AS lastName, "
            + "lob.lob_name AS lobName, selection.hsbchiring_manager AS hsbchiringManager, "
            + "obs.onboarding_status AS onboardingStatus, bgvs.bgv_status AS bgvStatus, emp.phone_number as phoneNumber "
            + "FROM employee emp "
            + "LEFT JOIN selection_details selection ON selection.ps_id = emp.psid "
            + "LEFT JOIN lob lob ON selection.lob_id = lob.lob_id "
            + "LEFT JOIN tagging_details td ON emp.psid = td.ps_id "
            + "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id "
            + "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id "
            + "WHERE selection.created_by = :createdBy "
            + ")"
            + "UNION ALL "
            + "("
            + "SELECT cnd.vendor_id AS id, cnd.first_name AS firstName, cnd.last_name AS lastName, "
            + "lob.lob_name AS lobName, selection.hsbchiring_manager AS hsbchiringManager, "
            + "obs.onboarding_status AS onboardingStatus, bgvs.bgv_status AS bgvStatus, cnd.phone_number as phoneNumber "
            + "FROM  candidate cnd "
            + "LEFT JOIN selection_details selection ON selection.candidate_id = cnd.candidate_id "
            + "LEFT JOIN lob lob ON selection.lob_id = lob.lob_id "
            + "LEFT JOIN tagging_details td ON cnd.candidate_id = td.candidate_id "
            + "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id "
            + "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id "
            + "WHERE selection.created_by = :createdBy "
            + ")"
            + "UNION ALL "
            + "("
            + "SELECT vc.vendor_id AS id, vc.first_name AS firstName, vc.last_name AS lastName, "
            + "lob.lob_name AS lobName, selection.hsbchiring_manager AS hsbchiringManager, "
            + "obs.onboarding_status AS onboardingStatus, bgvs.bgv_status AS bgvStatus, vc.phone_number as phoneNumber "
            + "FROM vendor_candidate vc "
            + "LEFT JOIN selection_details selection ON selection.vendor_candidate_id = vc.vendor_candidate_id "
            + "LEFT JOIN lob lob ON selection.lob_id = lob.lob_id "
            + "LEFT JOIN tagging_details td ON vc.vendor_candidate_id = td.vendor_candidate_id "
            + "LEFT JOIN onboarding_status obs ON td.onboarding_status_id = obs.status_id "
            + "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id = bgvs.bgv_status_id "
            + "WHERE selection.created_by = :createdBy "
            + ")", countQuery = "SELECT COUNT(*) FROM ("
            + "SELECT emp.psid AS id "
            + "FROM employee emp "
            + "LEFT JOIN selection_details selection ON selection.ps_id = emp.psid "
            + // Fixed
            // emp.
            // ->
            // emp.psid
            "WHERE selection.created_by = :createdBy "
            + "UNION ALL "
            + "SELECT cnd.candidate_id AS id "
            + "FROM candidate cnd "
            + "LEFT JOIN selection_details selection ON selection.candidate_id = cnd.candidate_id "
            + "WHERE selection.created_by = :createdBy "
            + "UNION ALL "
            + "SELECT vc.vendor_candidate_id AS id "
            + "FROM vendor_candidate vc "
            + "LEFT JOIN selection_details selection ON selection.vendor_candidate_id = vc.vendor_candidate_id "
            + "WHERE selection.created_by = :createdBy "
            + ") AS totalCount", nativeQuery = true)
    Page<EmployeeCandidateDTO> findEmployeeCandidates(@Param("createdBy") Integer createdBy, Pageable pageable);

    @Query(value = "SELECT count(*) AS selection_count, lb.lob_name, sd.pricing_model, sd.hsbcselection_date "
            + "FROM selectiontracker.selection_details sd, selectiontracker.lob lb "
            + "WHERE sd.lob_id = lb.lob_id "
            + "AND (:filter = 'all' OR (:filter = 'internal' AND sd.ps_id IS NOT NULL) OR (:filter = 'external' AND sd.ps_id IS NULL)) "
            + "GROUP BY lb.lob_id, sd.pricing_model, sd.hsbcselection_date", nativeQuery = true)
    List<SelectionDTO> findSelections(@Param("filter") String filter);

    @Query(value = "SELECT COUNT(*) as ctool_count, lb.lob_name, os.onboarding_status, bs.bgv_status, td.update_date "
            + "FROM selection_details sd, lob lb, tagging_details td, onboarding_status os, BGVStatus bs "
            + "WHERE sd.ps_id = td.ps_id "
            + "AND sd.lob_id = lb.lob_id "
            + "AND td.onboarding_status_id = os.status_id "
            + "AND td.bgvstatus_id = bs.bgv_status_id "
            + "AND (:filter = 'all' OR (:filter = 'internal' AND sd.ps_id IS NOT NULL) OR (:filter = 'external' AND sd.ps_id IS NULL)) "
            + "GROUP BY lb.lob_id, os.status_id, bs.bgv_status_id, td.update_date", nativeQuery = true)
    List<CtoolDto> findCtool(@Param("filter") String filter);

    @Query(value = "SELECT count(*) as awaited_count, sd.delivery_manager, sd.pricing_model, bs.bgv_status, os.onboarding_status, td.update_date "
            + "FROM selection_details sd, tagging_details td, BGVStatus bs, onboarding_status os "
            + "WHERE sd.ps_id = td.ps_id "
            + "AND td.bgvstatus_id = bs.bgv_status_id "
            + "AND td.onboarding_status_id = os.status_id "
            + "AND (:filter = 'all' OR (:filter = 'internal' AND sd.ps_id IS NOT NULL) OR (:filter = 'external' AND sd.ps_id IS NULL)) "
            + "GROUP BY bs.bgv_status_id, sd.pricing_model, sd.delivery_manager, os.status_id, td.update_date", nativeQuery = true)
    List<AwaitedCasesDTO> findAwaitedCases(@Param("filter") String filter);

    @Query(value = "SELECT * FROM selection_details sd WHERE (:filter = 'all' OR (:filter = 'internal' AND sd.ps_id IS NOT NULL) OR (:filter = 'external' AND sd.ps_id IS NULL))", nativeQuery = true)
    List<SelectionDetails> findSelectionDetailsByFilter(@Param("filter") String filter);


    @Query(value = "SELECT obs.onboarding_status AS onboardingStatus, emp.psid AS ltiPsId, emp.first_name AS firstName, emp.last_name AS lastName, "
            + "emp.grade AS grade, emp.location AS location, emp.total_experience AS totalExperience, emp.skill AS skill, "
            + "Date(selection.hsbcselection_date) AS hsbcSelectionDate, CASE WHEN selection.ltionboarding_date IS NOT NULL THEN Date(selection.ltionboarding_date) ELSE NULL END AS ltiJoiningDate, Date(selection.create_date) AS createdDate, "
            + "DATE_FORMAT(selection.hsbcselection_date, '%Y-%m') AS selectionMonthYear ,CASE WHEN DATEDIFF(NOW(), selection.hsbcselection_date) >= 0 THEN DATEDIFF(NOW(), selection.hsbcselection_date) ELSE 0 END AS selectionAging, 'Internal' AS category, "
            + "selection.base_bu AS baseBu, lob.lob_name as lobName, sublob.sub_lob_name as subLobName, selection.salespoc AS salesPoc, selection.hsbchiring_manager AS hsbcHiringManager, "
            + "selection.hsbchead AS hsbcHead, selection.delivery_manager AS deliveryManager, selection.irm AS irm, selection.pricing_model AS pricingModel, "
            + "selection.hsbctool_id AS hsbcCtoolId, Date(selection.ctool_received_date) AS ctoolReceivedDate, CASE WHEN hsbctool_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS ctoolReceivedStatus, "
            + "CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN DATEDIFF(NOW(), selection.ctool_received_date) ELSE 0 END AS ctoolAging , CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN FLOOR(DATEDIFF(NOW(), selection.ctool_received_date) / 7) ELSE 0 END AS ctoolAgingWeekBucket, "
            + "Date(selection.ctool_start_date) AS ctoolStartDate, selection.recruiter_name AS recruiterName, selection.ctool_rate AS ctoolRate, selection.ctool_proposed_rate AS proposedRate, "
            + "CASE WHEN roles.role_title IS NULL THEN '' ELSE roles.role_title END AS hsbcRole, roles.grade as roleGrade, bgvs.bgv_status AS finalBGVStatus, CASE WHEN selection.tech_selection_date IS NOT NULL THEN 'Done' ELSE 'Pending' END AS techSelectionStatus, "
            + "td.status_remarks AS remarks, CASE WHEN selection.interview_evidences IS NOT NULL THEN 'Yes' ELSE 'No' END AS interviewDocuments, "
            + "CASE WHEN selection.dojreceived_date IS NOT NULL THEN Date(selection.dojreceived_date) ELSE NULL END AS hsbcConfirmedDoj, CASE WHEN selection.dojreceived_date IS NOT NULL THEN DATEDIFF(selection.dojreceived_date, selection.hsbcselection_date) ELSE 0 END AS agingSelectionWithDoj, "
            + "CASE WHEN selection.dojreceived_date IS NOT NULL THEN FLOOR(DATEDIFF(selection.dojreceived_date, selection.hsbcselection_date) / 7) ELSE 0 END AS hsbcDojAgingBucket, "
            + "Date(selection.hsbconboarding_date) AS hsbcOnboardingDate, Date(td.create_date) AS taggingDone, "
            + "Date(selection.tech_selection_date) AS techSelectionDone "
            + "FROM selection_details selection "
            + "LEFT JOIN employee emp  ON selection.ps_id=emp.psid "
            + "LEFT JOIN lob lob ON selection.lob_id=lob.lob_id "
            + "LEFT JOIN sublob sublob ON selection.sub_lob_id = sublob.sublobid "
            + "LEFT JOIN hsbc_roles roles ON selection.hsbc_role_id = roles.ref "
            + "LEFT JOIN tagging_details td ON emp.psid=td.ps_id "
            + "LEFT JOIN onboarding_status obs ON td.onboarding_status_id=obs.status_id "
            + "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id=bgvs.bgv_status_id "
            + "WHERE selection.created_by = :createdBy "
            + "UNION "
            + "SELECT obs.onboarding_status AS onboardingStatus, 'External' AS ltiPsId, cnd.first_name AS firstName, cnd.last_name AS lastName, '' AS grade, '' AS location, NULL AS totalExperience, '' AS skill, "
            + "Date(selection.hsbcselection_date) AS hsbcSelectionDate, CASE WHEN selection.ltionboarding_date IS NOT NULL THEN Date(selection.ltionboarding_date) ELSE NULL END AS ltiJoiningDate, Date(selection.create_date) AS createdDate, "
            + "DATE_FORMAT(selection.hsbcselection_date, '%Y-%m') AS selectionMonthYear , CASE WHEN DATEDIFF(NOW(), selection.hsbcselection_date) >= 0 THEN DATEDIFF(NOW(), selection.hsbcselection_date) ELSE 0 END as selectionAging, 'External' AS category, "
            + "selection.base_bu AS baseBu, lob.lob_name as lobName, sublob.sub_lob_name as subLobName, selection.salespoc AS salesPoc, selection.hsbchiring_manager AS hsbcHiringManager, "
            + "selection.hsbchead AS hsbcHead, selection.delivery_manager AS deliveryManager, selection.irm AS irm, selection.pricing_model AS pricingModel, "
            + "selection.hsbctool_id AS hsbcCtoolId, Date(selection.ctool_received_date) AS ctoolReceivedDate, CASE WHEN hsbctool_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS ctoolReceivedStatus, "
            + "CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN DATEDIFF(NOW(), selection.ctool_received_date) ELSE 0 END AS ctoolAging , CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN FLOOR(DATEDIFF(NOW(), selection.ctool_received_date) / 7) ELSE 0 END AS ctoolAgingWeekBucket, "
            + "Date(selection.ctool_start_date) AS ctoolStartDate, selection.recruiter_name AS recruiterName, selection.ctool_rate AS ctoolRate, selection.ctool_proposed_rate AS proposedRate, "
            + "CASE WHEN roles.role_title IS NULL THEN '' ELSE roles.role_title END AS hsbcRole, roles.grade as roleGrade, bgvs.bgv_status AS finalBGVStatus, CASE WHEN selection.tech_selection_date IS NOT NULL THEN 'Done' ELSE 'Pending' END AS techSelectionStatus, "
            + "td.status_remarks AS remarks, CASE WHEN selection.interview_evidences IS NOT NULL THEN 'Yes' ELSE 'No' END AS interviewDocuments, "
            + "CASE WHEN selection.dojreceived_date IS NOT NULL THEN Date(selection.dojreceived_date) ELSE NULL END AS hsbcConfirmedDoj, CASE WHEN selection.dojreceived_date IS NOT NULL THEN DATEDIFF(selection.dojreceived_date, selection.hsbcselection_date) ELSE 0 END AS agingSelectionWithDoj, "
            + "CASE WHEN selection.dojreceived_date IS NOT NULL THEN FLOOR(DATEDIFF(selection.dojreceived_date, selection.hsbcselection_date) / 7) ELSE 0 END AS hsbcDojAgingBucket, "
            + "Date(selection.hsbconboarding_date) AS hsbcOnboardingDate, Date(td.create_date) AS taggingDone, "
            + "Date(selection.tech_selection_date) AS techSelectionDone "
            + "FROM selection_details selection "
            + "LEFT JOIN candidate cnd ON selection.candidate_id=cnd.candidate_id "
            + "LEFT JOIN lob lob ON selection.lob_id=lob.lob_id "
            + "LEFT JOIN sublob sublob ON selection.sub_lob_id = sublob.sublobid "
            + "LEFT JOIN hsbc_roles roles ON selection.hsbc_role_id = roles.ref "
            + "LEFT JOIN tagging_details td ON cnd.candidate_id=td.candidate_id "
            + "LEFT JOIN onboarding_status obs ON td.onboarding_status_id=obs.status_id "
            + "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id=bgvs.bgv_status_id "
            + "WHERE selection.created_by = :createdBy "
            + "UNION "
            + "SELECT obs.onboarding_status AS onboardingStatus, v.vendor_name AS ltiPsId, vd.first_name AS firstName, vd.last_name AS lastName, '' AS grade, '' AS location, NULL AS totalExperience, '' AS skill, "
            + "Date(selection.hsbcselection_date) AS hsbcSelectionDate, CASE WHEN selection.ltionboarding_date IS NOT NULL THEN Date(selection.ltionboarding_date) ELSE NULL END AS ltiJoiningDate, Date(selection.create_date) AS createdDate, "
            + "DATE_FORMAT(selection.hsbcselection_date, '%Y-%m') AS selectionMonthYear , CASE WHEN DATEDIFF(NOW(), selection.hsbcselection_date) >= 0 THEN DATEDIFF(NOW(), selection.hsbcselection_date) ELSE 0 END AS selectionAging, v.vendor_name AS category, "
            + "selection.base_bu AS baseBu, lob.lob_name as lobName, sublob.sub_lob_name as subLobName, selection.salespoc AS salesPoc, selection.hsbchiring_manager AS hsbcHiringManager, "
            + "selection.hsbchead AS hsbcHead, selection.delivery_manager AS deliveryManager, selection.irm AS irm, selection.pricing_model AS pricingModel, "
            + "selection.hsbctool_id AS hsbcCtoolId, Date(selection.ctool_received_date) AS ctoolReceivedDate, CASE WHEN hsbctool_id IS NOT NULL THEN 'Yes' ELSE 'No' END AS ctoolReceivedStatus, "
            + "CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN DATEDIFF(NOW(), selection.ctool_received_date) ELSE 0 END AS ctoolAging , CASE WHEN DATEDIFF(NOW(), selection.ctool_received_date) >= 0 THEN FLOOR(DATEDIFF(NOW(), selection.ctool_received_date) / 7) ELSE 0 END AS ctoolAgingWeekBucket, "
            + "Date(selection.ctool_start_date) AS ctoolStartDate, selection.recruiter_name AS recruiterName, selection.ctool_rate AS ctoolRate, selection.ctool_proposed_rate AS proposedRate, "
            + "CASE WHEN roles.role_title IS NULL THEN '' ELSE roles.role_title END AS hsbcRole, roles.grade as roleGrade, bgvs.bgv_status AS finalBGVStatus, CASE WHEN selection.tech_selection_date IS NOT NULL THEN 'Done' ELSE 'Pending' END AS techSelectionStatus, "
            + "td.status_remarks AS remarks, CASE WHEN selection.interview_evidences IS NOT NULL THEN 'Yes' ELSE 'No' END AS interviewDocuments, "
            + "CASE WHEN selection.dojreceived_date IS NOT NULL THEN Date(selection.dojreceived_date) ELSE NULL END AS hsbcConfirmedDoj, CASE WHEN selection.dojreceived_date IS NOT NULL THEN DATEDIFF(selection.dojreceived_date, selection.hsbcselection_date) ELSE 0 END AS agingSelectionWithDoj, "
            + "CASE WHEN selection.dojreceived_date IS NOT NULL THEN FLOOR(DATEDIFF(selection.dojreceived_date, selection.hsbcselection_date) / 7) ELSE 0 END AS hsbcDojAgingBucket, "
            + "Date(selection.hsbconboarding_date) AS hsbcOnboardingDate, Date(td.create_date) AS taggingDone, "
            + "Date(selection.tech_selection_date) AS techSelectionDone "
            + "FROM selection_details selection "
            + "LEFT JOIN vendor_candidate vd ON selection.vendor_candidate_id=vd.vendor_candidate_id "
            + "LEFT JOIN vendor v ON vd.vendor_id = v.vendor_id "
            + "LEFT JOIN lob lob ON selection.lob_id=lob.lob_id "
            + "LEFT JOIN sublob sublob ON selection.sub_lob_id = sublob.sublobid "
            + "LEFT JOIN hsbc_roles roles ON selection.hsbc_role_id = roles.ref "
            + "LEFT JOIN tagging_details td ON vd.vendor_candidate_id=td.vendor_candidate_id "
            + "LEFT JOIN onboarding_status obs ON td.onboarding_status_id=obs.status_id "
            + "LEFT JOIN BGVStatus bgvs ON td.bgvstatus_id=bgvs.bgv_status_id "
            + "WHERE selection.created_by = :createdBy ",
            nativeQuery = true)
    List<ExcelDataDTO> findCustomQueryResults(@Param("createdBy") Integer createdBy);

}
