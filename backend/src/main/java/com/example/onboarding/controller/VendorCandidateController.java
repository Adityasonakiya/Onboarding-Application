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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.Vendor;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.service.VendorCandidateService;

@CrossOrigin("*")
@RestController
@RequestMapping("/vendors")
public class VendorCandidateController {

    @Autowired
    private VendorCandidateService vendorCandidateService;

    @GetMapping("/{vendorId}")
    public ResponseEntity<Vendor> getVendorById(@PathVariable Integer vendorId) {
        Vendor vendor = vendorCandidateService.getVendorById(vendorId);
        if (vendor != null) {
            return new ResponseEntity<>(vendor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors() {
        List<Vendor> vendors = vendorCandidateService.getAllVendors();
        if (vendors != null) {
            return new ResponseEntity<>(vendors, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create-vendor")
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        if (vendor == null) {
            return ResponseEntity.badRequest().build();
        }
        Vendor createdVendor = vendorCandidateService.createVendor(vendor);
        return new ResponseEntity<>(createdVendor, HttpStatus.CREATED);
    }

    @PutMapping("/status/{vendorId}")
    public ResponseEntity<Vendor> changeVendorStatus(@PathVariable int vendorId) {
        Vendor vendor = vendorCandidateService.changeStatus(vendorId);
        if (vendor!= null) {
            return ResponseEntity.ok(vendor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-vendor/{vendorId}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable int vendorId, @RequestBody Vendor vendor) {
        if (vendor == null || vendor.getVendorId() != vendorId) {
            return ResponseEntity.badRequest().build();
        }
        Vendor updatedVendor = vendorCandidateService.updateVendor(vendor,vendorId);
        if (updatedVendor != null) {
            return new ResponseEntity<>(updatedVendor, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/vendor-candidates/{phoneNumber}")
    public ResponseEntity<VendorCandidate> getVendorCandidateById(@PathVariable Long phoneNumber) {
        VendorCandidate vendorCandidate = vendorCandidateService.getVendorCandidateById(phoneNumber);
        if (vendorCandidate != null) {
            return new ResponseEntity<>(vendorCandidate, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/vendor-candidates/count/{vendorId}")
    public ResponseEntity<Integer> getVendorCandidateCountByVendorId(@PathVariable int vendorId) {
        Integer count = vendorCandidateService.getVendorCandidateCountByVendorId(vendorId);
        if (count != null) {
            return new ResponseEntity<>(count, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/vendor-candidates")
    public ResponseEntity<List<VendorCandidate>> getAllVendorCandidates() {
        List<VendorCandidate> vendorCandidates = vendorCandidateService.getAllVendorCandidates();
        if (vendorCandidates != null) {
            return new ResponseEntity<>(vendorCandidates, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/vendor-candidates/create")
    public ResponseEntity<VendorCandidate> createVendorCandidate(@RequestBody VendorCandidate vendorCandidate) {
        System.out.println("Object sent"+ vendorCandidate);
        if (vendorCandidate == null) {
            return ResponseEntity.badRequest().build();
        }
        VendorCandidate createdVendorCandidate = vendorCandidateService.createVendorCandidate(vendorCandidate);
        System.out.println("Object recieved"+ createdVendorCandidate);
        return new ResponseEntity<>(createdVendorCandidate, HttpStatus.CREATED);
    }

}
