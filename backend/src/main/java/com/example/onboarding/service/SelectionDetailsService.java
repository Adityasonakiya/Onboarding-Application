package com.example.onboarding.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.model.EvidenceDTO;
import com.example.onboarding.model.ExcelDataDTO;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.repository.CandidateRepository;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.SelectionDetailsRepository;
import com.example.onboarding.repository.VendorCandidateRepository;

@Service
public class SelectionDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private SelectionDetailsRepository selectionDetailsRepository;

    // @Autowired
    // private UserService userService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private TaggingDetailsService taggingDetailsService;

    @Autowired
    private VendorCandidateRepository vendorCandidateRepository;


    public SelectionDetails getSelectionDetailsByPsid(int psid) {
        return selectionDetailsRepository.findSelectionDetailsByPsId(psid);
    }

    public SelectionDetails getSelectionDetailsByCandidatePhoneNumber(Long phoneNumber) {
        return selectionDetailsRepository.findByCandidate_PhoneNumber(phoneNumber);
    }

    public SelectionDetails getSelectionDetailsByVendorCandidatePhoneNumber(Long phoneNumber) {
        return selectionDetailsRepository.findByVendorCandidate_PhoneNumber(phoneNumber);
    }

    public SelectionDetails updateSelectionDetailsByPsId(int psId, SelectionDetails updatedDetails) {
        System.out.println(
                "CandidateDate that is provided by frontend is here: " + updatedDetails.getCandidateStatusDate());
        SelectionDetails existingDetails = selectionDetailsRepository.findSelectionDetailsByPsId(psId);
        if (existingDetails != null) {
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setHSBCSelectionDate(updatedDetails.getHSBCSelectionDate());
            existingDetails.setHSBCHiringManager(updatedDetails.getHSBCHiringManager()) ;                      
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setDeliveryManager(updatedDetails.getDeliveryManager());
            existingDetails.setSalesPOC(updatedDetails.getSalesPOC());
            existingDetails.setHSBCHead(updatedDetails.getHSBCHead());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setPricingModel(updatedDetails.getPricingModel());
            existingDetails.setHSBCToolId(updatedDetails.getHSBCToolId());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCToolReceivedDate(updatedDetails.getCToolReceivedDate());
            existingDetails.setCToolLocation(updatedDetails.getCToolLocation());
            existingDetails.setHsbcRoles(updatedDetails.getHsbcRoles());
            existingDetails.setCToolGrade(updatedDetails.getCToolGrade());
            existingDetails.setCToolTaggingRate(updatedDetails.getCToolTaggingRate());
            existingDetails.setCToolProposedRate(updatedDetails.getCToolProposedRate());
            existingDetails.setRecruiterName(updatedDetails.getRecruiterName());

            // Update interviewEvidences collection
            if (existingDetails.getInterviewEvidences() == null) {
                existingDetails.setInterviewEvidences(new ArrayList<>()); // Initialize if null
            } else {
                existingDetails.getInterviewEvidences().clear(); // Clear the existing collection to avoid duplicates
            }

            if (updatedDetails.getInterviewEvidences() != null) {
                for (EvidenceDTO evidence : updatedDetails.getInterviewEvidences()) {
                    evidence.setSelectionId(existingDetails.getSelectionId()); // Set the parent reference
                    existingDetails.getInterviewEvidences().add(evidence); // Add the new evidence
                }
            }
            existingDetails.setOfferReleaseStatus(updatedDetails.getOfferReleaseStatus());
            existingDetails.setHSBCOnboardingDate(updatedDetails.getHSBCOnboardingDate());
            existingDetails.setTechSelectionDate(updatedDetails.getTechSelectionDate());
            existingDetails.setDOJReceivedDate(updatedDetails.getDOJReceivedDate());
            existingDetails.setLTIOnboardingDate(updatedDetails.getLTIOnboardingDate());
            existingDetails.setBgvInitiatedDate(updatedDetails.getBgvInitiatedDate());
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setCandidateStatusDate(updatedDetails.getCandidateStatusDate());
            existingDetails.setBillingStartDate(updatedDetails.getBillingStartDate());
            existingDetails.setHsbcId(updatedDetails.getHsbcId());
            existingDetails.setCtoolStartDate(updatedDetails.getCtoolStartDate());
            existingDetails.setUpdateDate(new Date());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(existingDetails.getUpdatedBy());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails updateSelectionDetailsByCandidatePhoneNumber(Long phoneNumber,
            SelectionDetails updatedDetails) {
        SelectionDetails existingDetails = selectionDetailsRepository.findByCandidate_PhoneNumber(phoneNumber);
        if (existingDetails != null) {
            existingDetails.setHSBCSelectionDate(updatedDetails.getHSBCSelectionDate());
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setDeliveryManager(updatedDetails.getDeliveryManager());
            existingDetails.setSalesPOC(updatedDetails.getSalesPOC());
            existingDetails.setHSBCHead(updatedDetails.getHSBCHead());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setHSBCHiringManager(updatedDetails.getHSBCHiringManager());
            existingDetails.setPricingModel(updatedDetails.getPricingModel());
            existingDetails.setHSBCToolId(updatedDetails.getHSBCToolId());
            existingDetails.setCToolReceivedDate(updatedDetails.getCToolReceivedDate());
            existingDetails.setCToolLocation(updatedDetails.getCToolLocation());
            existingDetails.setHsbcRoles(updatedDetails.getHsbcRoles());
            existingDetails.setCToolGrade(updatedDetails.getCToolGrade());
            existingDetails.setCToolTaggingRate(updatedDetails.getCToolTaggingRate());
            existingDetails.setCToolProposedRate(updatedDetails.getCToolProposedRate());
            existingDetails.setRecruiterName(updatedDetails.getRecruiterName());

            // Update interviewEvidences collection
            if (existingDetails.getInterviewEvidences() == null) {
                existingDetails.setInterviewEvidences(new ArrayList<>()); // Initialize if null
            }
            existingDetails.getInterviewEvidences().clear(); // Clear the existing collection
            for (EvidenceDTO evidence : updatedDetails.getInterviewEvidences()) {
                evidence.setSelectionId(existingDetails.getSelectionId()); // Set the parent reference
                existingDetails.getInterviewEvidences().add(evidence); // Add the new evidence
            }
            existingDetails.setOfferReleaseStatus(updatedDetails.getOfferReleaseStatus());
            existingDetails.setHSBCOnboardingDate(updatedDetails.getHSBCOnboardingDate());
            existingDetails.setTechSelectionDate(updatedDetails.getTechSelectionDate());
            existingDetails.setDOJReceivedDate(updatedDetails.getDOJReceivedDate());
            existingDetails.setLTIOnboardingDate(updatedDetails.getLTIOnboardingDate());
            existingDetails.setBgvInitiatedDate(updatedDetails.getBgvInitiatedDate());
            existingDetails.setCandidateStatusDate(updatedDetails.getCandidateStatusDate());
            existingDetails.setBillingStartDate(updatedDetails.getBillingStartDate());
            existingDetails.setHsbcId(updatedDetails.getHsbcId());
            existingDetails.setCtoolStartDate(updatedDetails.getCtoolStartDate());
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setUpdateDate(new Date());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(existingDetails.getUpdatedBy());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails updateSelectionDetailsByVendorCandidatePhoneNumber(Long phoneNumber,
            SelectionDetails updatedDetails) {
        SelectionDetails existingDetails = selectionDetailsRepository.findByVendorCandidate_PhoneNumber(phoneNumber);
        if (existingDetails != null) {
            existingDetails.setHSBCSelectionDate(updatedDetails.getHSBCSelectionDate());
            existingDetails.setLob(updatedDetails.getLob());
            existingDetails.setDeliveryManager(updatedDetails.getDeliveryManager());
            existingDetails.setSalesPOC(updatedDetails.getSalesPOC());
            existingDetails.setHSBCHead(updatedDetails.getHSBCHead());
            existingDetails.setSubLob(updatedDetails.getSubLob());
            existingDetails.setHSBCHiringManager(updatedDetails.getHSBCHiringManager());
            existingDetails.setPricingModel(updatedDetails.getPricingModel());
            existingDetails.setHSBCToolId(updatedDetails.getHSBCToolId());
            existingDetails.setCToolReceivedDate(updatedDetails.getCToolReceivedDate());
            existingDetails.setCToolLocation(updatedDetails.getCToolLocation());
            existingDetails.setHsbcRoles(updatedDetails.getHsbcRoles());
            existingDetails.setCToolGrade(updatedDetails.getCToolGrade());
            existingDetails.setCToolTaggingRate(updatedDetails.getCToolTaggingRate());
            existingDetails.setCToolProposedRate(updatedDetails.getCToolProposedRate());
            existingDetails.setRecruiterName(updatedDetails.getRecruiterName());

            // Update interviewEvidences collection
            if (existingDetails.getInterviewEvidences() == null) {
                existingDetails.setInterviewEvidences(new ArrayList<>()); // Initialize if null
            }
            existingDetails.getInterviewEvidences().clear(); // Clear the existing collection
            for (EvidenceDTO evidence : updatedDetails.getInterviewEvidences()) {
                evidence.setSelectionId(existingDetails.getSelectionId()); // Set the parent reference
                existingDetails.getInterviewEvidences().add(evidence); // Add the new evidence
            }
            existingDetails.setOfferReleaseStatus(updatedDetails.getOfferReleaseStatus());
            existingDetails.setHSBCOnboardingDate(updatedDetails.getHSBCOnboardingDate());
            existingDetails.setTechSelectionDate(updatedDetails.getTechSelectionDate());
            existingDetails.setDOJReceivedDate(updatedDetails.getDOJReceivedDate());
            existingDetails.setLTIOnboardingDate(updatedDetails.getLTIOnboardingDate());
            existingDetails.setBgvInitiatedDate(updatedDetails.getBgvInitiatedDate());
            existingDetails.setCandidateStatusDate(updatedDetails.getCandidateStatusDate());
            existingDetails.setBillingStartDate(updatedDetails.getBillingStartDate());
            existingDetails.setHsbcId(updatedDetails.getHsbcId());
            existingDetails.setCtoolStartDate(updatedDetails.getCtoolStartDate());
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setUpdateDate(new Date());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(existingDetails.getUpdatedBy());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails createSelectionDetails_Employee(SelectionDetails details) {
        int psid = details.getEmployee().getPsid();
        if (selectionDetailsRepository.existsByEmployee_Psid(psid)
              //  || taggingDetailsService.getTaggingDetailsByPsId(psid).getOnboardingStatus().getStatusId() != 6
                ) {
            throw new RuntimeException("Selection already exists");
        } else {
            details.setCreateDate(new Date());
            details.setUpdateDate(new Date());
            // details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            // details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        }
    }

    public SelectionDetails createSelectionDetails_Candidate(SelectionDetails details) {
        Long phoneNumber = details.getCandidate().getPhoneNumber();
        if (selectionDetailsRepository.existsByCandidate_PhoneNumber(phoneNumber) 
        //&& taggingDetailsService.getTaggingDetailsByCandidatePhoneNumber(phoneNumber).getOnboardingStatus().getStatusId() != 6
                ) {
            throw new RuntimeException(
                    "Selection already exists for Candidate: " + details.getCandidate().getPhoneNumber());
        } else {
            details.setCreateDate(new Date());
            details.setUpdateDate(new Date());
            //details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            //details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        }
    }

    public SelectionDetails createSelectionDetails_VendorCandidate(SelectionDetails details) {
        int vendor_candidate_id = details.getVendorCandidate().getVendorCandidateId(); // Ensure phoneNumber exists

        // Fetch existing VendorCandidate from the DB
        VendorCandidate existingVendorCandidate = vendorCandidateRepository.findById(vendor_candidate_id)
                .orElseThrow(() -> new RuntimeException("VendorCandidate not found for id: " + vendor_candidate_id));

        // Set the existing VendorCandidate instead of creating a new one
        details.setVendorCandidate(existingVendorCandidate);

        details.setCreateDate(new Date());
        details.setUpdateDate(new Date());
        //details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
        //.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());

        System.out.println("Dates: " + details.getCreateDate() + " " + details.getUpdateDate());

        return selectionDetailsRepository.save(details);
    }

    public Page<EmployeeCandidateDTO> getEmployeeCandidates(Integer loggedInPsid, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<EmployeeCandidateDTO> employeeCandidateDTOPage = selectionDetailsRepository.findEmployeeCandidates(
                loggedInPsid,
                pageable);

        logger.info("Employee Candidates Handler data : Page {} of {}", page, employeeCandidateDTOPage.getTotalPages());
        employeeCandidateDTOPage.forEach(candidate -> logger.info("Employee Candidate: {}", candidate));

        return employeeCandidateDTOPage;
    }

    // In SelectionDetailsService.java
    public List<SelectionDTO> findSelections(String filter,Integer loggedInPsid) {
        return selectionDetailsRepository.findSelections(filter, loggedInPsid);
    }

    public List<AwaitedCasesDTO> findAwaitedCases(String filter,Integer loggedInPsid) {
        return selectionDetailsRepository.findAwaitedCases(filter,loggedInPsid);
    }

    public List<CtoolDto> findCtool(String filter,Integer loggedInPsid) {
        return selectionDetailsRepository.findCtool(filter,loggedInPsid);
    }

    public List<ExcelDataDTO> findExcelData(Integer createdBy) {
        System.out.println("Result" + createdBy);
        System.out.println(selectionDetailsRepository.findCustomQueryResults(createdBy));
        return selectionDetailsRepository.findCustomQueryResults(createdBy);
    }
   public List<EmployeeCandidateDTO> searchAllByHiringManager(String hsbchiringManager) {
    List<EmployeeCandidateDTO> candidates = candidateRepository.searchCandidateByClientName(hsbchiringManager);
    List<EmployeeCandidateDTO> employees = employeeRepository.searchEmployeeByClientName(hsbchiringManager);
    List<EmployeeCandidateDTO> combined = new ArrayList<>();
    combined.addAll(candidates);
    combined.addAll(employees);
    return combined;
}

public List<String> getAllDistinctHSBCHiringManagers() {
    return selectionDetailsRepository.findAllDistinctHsbchiringManager();
}
}
