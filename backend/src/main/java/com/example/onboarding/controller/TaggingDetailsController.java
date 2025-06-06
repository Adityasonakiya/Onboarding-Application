package com.example.onboarding.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.TaggingDetails;
import com.example.onboarding.service.TaggingDetailsService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/tagging-details")
public class TaggingDetailsController {

    private static final Logger logger = LoggerFactory.getLogger(TaggingDetailsService.class);

    @Autowired
    private TaggingDetailsService taggingDetailsService;

    @GetMapping("/psid/{psId}")
    public ResponseEntity<TaggingDetails> getTaggingDetailsByPsId(@PathVariable int psId) {
        TaggingDetails details = taggingDetailsService.getTaggingDetailsByPsId(psId);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/candidate/{phoneNumber}")
    public ResponseEntity<TaggingDetails> getTaggingDetailsByCandidateId(@PathVariable Long phoneNumber) {
        TaggingDetails details = taggingDetailsService.getTaggingDetailsByCandidatePhoneNumber(phoneNumber);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/vendor/{phoneNumber}")
    public ResponseEntity<TaggingDetails> getTaggingDetailsByVendorCandidateId(@PathVariable Long phoneNumber) {
        TaggingDetails details = taggingDetailsService.getTaggingDetailsByVendorPhoneNumber(phoneNumber);
        if (details != null) {
            return ResponseEntity.ok(details);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/psid/{psId}")
    public ResponseEntity<TaggingDetails> updateTaggingDetailsByPsId(@PathVariable int psId,
            @RequestBody TaggingDetails updates) {
        logger.info("Received request to update tagging details for PsId: {}", psId);
        System.out.println("Received request to update tagging details with BGV updates: "+ updates);
        System.out.println("Received request to update tagging details with BGV: "+ updates.getBgvStatus());
        TaggingDetails updated = taggingDetailsService.updateTaggingDetailsByPsId(psId, updates);
        logger.info("Updated tagging details returned: {}", updated);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/candidate/{phoneNumber}")
    public ResponseEntity<TaggingDetails> updateTaggingDetailsByCandidateId(@PathVariable Long phoneNumber,
            @RequestBody TaggingDetails updatedDetails) {
        try {
            TaggingDetails details = taggingDetailsService.updateTaggingDetailsByCandidatePhoneNumber(phoneNumber,
                    updatedDetails);
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/vendor-candidate/{phoneNumber}")
    public ResponseEntity<TaggingDetails> updateTaggingDetailsByVendorCandidateId(@PathVariable Long phoneNumber,
            @RequestBody TaggingDetails updatedDetails) {
        try {
            TaggingDetails details = taggingDetailsService.updateTaggingDetailsByVendorPhoneNumber(phoneNumber,
                    updatedDetails);
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}