package com.example.onboarding.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Vendor;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.VendorCandidateRepository;
import com.example.onboarding.repository.VendorRepository;

@Service
public class VendorCandidateService {
    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private VendorCandidateRepository vendorCandidateRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EmployeeRepository employeeRepository;

    public VendorCandidate getVendorCandidateById(Long phoneNumber) {
        Optional<VendorCandidate> vendorCandidate = vendorCandidateRepository.findByPhoneNumber(phoneNumber);
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
        vendorCandidate.setCreateDate(new Date());
        vendorCandidate.setUpdateDate(new Date());
        vendorCandidate.setCreatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
        vendorCandidate.setUpdatedBy(employeeRepository.findById(userService.loggedUser().getPsid()).get());
        return vendorCandidateRepository.save(vendorCandidate);
    }

}
