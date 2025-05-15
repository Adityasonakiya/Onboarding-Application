package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.CtoolDto;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.model.ExcelDataDTO;
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

    @GetMapping("/candidateId/{phoneNumber}")
    public ResponseEntity<SelectionDetails> getSelectionDetailsByCandidateId(@PathVariable Long phoneNumber) {
        SelectionDetails selectionDetails = selectionDetailsService
                .getSelectionDetailsByCandidatePhoneNumber(phoneNumber);
        if (selectionDetails != null) {
            return new ResponseEntity<>(selectionDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/vendorCandidateId/{phoneNumber}")
    public ResponseEntity<SelectionDetails> getSelectionDetailsByVendorCandidateId(@PathVariable Long phoneNumber) {
        SelectionDetails selectionDetails = selectionDetailsService
                .getSelectionDetailsByVendorCandidatePhoneNumber(phoneNumber);
        if (selectionDetails != null) {
            return new ResponseEntity<>(selectionDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create/employee")
    public ResponseEntity<String> createSelectionDetails_Employee(@RequestBody SelectionDetails details) {
        // try{
        selectionDetailsService.createSelectionDetails_Employee(details);
        System.out.println("details=" + details);
        if (details != null)
            return ResponseEntity.status(201).body("Selection created successfully");
        return ResponseEntity.status(500).build();
        // }catch(RuntimeException e){
        // return ResponseEntity.status(400).body(e.getMessage());
        // }
    }

    @PostMapping("/create/candidate")
    public ResponseEntity<String> createSelectionDetails_Candidate(@RequestBody SelectionDetails details) {
        try {
            selectionDetailsService.createSelectionDetails_Candidate(details);
            System.out.println("details=" + details);
            return ResponseEntity.status(201).body("Selection created successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/create/vendor")
    public ResponseEntity<String> createSelectionDetails_VendorCandidate(@RequestBody SelectionDetails details) {
        try {
            selectionDetailsService.createSelectionDetails_VendorCandidate(details);
            System.out.println("details=" + details);
            return ResponseEntity.status(201).body("Selection created successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping("put/psid/{psId}")
    public ResponseEntity<?> updateSelectionDetailsByPsId(@PathVariable int psId,
            @RequestBody SelectionDetails updatedDetails) {
        System.out.println("Incoming request payload: " + updatedDetails);

        SelectionDetails details = selectionDetailsService.updateSelectionDetailsByPsId(psId, updatedDetails);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("put/candidateId/{phoneNumber}")
    public ResponseEntity<SelectionDetails> updateSelectionDetailsByCandidateId(@PathVariable Long phoneNumber,
            @RequestBody SelectionDetails updatedDetails) {
        SelectionDetails details = selectionDetailsService.updateSelectionDetailsByCandidatePhoneNumber(phoneNumber,
                updatedDetails);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("put/vendorCandidateId/{phoneNumber}")
    public ResponseEntity<SelectionDetails> updateSelectionDetailsByVendorCandidateId(@PathVariable Long phoneNumber,
            @RequestBody SelectionDetails updatedDetails) {
        SelectionDetails details = selectionDetailsService.updateSelectionDetailsByVendorCandidatePhoneNumber(
                phoneNumber,
                updatedDetails);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/employee-candidates")
    public Page<EmployeeCandidateDTO> getEmployeeCandidates(
            @RequestParam Integer createdBy,
            @RequestParam int page,
            @RequestParam int size) {
        return selectionDetailsService.getEmployeeCandidates(createdBy, page, size);
    }

    @GetMapping("/selections")
    public ResponseEntity<List<SelectionDTO>> findSelections(@RequestParam String filter) {
        List<SelectionDTO> selections = selectionDetailsService.findSelections(filter);
        return ResponseEntity.ok(selections);
    }

    @GetMapping("/awaited-cases")
    public ResponseEntity<List<AwaitedCasesDTO>> findAwaitedCases(@RequestParam String filter) {
        List<AwaitedCasesDTO> awaitedCases = selectionDetailsService.findAwaitedCases(filter);
        return ResponseEntity.ok(awaitedCases);
    }

    @GetMapping("/ctool")
    public ResponseEntity<List<CtoolDto>> findCtool(@RequestParam String filter) {
        List<CtoolDto> ctool = selectionDetailsService.findCtool(filter);
        return ResponseEntity.ok(ctool);
    }

    @GetMapping("/excel")
    public ResponseEntity<List<ExcelDataDTO>> findExcelData(@RequestParam Integer createdBy) {
        System.out.println("Controller result"+createdBy);
        List<ExcelDataDTO> data = selectionDetailsService.findExcelData(createdBy);
        System.out.println("Data"+data);
        return ResponseEntity.ok(data);
    }

}
