package com.example.onboarding.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.service.SelectionDetailsService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin("*")
@RestController
@RequestMapping("/selection-details")
public class SelectionDetailsController {

    @Autowired
    private SelectionDetailsService selectionDetailsService;

    @GetMapping("/psid/{psid}")
    public ResponseEntity<SelectionDetails> getSelectionDetailsByPsid(@PathVariable int psid) {
        SelectionDetails selectionDetails = selectionDetailsService.getSelectionDetailsByPsid(psid);
        if (selectionDetails != null) {
            return new ResponseEntity<>(selectionDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/candidateId/{candidateId}")
    public ResponseEntity<SelectionDetails> getSelectionDetailsByCandidateId(@PathVariable int candidateId) {
        SelectionDetails selectionDetails = selectionDetailsService.getSelectionDetailsByCandidateId(candidateId);
        if (selectionDetails != null) {
            return new ResponseEntity<>(selectionDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/psid/{psId}")
    public ResponseEntity<?> updateSelectionDetailsByPsId(@PathVariable int psId, @RequestBody SelectionDetails updatedDetails) {
        System.out.println("Incoming request payload: " + updatedDetails);
        System.out.println("CToolJobCategory in payload: " + updatedDetails.getCToolJobCategory());
        
        SelectionDetails details = selectionDetailsService.updateSelectionDetailsByPsId(psId, updatedDetails);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PutMapping("/candidate/{candidateId}")
    public ResponseEntity<SelectionDetails> updateSelectionDetailsByCandidateId(@PathVariable int candidateId,
            @RequestBody SelectionDetails updatedDetails) {
        SelectionDetails details = selectionDetailsService.updateSelectionDetailsByCandidateId(candidateId,
                updatedDetails);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }

    }
}
