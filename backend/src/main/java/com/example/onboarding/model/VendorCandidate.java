package com.example.onboarding.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class VendorCandidate {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int vendorCandidateId;

    private Long phoneNumber;
    
    @ManyToOne
    @JoinColumn(name = "vendorId")
    private Vendor vendor;

    private String firstName;
    private String middleName;
    private String lastName;

    @JsonProperty("ltionboardingDate")
    private Date LTIOnboardingDate;

    @ManyToOne
    @JoinColumn(name = "createdByPsId")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedByPsId")
    private Employee updatedBy;

    private Date createDate;
    private Date updateDate;

    
    // Getters, Setters, Constructors (default and parameterized), equals, hashCode, and toString
    
    
    public VendorCandidate(){

    }
    
    public VendorCandidate(Long phoneNumber, Vendor vendor, String firstName, String middleName, String lastName,
            Date lTIOnboardingDate, Employee createdBy, Employee updatedBy, Date createDate, Date updateDate) {
        this.phoneNumber = phoneNumber;
        this.vendor = vendor;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        LTIOnboardingDate = lTIOnboardingDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    // public VendorCandidate(Long phoneNumber2) {
    //     this.phoneNumber = phoneNumber2;
    // }
    

    public Vendor getVendor() {
        return vendor;
    }
    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getMiddleName() {
        return middleName;
    }
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public Date getLTIOnboardingDate() {
        return LTIOnboardingDate;
    }
    public void setLTIOnboardingDate(Date lTIOnboardingDate) {
        LTIOnboardingDate = lTIOnboardingDate;
    }
    public Employee getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(Employee createdBy) {
        this.createdBy = createdBy;
    }
    public Employee getUpdatedBy() {
        return updatedBy;
    }
    public void setUpdatedBy(Employee updatedBy) {
        this.updatedBy = updatedBy;
    }
    public Date getCreateDate() {
        return createDate;
    }
    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
    public Date getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
    @Override
    public String toString() {
        return "VendorCandidate [vendor=" + vendor + ", firstName=" + firstName + ", middleName=" + middleName
                + ", lastName=" + lastName + ", LTIOnboardingDate=" + LTIOnboardingDate + ", createdBy=" + createdBy
                + ", updatedBy=" + updatedBy + ", createDate=" + createDate + ", updateDate=" + updateDate + "]";
    }
    public Long getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getVendorCandidateId() {
        return vendorCandidateId;
    }

    public void setVendorCandidateId(int vendorCandidateId) {
        this.vendorCandidateId = vendorCandidateId;
    }
    
    
}

    