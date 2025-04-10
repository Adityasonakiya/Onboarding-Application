package com.example.onboarding.model;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int candidateId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String mailID;
    private Date LTIOnboardingDate;
    @ManyToOne
    @JoinColumn(name = "createdByPsId")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedByPsId")
    private Employee updatedBy;
    
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public Candidate(int candidateId) {
        this.candidateId = candidateId;
    }

    public Candidate() {
    }

    public int getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(int candidateId) {
        this.candidateId = candidateId;
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

    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getMailID() {
        return mailID;
    }

    public void setMailID(String mailID) {
        this.mailID = mailID;
    }

}
