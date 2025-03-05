package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;

@Repository
public interface SelectionDetailsRepository extends JpaRepository<SelectionDetails, Integer> {
    SelectionDetails findByEmployee_Psid(int psid);

    SelectionDetails findByCandidate_CandidateId(int candidateId);

    Boolean existsByEmployee_Psid(int psId);

    Boolean existsByCandidate_CandidateId(int candidateId);

    @Query(value = "SELECT count(*) AS selection_count ,lb.lob_name,sd.pricing_model " +
            "FROM selectiontracker.selection_details sd,selectiontracker.lob lb " +
            "WHERE sd.lob_id=lb.lob_id " +
            "GROUP BY lb.lob_id,sd.pricing_model", nativeQuery = true)
    List<SelectionDTO> findSelections();

    @Query(value = "SELECT COUNT(*) as ctool_count, os.onboarding_status, bs.bgv_status " +
            "FROM selection_details sd " +
            "JOIN tagging_details td ON sd.ps_id = td.ps_id " +
            "JOIN onboarding_status os ON td.onboarding_status_id = os.status_id " +
            "JOIN BGVStatus bs ON td.bgvstatus_id = bs.bgv_status_id " +
            "GROUP BY os.status_id, bs.bgv_status_id", nativeQuery = true)
    List<CtoolDto> findCtool();
}


// select count(*),os.onboarding_status,bs.bgv_status from selection_details sd , tagging_details td, onboarding_status os, BGVStatus bs
// where sd.ps_id = td.ps_id
// and td.onboarding_status_id = os.status_id
// and td.bgvstatus_id = bs.bgv_status_id
// group by os.status_id,bs.bgv_status_id
