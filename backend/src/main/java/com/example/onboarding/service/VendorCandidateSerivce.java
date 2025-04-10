package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Vendor;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.model.VendorCandidateKey;
import com.example.onboarding.repository.VendorCandidateRepository;
import com.example.onboarding.repository.VendorRepository;

@Service
public class VendorCandidateSerivce {
    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorCandidateRepository vendorCandidateRepository;

    public VendorCandidate getVendorCandidateById(int vendorId) {
    // Create the composite key (VendorCandidateId)
        VendorCandidateKey vendorCandidateId = new VendorCandidateKey();
        vendorCandidateId.setVendorId(vendorId);

    // Query the repository using the composite key
        Optional<VendorCandidate> vendorCandidate = vendorCandidateRepository.findById(vendorCandidateId);

    // Return the VendorCandidate if found, otherwise return null
        return vendorCandidate.orElse(null);
    }

    

    public List<VendorCandidate> getAllVendorCandidates() {
        return vendorCandidateRepository.findAll();
    }

    public Vendor getVendorById(Integer vendorId) {
        Optional<Vendor> vendor = vendorRepository.findById(vendorId);
        return vendor.orElse(null);
    }

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public VendorCandidate createVendorCandidate(VendorCandidate vendorCandidate) {
        System.out.println("VendorServicePoint "+ vendorCandidate);
        return vendorCandidateRepository.save(vendorCandidate);
    }

}
