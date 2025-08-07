package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.EvidenceDTO;
import com.example.onboarding.service.EvidenceService;


import io.swagger.v3.oas.annotations.parameters.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/evidence")
public class EvidenceController {
    @Autowired
    private EvidenceService evidenceService;

    @GetMapping("/id/{id}")
    public ResponseEntity<EvidenceDTO> getEvidenceById(@PathVariable int id) {
        EvidenceDTO evidence = evidenceService.getEvidenceById(id);
        if (evidence != null) {
            return ResponseEntity.ok(evidence);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/selectionId/{selectionId}")
    public ResponseEntity<List<EvidenceDTO>> getEvidenceBySelectionId(@PathVariable int selectionId) {
        List<EvidenceDTO> evidenceList = evidenceService.getEvidenceBySelectionId(selectionId);
        if (evidenceList != null && !evidenceList.isEmpty()) {
            return ResponseEntity.ok(evidenceList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<EvidenceDTO> createEvidence(@RequestBody EvidenceDTO evidence) {
        EvidenceDTO createdEvidence = evidenceService.createEvidence(evidence);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvidence);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteEvidence(
            @RequestParam String fileName,
            @RequestParam int selectionId) {
        boolean deleted = evidenceService.deleteEvidence(fileName, selectionId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
