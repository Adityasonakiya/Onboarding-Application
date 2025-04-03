package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Vendor;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.repository.VendorCandidateRepository;
import com.example.onboarding.repository.VendorRepository;

@Service
public class VendorCandidateSerivce {
    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorCandidateRepository vendorCandidateRepository;

    public VendorCandidate getVendorCandidateById(Integer vendorCandidateId) {
        Optional<VendorCandidate> vendorCandidate = vendorCandidateRepository.findById(vendorCandidateId);
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
        return vendorCandidateRepository.save(vendorCandidate);
    }

}
