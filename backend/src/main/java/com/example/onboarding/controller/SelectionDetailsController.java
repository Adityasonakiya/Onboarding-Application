package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.AwaitedCases;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.service.SelectionDetailsService;


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
    @PostMapping("/create/employee")
    public ResponseEntity<SelectionDetails> createSelectionDetails_Employee(@RequestBody SelectionDetails details){
        SelectionDetails selectionDetails = selectionDetailsService.createSelectionDetails_Employee(details);
        System.out.println("details="+details);
        if(details!=null)
            return ResponseEntity.status(201).body(selectionDetails);
        return ResponseEntity.status(500).build();    
    }

    @PostMapping("/create/candidate")
    public ResponseEntity<SelectionDetails> createSelectionDetails_Candidate(@RequestBody SelectionDetails details){
        SelectionDetails selectionDetails = selectionDetailsService.createSelectionDetails_Candidate(details);
        System.out.println("details="+details);
        if(details!=null)
            return ResponseEntity.status(201).body(selectionDetails);
        return ResponseEntity.status(500).build();    
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
    

    @PutMapping("/candidateId/{candidateId}")
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

    @GetMapping("/selections")
    public ResponseEntity<List<SelectionDTO>> findSelections(){
        List<SelectionDTO> selections = selectionDetailsService.findSelections();
        return ResponseEntity.ok(selections);
    }

    @GetMapping("/ctool")
    public ResponseEntity<List<CtoolDto>> findCtool(){
        List<CtoolDto> ctool = selectionDetailsService.findCtool();
        return ResponseEntity.ok(ctool);
    }

    @GetMapping("/awaited-cases")
    public ResponseEntity<List<AwaitedCases>> findAwaitedCases(){
        List<AwaitedCases> awaitedCases = selectionDetailsService.findAwaitedCases();
        return ResponseEntity.ok(awaitedCases);
    }

}
