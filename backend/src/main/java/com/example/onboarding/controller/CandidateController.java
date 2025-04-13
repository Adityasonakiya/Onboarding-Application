package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.service.CandidateService;

@CrossOrigin("*")
@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping("/{phoneNumber}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long phoneNumber) {
        Candidate candidate = candidateService.getCandidateById(phoneNumber);
        if (candidate != null) {
            return new ResponseEntity<>(candidate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates(){
        List<Candidate> candidates = candidateService.getAllCandidates();
        if (candidates!=null) {
            return new ResponseEntity<>(candidates, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Candidate> createVendorCandidate(@RequestBody Candidate candidate) {
        System.out.println("Object sent"+ candidate);
        if (candidate == null) {
            return ResponseEntity.badRequest().build();
        }
        Candidate createdCandidate = candidateService.createCandidate(candidate);
        System.out.println("Object recieved"+ createdCandidate);
        return new ResponseEntity<>(createdCandidate, HttpStatus.CREATED);
    }
}

