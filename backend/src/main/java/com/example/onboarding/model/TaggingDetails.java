package com.example.onboarding.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TaggingDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tagId;

    @ManyToOne
    @JoinColumn(name = "psId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "vendor_candidate_id")
    private VendorCandidate vendorCandidate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "onboardingStatusId")
    private OnboardingStatus onboardingStatus;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bgvStatusId")
    private BGVStatus bgvStatus;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "CandidateStatusId")
    @JsonIgnoreProperties("taggingDetails")
    private CandidateStatus candidateStatus;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User updatedBy;

    private String statusRemarks;
    private Date createDate;
    private Date updateDate;

    @Override
    public String toString() {
        return "TaggingDetails{" +
                "tagId=" + tagId +
                ", bgvStatus=" + bgvStatus +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", onboardingStatus=" + onboardingStatus +
                ", employee=" + employee +
                ", candidate=" + candidate +
                ", createdBy=" + createdBy +
                ", updatedBy=" + updatedBy +
                ", statusRemarks=" + statusRemarks +
                '}';
    }

    public int getTagId() {
        return tagId;
    }

    public VendorCandidate getVendorCandidate() {
        return vendorCandidate;
    }

    public void setVendorCandidate(VendorCandidate vendorCandidate) {
        this.vendorCandidate = vendorCandidate;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    public String getStatusRemarks() {
        return statusRemarks;
    }

    public void setStatusRemarks(String statusRemarks) {
        this.statusRemarks = statusRemarks;
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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public OnboardingStatus getOnboardingStatus() {
        return onboardingStatus;
    }

    public void setOnboardingStatus(OnboardingStatus onboardingStatus) {
        this.onboardingStatus = onboardingStatus;
    }

    public BGVStatus getBgvStatus() {
        return bgvStatus;
    }

    public void setBgvStatus(BGVStatus bgvStatus) {
        this.bgvStatus = bgvStatus;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public User getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(User updatedBy) {
        this.updatedBy = updatedBy;
    }

    public CandidateStatus getCandidateStatus() {
        return candidateStatus;
    }

    public void setCandidateStatus(CandidateStatus candidateStatus) {
        this.candidateStatus = candidateStatus;
    }

}
