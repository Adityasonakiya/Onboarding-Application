package com.example.onboarding.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.EvidenceDTO;

@Repository
public interface EvidenceRepository extends JpaRepository<EvidenceDTO, Integer>{

    List<EvidenceDTO> findEvidenceBySelectionId(int selectionId);
}
