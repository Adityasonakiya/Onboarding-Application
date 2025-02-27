package com.example.onboarding.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.model.User;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.SelectionDetailsRepository;

@Service
public class SelectionDetailsService {
    @Autowired
    private SelectionDetailsRepository selectionDetailsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeRepository employeeRepository;

    public SelectionDetails getSelectionDetailsByPsid(int psid) {
        return selectionDetailsRepository.findByEmployee_Psid(psid);
    }

    public SelectionDetails getSelectionDetailsByCandidateId(int candidateId) {
        return selectionDetailsRepository.findByCandidate_CandidateId(candidateId);
    }

    public SelectionDetails updateSelectionDetailsByPsId(int psId, SelectionDetails updatedDetails) {
        System.out.println("updated Details that is provided by frontend is here: " + updatedDetails);
        System.out.println(
                "updated Details that is provided by frontend is here 2: " + updatedDetails.getTechSelectionDate());
        System.out.println(
                "updated Details that is provided by frontend is here 3: " + updatedDetails.getDOJReceivedDate());
        System.out.println(
                "updated Details that is provided by frontend is here 4: " + updatedDetails.getHSBCOnboardingDate());
        SelectionDetails existingDetails = selectionDetailsRepository.findByEmployee_Psid(psId);
        if (existingDetails != null) {
            // existingDetails.setDeliveryManager(updatedDetails.getDeliveryManager());
            // existingDetails.setHSBCSelectionDate(updatedDetails.getHSBCSelectionDate());
            // existingDetails.setHSBCHiringManager(updatedDetails.getHSBCHiringManager());
            // existingDetails.setHSBCHead(updatedDetails.getHSBCHead());
            // existingDetails.setSalesPOC(updatedDetails.getSalesPOC());
            // existingDetails.setPricingModel(updatedDetails.getPricingModel());
            // existingDetails.setHSBCToolId(updatedDetails.getHSBCToolId());
            // existingDetails.setCToolReceivedDate(updatedDetails.getCToolReceivedDate());
            // existingDetails.setCToolJobCategory(updatedDetails.getCToolJobCategory());
            // existingDetails.setCToolLocation(updatedDetails.getCToolLocation());
            // existingDetails.setCToolRate(updatedDetails.getCToolRate());
            // existingDetails.setCToolProposedRate(updatedDetails.getCToolProposedRate());
            // existingDetails.setRecruiterName(updatedDetails.getRecruiterName());
            // existingDetails.setInterviewEvidences(updatedDetails.getInterviewEvidences());
            // existingDetails.setOfferReleaseStatus(updatedDetails.getOfferReleaseStatus());
            existingDetails.setHSBCOnboardingDate(updatedDetails.getHSBCOnboardingDate());
            existingDetails.setTechSelectionDate(updatedDetails.getTechSelectionDate());
            existingDetails.setDOJReceivedDate(updatedDetails.getDOJReceivedDate());
            // existingDetails.setLTIOnboardingDate(updatedDetails.getLTIOnboardingDate());
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setUpdateDate(LocalDateTime.now());
            // existingDetails.setLob(updatedDetails.getLob());
            // existingDetails.setSubLob(updatedDetails.getSubLob());
            // existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
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
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setUpdateDate(LocalDateTime.now());
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails createSelectionDetails_Employee(SelectionDetails details) {
        if (selectionDetailsRepository.existsByEmployee_Psid(details.getEmployee().getPsid())) {
            return updateSelectionDetailsByPsId2(details.getEmployee().getPsid(), details);
        } else {
            details.setCreateDate(LocalDateTime.now());
            details.setUpdateDate(LocalDateTime.now());
            details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        }
    }

    public SelectionDetails createSelectionDetails_Candidate(SelectionDetails details) {
        if (selectionDetailsRepository.existsByCandidate_CandidateId(details.getCandidate().getCandidateId())) {
            return updateSelectionDetailsByCandidateId(details.getCandidate().getCandidateId(), details);
        } else {
            details.setCreateDate(LocalDateTime.now());
            details.setUpdateDate(LocalDateTime.now());
            details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        }
    }

    // public SelectionDetails createSelectionDetails(SelectionDetails details){
    // System.out.println("create");
    //

    // else
    // if(selectionDetailsRepository.existsByCandidate_CandidateId(details.getCandidate().getCandidateId()))
    // return
    // updateSelectionDetailsByCandidateId(details.getCandidate().getCandidateId(),
    // details);

    // else{
    // System.out.println("create");
    // details.setCreateDate(LocalDateTime.now());
    // details.setUpdateDate(LocalDateTime.now());
    // details.setCreatedBy(employeeRepository.findById(10713037).get());
    // details.setUpdatedBy(employeeRepository.findById(10713037).get());
    // return selectionDetailsRepository.save(details);
    // }
    // }
    // }
    // userService.loggedUser().getPsid()).get()

    public SelectionDetails updateSelectionDetailsByPsId2(int psId, SelectionDetails updatedDetails) {
        System.out.println("updated Details that is provided by frontend is here: " + updatedDetails);
        System.out.println(
                "updated Details that is provided by frontend is here 2: " + updatedDetails.getTechSelectionDate());
        System.out.println(
                "updated Details that is provided by frontend is here 3: " + updatedDetails.getDOJReceivedDate());
        System.out.println(
                "updated Details that is provided by frontend is here 4: " + updatedDetails.getHSBCOnboardingDate());
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
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setUpdateDate(LocalDateTime.now());
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }
}