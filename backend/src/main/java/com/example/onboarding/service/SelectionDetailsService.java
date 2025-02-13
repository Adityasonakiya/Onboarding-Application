package com.example.onboarding.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.repository.SelectionDetailsRepository;

@Service
public class SelectionDetailsService {
    @Autowired
    private SelectionDetailsRepository selectionDetailsRepository;

    public SelectionDetails getSelectionDetailsByPsid(int psid) {
        return selectionDetailsRepository.findByEmployee_Psid(psid);
    }

    public SelectionDetails getSelectionDetailsByCandidateId(int candidateId) {
        return selectionDetailsRepository.findByCandidate_CandidateId(candidateId);
    }

    public SelectionDetails updateSelectionDetailsByPsId(int psId, SelectionDetails updatedDetails) {
        System.out.println("updated Details that is provided by frontend is here: " + updatedDetails);
        System.out.println("updated Details that is provided by frontend is here 2: " + updatedDetails.getTechSelectionDate());
        System.out.println("updated Details that is provided by frontend is here 3: " + updatedDetails.getDOJReceivedDate());
        System.out.println("updated Details that is provided by frontend is here 4: " + updatedDetails.getHSBCOnboardingDate());
        SelectionDetails existingDetails = selectionDetailsRepository.findByEmployee_Psid(psId);
        if (existingDetails != null) {
            existingDetails.setDeliveryManager(updatedDetails.getDeliveryManager());
            existingDetails.setHSBCSelectionDate(updatedDetails.getHSBCSelectionDate());
            existingDetails.setHSBCHiringManager(updatedDetails.getHSBCHiringManager());
            existingDetails.setHSBCHead(updatedDetails.getHSBCHead());
            existingDetails.setSalesPOC(updatedDetails.getSalesPOC());
            existingDetails.setPricingModel(updatedDetails.getPricingModel());
            existingDetails.setHSBCToolId(updatedDetails.getHSBCToolId());
            existingDetails.setCToolReceivedDate(updatedDetails.getCToolReceivedDate());
            existingDetails.setCToolJobCategory(updatedDetails.getCToolJobCategory());
            existingDetails.setCToolLocation(updatedDetails.getCToolLocation());
            existingDetails.setCToolRate(updatedDetails.getCToolRate());
            existingDetails.setCToolProposedRate(updatedDetails.getCToolProposedRate());
            existingDetails.setRecruiterName(updatedDetails.getRecruiterName());
            existingDetails.setInterviewEvidences(updatedDetails.getInterviewEvidences());
            existingDetails.setOfferReleaseStatus(updatedDetails.getOfferReleaseStatus());
            existingDetails.setHSBCOnboardingDate(updatedDetails.getHSBCOnboardingDate());
            existingDetails.setTechSelectionDate(updatedDetails.getTechSelectionDate());
            existingDetails.setDOJReceivedDate(updatedDetails.getDOJReceivedDate());
            existingDetails.setLTIOnboardingDate(updatedDetails.getLTIOnboardingDate());
            existingDetails.setCreateDate(updatedDetails.getCreateDate());
            existingDetails.setUpdateDate(updatedDetails.getUpdateDate());
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(updatedDetails.getCreatedBy());
            existingDetails.setUpdatedBy(updatedDetails.getUpdatedBy());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails updateSelectionDetailsByCandidateId(int candidateId, SelectionDetails updatedDetails) {
        SelectionDetails existingDetails = selectionDetailsRepository.findByCandidate_CandidateId(candidateId);
        if (existingDetails != null) {
            existingDetails.setDeliveryManager(updatedDetails.getDeliveryManager());
            existingDetails.setHSBCSelectionDate(updatedDetails.getHSBCSelectionDate());
            existingDetails.setHSBCHiringManager(updatedDetails.getHSBCHiringManager());
            existingDetails.setHSBCHead(updatedDetails.getHSBCHead());
            existingDetails.setSalesPOC(updatedDetails.getSalesPOC());
            existingDetails.setPricingModel(updatedDetails.getPricingModel());
            existingDetails.setHSBCToolId(updatedDetails.getHSBCToolId());
            existingDetails.setCToolReceivedDate(updatedDetails.getCToolReceivedDate());
            existingDetails.setCToolJobCategory(updatedDetails.getCToolJobCategory());
            existingDetails.setCToolLocation(updatedDetails.getCToolLocation());
            existingDetails.setCToolRate(updatedDetails.getCToolRate());
            existingDetails.setCToolProposedRate(updatedDetails.getCToolProposedRate());
            existingDetails.setRecruiterName(updatedDetails.getRecruiterName());
            existingDetails.setInterviewEvidences(updatedDetails.getInterviewEvidences());
            existingDetails.setOfferReleaseStatus(updatedDetails.getOfferReleaseStatus());
            existingDetails.setHSBCOnboardingDate(updatedDetails.getHSBCOnboardingDate());
            existingDetails.setTechSelectionDate(updatedDetails.getTechSelectionDate());
            existingDetails.setDOJReceivedDate(updatedDetails.getDOJReceivedDate());
            existingDetails.setLTIOnboardingDate(updatedDetails.getLTIOnboardingDate());
            existingDetails.setCreateDate(updatedDetails.getCreateDate());
            existingDetails.setUpdateDate(updatedDetails.getUpdateDate());
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(updatedDetails.getCreatedBy());
            existingDetails.setUpdatedBy(updatedDetails.getUpdatedBy());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }
    public SelectionDetails createSelectionDetails(SelectionDetails details){
        return selectionDetailsRepository.save(details);
    }
}
