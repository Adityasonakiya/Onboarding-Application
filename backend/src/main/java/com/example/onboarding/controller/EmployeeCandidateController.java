package com.example.onboarding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.service.EmployeeCandidateService;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employee-candidates")
@Slf4j
public class EmployeeCandidateController {

    @Autowired
    private EmployeeCandidateService employeeCandidateService;

    @GetMapping
    public Page<EmployeeCandidateDTO> getEmployeeCandidates(
        @RequestParam Integer createdBy,
        @RequestParam int page,
        @RequestParam int size
    ) {
        return employeeCandidateService.getEmployeeCandidates(createdBy, page, size);       
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeCandidateDTO> getEmployeeCandidateById(@PathVariable int id) {
        try {
            EmployeeCandidateDTO employeeCandidateDTO = employeeCandidateService.getEmployeeCandidateById(id);
            return ResponseEntity.ok(employeeCandidateDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
