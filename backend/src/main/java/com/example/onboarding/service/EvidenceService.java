package com.example.onboarding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.EvidenceDTO;
import com.example.onboarding.repository.EvidenceRepository;

@Service
public class EvidenceService {
    @Autowired
    private EvidenceRepository evidenceRepository;

    public EvidenceDTO createEvidence(EvidenceDTO evidence) {
        return evidenceRepository.save(evidence);
    }

    public EvidenceDTO getEvidenceById(int id) {
        return evidenceRepository.findById(id).orElse(null);
    }

    public List<EvidenceDTO> getEvidenceBySelectionId(int selectionId) {
        return evidenceRepository.findBySelectionId(selectionId);
    }

    public boolean deleteEvidence(String fileName, int selectionId) {
        List<EvidenceDTO> evidences = evidenceRepository.findBySelectionId(selectionId);
        for (EvidenceDTO evidence : evidences) {
            if (evidence.getFileName().equals(fileName)) {
                evidenceRepository.deleteById(evidence.getId());
                return true;
            }
        }
        return false;
    }
}
