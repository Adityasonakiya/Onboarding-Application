package com.example.onboarding.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class VendorCandidateKey implements Serializable {

    private int vendorId; // Matches the primary key in Vendor

    // Default constructor
    public VendorCandidateKey() {}

    // Constructor with parameters
    public VendorCandidateKey(int vendorId) {
        this.vendorId = vendorId;
    }

    // Getters and setters
    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    // equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VendorCandidateKey that = (VendorCandidateKey) o;
        return vendorId == that.vendorId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(vendorId);
    }
}

