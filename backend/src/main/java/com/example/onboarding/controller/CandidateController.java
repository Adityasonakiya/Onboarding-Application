package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{candidateId}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable int candidateId) {
        Candidate candidate = candidateService.getCandidateById(candidateId);
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
}

