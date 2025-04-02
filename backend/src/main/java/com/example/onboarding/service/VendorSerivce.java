package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Vendor;
import com.example.onboarding.repository.VendorRepository;

@Service
public class VendorSerivce {
    @Autowired
    private VendorRepository vendorRepository;

        public Vendor getVendorById(String vendorId) {
        Optional<Vendor> vendor = vendorRepository.findById(vendorId);
        return vendor.orElse(null);
    }

        public List<Vendor> getAllVendors(){
        return vendorRepository.findAll();
    }
}
