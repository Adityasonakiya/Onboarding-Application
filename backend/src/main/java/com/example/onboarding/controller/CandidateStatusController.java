package com.example.onboarding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.onboarding.model.CandidateStatus;
import com.example.onboarding.service.CandidateStatusService;

@RestController
@CrossOrigin("*")
@RequestMapping("/candidate-status")
public class CandidateStatusController {

    @Autowired
    private CandidateStatusService candidateStatusService;

    @GetMapping("/all")
    public List<CandidateStatus> getAllCandidateStatus() {
        return candidateStatusService.getAllcandiadteStatus();
    }
}
