package com.example.onboarding.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.repository.CandidateRepository;
import com.example.onboarding.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CandidateService {
    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeRepository employeeRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public List<EmployeeCandidateDTO> searchByCandidateName(String query) {
        logger.info("Searching for candidates with name containing: {}", query);
        List<EmployeeCandidateDTO> candidates = candidateRepository.searchByCandidateName(query);
        logger.info("Found {} candidates", candidates.size());
        return candidates;

    }

    public Candidate getCandidateById(Long phoneNumber) {
        Optional<Candidate> candidate = candidateRepository.findByPhoneNumber(phoneNumber);
        return candidate.orElse(null);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate createCandidate(Candidate candidate) {
        System.out.println("ServicePoint " + candidate);
        candidate.setCandidateId(1);
        candidate.setCreateDate(new Date());
        candidate.setUpdateDate(new Date());
        //candidate.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
        //candidate.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
        return candidateRepository.save(candidate);
    }

    public EmployeeCandidateDTO getEmployeeCandidateById(Long id) {
        logger.info("Id that is coming: {}", id);
        Optional<EmployeeCandidateDTO> employeeCandidateOptional = candidateRepository
                .findEmployeeCandidateByPhoneNumber(id);

        if (employeeCandidateOptional.isPresent()) {
            EmployeeCandidateDTO employeeCandidate = employeeCandidateOptional.get();
            logger.info("Employee Candidate: {}", employeeCandidate);
            return employeeCandidate;
        } else {
            logger.warn("Employee Candidate with ID {} not found", id);
            throw new EntityNotFoundException("Employee Candidate not found with ID: " + id);
        }
    }

    // In CandidateService
    public List<EmployeeCandidateDTO> searchCandidateByClientName(String hsbchiringManager) {
        return candidateRepository.searchCandidateByClientName(hsbchiringManager);
    }

}
