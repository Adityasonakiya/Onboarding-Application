package com.example.onboarding.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.service.CandidateService;
import com.example.onboarding.service.SelectionDetailsService;
import com.example.onboarding.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private SelectionDetailsService selectionDetailsService;

@GetMapping("/api/candidates/searchAllByHiringManager")
public ResponseEntity<List<EmployeeCandidateDTO>> searchAllByHiringManager(
        @RequestParam("hsbchiringManager") String hsbchiringManager) {
    List<EmployeeCandidateDTO> results = selectionDetailsService.searchAllByHiringManager(hsbchiringManager);
    return ResponseEntity.ok(results);
}

    @GetMapping("/{phoneNumber}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long phoneNumber) {
        Candidate candidate = candidateService.getCandidateById(phoneNumber);
        if (candidate != null) {
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/phoneNumber/{phoneNumber}")
    public ResponseEntity<EmployeeCandidateDTO> getCandidateByPhoneNumber(@PathVariable Long phoneNumber) {
        try {
            System.out.println("Type of phoneNumber: " + phoneNumber.getClass().getName());

    
            EmployeeCandidateDTO candidate = candidateService.getEmployeeCandidateById(phoneNumber);
            return candidate != null
                    ? new ResponseEntity<>(candidate, HttpStatus.OK)
                    : new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (NumberFormatException e) {
            logger.error("Invalid phone number format: {}", phoneNumber);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();
        if (candidates != null) {
            return new ResponseEntity<>(candidates, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/candidates/search")
    public ResponseEntity<List<EmployeeCandidateDTO>> searchCandidatesByName(@RequestParam String query) {
        List<EmployeeCandidateDTO> candidates = candidateService.searchByCandidateName(query);
        if (candidates.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/api/candidates/searchClient")
    public ResponseEntity<List<EmployeeCandidateDTO>> searchCandidatesByClientName(
            @RequestParam("hsbchiringManager") String hsbchiringManager) {
        List<EmployeeCandidateDTO> candidates = candidateService.searchCandidateByClientName(hsbchiringManager);
        if (candidates.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(candidates);
    }

    
    @PostMapping("/create")
    public ResponseEntity<Candidate> createVendorCandidate(@RequestBody Candidate candidate) {
        System.out.println("Object sent" + candidate);
        if (candidate == null) {
            return ResponseEntity.badRequest().build();
        }
        Candidate createdCandidate = candidateService.createCandidate(candidate);
        System.out.println("Object recieved" + createdCandidate);
        return new ResponseEntity<>(createdCandidate, HttpStatus.CREATED);
    }
}
