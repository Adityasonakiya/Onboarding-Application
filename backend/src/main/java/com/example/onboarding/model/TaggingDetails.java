package com.example.onboarding.model;

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
    @JoinColumn(name = "candidateId")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "onboardingStatusId")
    private OnboardingStatus onboardingStatus;

    @ManyToOne
    @JoinColumn(name = "BGVStatusId")
    private BGVStatus bgvStatus;

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User updatedBy;

    private String statusRemarks;
    private byte[] createDate;
    private byte[] updateDate;

    public int getTagId() {
        return tagId;
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
    public byte[] getCreateDate() {
        return createDate;
    }
    public void setCreateDate(byte[] createDate) {
        this.createDate = createDate;
    }
    public byte[] getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(byte[] updateDate) {
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
    
}
