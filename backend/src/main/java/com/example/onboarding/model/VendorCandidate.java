package com.example.onboarding.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class VendorCandidate {
    
     @EmbeddedId
    private VendorCandidateKey id;

    
    @MapsId("vendorId") // Links to Vendor's primary key
    @OneToOne
    @JoinColumn(name = "vendorId")
    private Vendor vendor;

    private String firstName;
    private String middleName;
    private String lastName;
    private String mailID;

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
    public VendorCandidateKey getId() {
        return id;
    }
     public void setId(VendorCandidateKey id) {
         this.id = id;
     }
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
    public String getMailID() {
        return mailID;
    }
    public void setMailID(String mailID) {
        this.mailID = mailID;
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

    
    
}

    