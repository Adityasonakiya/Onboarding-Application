package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class EmployeeService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee getEmployeeByPsid(int psid) {
        Optional<Employee> employee = employeeRepository.findById(psid);
        return employee.orElse(null);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public EmployeeCandidateDTO getEmployeeCandidateById(int id) {
        logger.info("Id that is coming: {}", id);
        Optional<EmployeeCandidateDTO> employeeCandidateOptional = employeeRepository.findEmployeeCandidateByPsid(id);

        if (employeeCandidateOptional.isPresent()) {
            EmployeeCandidateDTO employeeCandidate = employeeCandidateOptional.get();
            logger.info("Employee Candidate: {}", employeeCandidate);
            return employeeCandidate;
        } else {
            logger.warn("Employee Candidate with ID {} not found", id);
            throw new EntityNotFoundException("Employee Candidate not found with ID: " + id);
        }
    }

    public List<EmployeeCandidateDTO> searchById(int query) {
        return employeeRepository.searchByPsidOrCandidateId(query);
    }

    public List<EmployeeCandidateDTO> getCandidatesByOnboardingStatus(String onboardingStatus) {
        return employeeRepository.findByOnboardingStatus(onboardingStatus);
    }

    public List<EmployeeCandidateDTO> getCandidatesByBgvStatus(String bgvStatus) {
        return employeeRepository.findByBgvStatus(bgvStatus);
    }

}
