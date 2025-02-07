package com.example.onboarding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.service.SelectionDetailsService;

@RestController
@RequestMapping("/selection-details")
public class SelectionDetailsController {

    @Autowired
    private SelectionDetailsService selectionDetailsService;

    @GetMapping("/psid/{psid}")
    public ResponseEntity<SelectionDetails> getSelectionDetailsByPsid(@PathVariable int psid) {
        SelectionDetails selectionDetails = selectionDetailsService.getSelectionDetailsByPsid(psid);
        if (selectionDetails!=null) {
            return new ResponseEntity<>(selectionDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/candidateId/{candidateId}")
    public ResponseEntity<SelectionDetails> getSelectionDetailsByCandidateId(@PathVariable int candidateId) {
        SelectionDetails selectionDetails = selectionDetailsService.getSelectionDetailsByCandidateId(candidateId);
        if (selectionDetails!=null) {
            return new ResponseEntity<>(selectionDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

