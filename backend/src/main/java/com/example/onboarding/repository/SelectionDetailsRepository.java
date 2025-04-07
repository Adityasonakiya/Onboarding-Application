package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;

@Repository
public interface SelectionDetailsRepository extends JpaRepository<SelectionDetails, Integer> {

        @Query(value = "SELECT * FROM selection_details sd WHERE sd.ps_id = :psId ORDER BY sd.create_date DESC LIMIT 1", nativeQuery = true)
        SelectionDetails findSelectionDetailsByPsId(@Param("psId") Integer psId);

        SelectionDetails findByCandidate_CandidateId(int candidateId);

        SelectionDetails findByVendorCandidate_VendorCandidateId(int vendorCandidateId);

        Boolean existsByEmployee_Psid(int psId);

        Boolean existsByCandidate_CandidateId(int candidateId);

        Boolean existsByVendorCandidate_VendorCandidateId(int vendorCandidateId);

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
