package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;

@Repository
public interface SelectionDetailsRepository extends JpaRepository<SelectionDetails, Integer> {
    SelectionDetails findByEmployee_Psid(int psid); 
    SelectionDetails findByCandidate_CandidateId(int candidateId);
    Boolean existsByEmployee_Psid(int psId);
    Boolean existsByCandidate_CandidateId(int candidateId);

    @Query(value = "SELECT count(*) AS selection_count ,lb.lob_name,sd.pricing_model "+
                   "FROM selectiontracker.selection_details sd,selectiontracker.lob lb " +
                   "WHERE sd.lob_id=lb.lob_id " +
                   "GROUP BY lb.lob_id,sd.pricing_model",nativeQuery = true)
    List<SelectionDTO> findSelections();
}
