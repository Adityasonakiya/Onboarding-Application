package com.example.onboarding.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.BGVStatus;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.OnboardingStatus;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.model.TaggingDetails;
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

    @Autowired
    private TaggingDetailsService taggingDetailsService;

    BGVStatus bs; OnboardingStatus os;

    public SelectionDetails getSelectionDetailsByPsid(int psid) {
        return selectionDetailsRepository.findSelectionDetailsByPsId(psid);
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
        SelectionDetails existingDetails = selectionDetailsRepository.findSelectionDetailsByPsId(psId);
        if (existingDetails != null) {
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setSubLob(updatedDetails.getSubLob());
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
            existingDetails.setUpdateDate(new Date());
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
            existingDetails.setUpdateDate(new Date());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails createSelectionDetails_Employee(SelectionDetails details) {
        // int psid = details.getEmployee().getPsid();
        // if (selectionDetailsRepository.existsByEmployee_Psid(psid) && taggingDetailsService.getTaggingDetailsByPsId(psid).getOnboardingStatus().getStatusId()!=6) {
        //     throw new RuntimeException("Selection already exists");
        // } else {
            // TaggingDetails td = taggingDetailsService.getTaggingDetailsByPsId(psid);
            // bs.setBgvStatusId(1);os.setStatusId(1);
            // td.setBgvStatus(bs);
            // td.setOnboardingStatus(os);;
            // taggingDetailsService.updateTaggingDetailsByPsId(psid, td);
            // taggingDetailsService.getTaggingDetailsByPsId(psid).getOnboardingStatus().setStatusId(1);
            details.setCreateDate(new Date());
            details.setUpdateDate(new Date());
            details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        //}
    }

    public SelectionDetails createSelectionDetails_Candidate(SelectionDetails details) {
        int candidateId = details.getCandidate().getCandidateId();
        if (selectionDetailsRepository.existsByCandidate_CandidateId(candidateId) && taggingDetailsService.getTaggingDetailsByCandidateId(candidateId).getOnboardingStatus().getStatusId()!=6) {
            throw new RuntimeException("Selection already exists for Candidate: " + details.getCandidate().getCandidateId());
        } else {
            details.setCreateDate(new Date());
            details.setUpdateDate(new Date());
            details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        }
    }

    public List<SelectionDTO> findSelections() {
        return selectionDetailsRepository.findSelections();
    }

    public List<CtoolDto> findCtool() {
        return selectionDetailsRepository.findCtool();
    }

    public List<AwaitedCasesDTO> findAwaitedCases() {
        return selectionDetailsRepository.findAwaitedCases();
    }
}