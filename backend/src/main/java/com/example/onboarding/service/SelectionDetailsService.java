package com.example.onboarding.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.SelectionDetailsRepository;
import com.example.onboarding.repository.VendorCandidateRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SelectionDetailsService {

    private final VendorCandidateRepository vendorCandidateRepository;

    @Autowired
    private SelectionDetailsRepository selectionDetailsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TaggingDetailsService taggingDetailsService;

    SelectionDetailsService(VendorCandidateRepository vendorCandidateRepository) {
        this.vendorCandidateRepository = vendorCandidateRepository;
    }

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
            existingDetails.setCandidateStatusDate(updatedDetails.getCandidateStatusDate());
            existingDetails.setCtoolStartDate(updatedDetails.getCtoolStartDate());
            existingDetails.setUpdateDate(new Date());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails updateSelectionDetailsByCandidatePhoneNumber(Long phoneNumber,
            SelectionDetails updatedDetails) {
        SelectionDetails existingDetails = selectionDetailsRepository.findByCandidate_PhoneNumber(phoneNumber);
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
            existingDetails.setCandidateStatusDate(updatedDetails.getCandidateStatusDate());
            existingDetails.setCtoolStartDate(updatedDetails.getCtoolStartDate());
            existingDetails.setCreateDate(existingDetails.getCreateDate());
            existingDetails.setUpdateDate(new Date());
            existingDetails.setIrm(updatedDetails.getIrm());
            existingDetails.setCreatedBy(existingDetails.getCreatedBy());
            existingDetails.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            return selectionDetailsRepository.save(existingDetails);
        }
        return selectionDetailsRepository.save(updatedDetails);
    }

    public SelectionDetails updateSelectionDetailsByVendorCandidatePhoneNumber(Long phoneNumber,
            SelectionDetails updatedDetails) {
        SelectionDetails existingDetails = selectionDetailsRepository.findByVendorCandidate_PhoneNumber(phoneNumber);
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
            existingDetails.setCandidateStatusDate(updatedDetails.getCandidateStatusDate());
            existingDetails.setCtoolStartDate(updatedDetails.getCtoolStartDate());
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
        int psid = details.getEmployee().getPsid();
        if (selectionDetailsRepository.existsByEmployee_Psid(psid)
                && taggingDetailsService.getTaggingDetailsByPsId(psid).getOnboardingStatus().getStatusId() != 6) {
            throw new RuntimeException("Selection already exists");
        } else {
            details.setCreateDate(new Date());
            details.setUpdateDate(new Date());
            details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            System.out.println("Dates" + details.getCreateDate() + details.getUpdateDate());
            return selectionDetailsRepository.save(details);
        }
    }

    public SelectionDetails createSelectionDetails_Candidate(SelectionDetails details) {
        Long phoneNumber = details.getCandidate().getPhoneNumber();
        if (selectionDetailsRepository.existsByCandidate_PhoneNumber(phoneNumber) && taggingDetailsService
                .getTaggingDetailsByCandidatePhoneNumber(phoneNumber).getOnboardingStatus().getStatusId() != 6) {
            throw new RuntimeException(
                    "Selection already exists for Candidate: " + details.getCandidate().getPhoneNumber());
        } else {
            details.setCreateDate(new Date());
            details.setUpdateDate(new Date());
            details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
            details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
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
        details.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
        details.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());

        System.out.println("Dates: " + details.getCreateDate() + " " + details.getUpdateDate());

        return selectionDetailsRepository.save(details);
    }

    public Page<EmployeeCandidateDTO> getEmployeeCandidates(Integer createdBy, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<EmployeeCandidateDTO> employeeCandidateDTOPage = selectionDetailsRepository.findEmployeeCandidates(
                createdBy,
                pageable);

        log.info("Employee Candidates Handler data : Page {} of {}", page, employeeCandidateDTOPage.getTotalPages());
        employeeCandidateDTOPage.forEach(candidate -> log.info("Employee Candidate: {}", candidate));

        return employeeCandidateDTOPage;
    }

    // In SelectionDetailsService.java

    public List<SelectionDTO> findSelections(String filter) {
        return selectionDetailsRepository.findSelections(filter);
    }

    public List<AwaitedCasesDTO> findAwaitedCases(String filter) {
        return selectionDetailsRepository.findAwaitedCases(filter);
    }

    public List<CtoolDto> findCtool(String filter) {
        return selectionDetailsRepository.findCtool(filter);
    }

}