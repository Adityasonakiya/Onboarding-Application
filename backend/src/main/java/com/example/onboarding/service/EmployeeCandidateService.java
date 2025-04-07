package com.example.onboarding.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.repository.EmployeeCandidateRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EmployeeCandidateService {
    @Autowired
    private EmployeeCandidateRepository employeeCandidateRepository;

    public Page<EmployeeCandidateDTO> getEmployeeCandidates(Integer createdBy, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<EmployeeCandidateDTO> employeeCandidateDTOPage = employeeCandidateRepository.findAllCandidates(createdBy,
                pageable);

        log.info("Employee Candidates Handler data : Page {} of {}", page, employeeCandidateDTOPage.getTotalPages());
        employeeCandidateDTOPage.forEach(candidate -> log.info("Employee Candidate: {}", candidate));

        return employeeCandidateDTOPage;
    }

    public EmployeeCandidateDTO getEmployeeCandidateById(int id) {
        log.info("Id that is coming: {}", id);
        Optional<EmployeeCandidateDTO> employeeCandidateOptional = employeeCandidateRepository.findEmployeeCandidateOrVendorById(id);
    
        if (employeeCandidateOptional.isPresent()) {
            EmployeeCandidateDTO employeeCandidate = employeeCandidateOptional.get();
            log.info("Employee Candidate: {}", employeeCandidate);
            return employeeCandidate;
        } else {
            log.warn("Employee Candidate with ID {} not found", id);
            throw new EntityNotFoundException("Employee Candidate not found with ID: " + id);
        }
    }

}
