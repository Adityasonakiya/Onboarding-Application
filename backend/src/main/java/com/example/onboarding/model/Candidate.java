package com.example.onboarding.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Candidate {
    @Id
    private Long phoneNumber;
    private int candidateId;
    private String firstName;
    private String middleName;
    private String lastName;
    private Date LTIOnboardingDate;
    @ManyToOne
    @JoinColumn(name = "createdByPsId")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedByPsId")
    private Employee updatedBy;
    
    private Date createDate;
    private Date updateDate;


    public Candidate() {
    }

    public Candidate(Long phoneNumber2){

    }
    

    public Candidate(Long phoneNumber, String firstName, String middleName, String lastName, Date lTIOnboardingDate,
            Employee createdBy, Employee updatedBy, Date createDate, Date updateDate) {
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        LTIOnboardingDate = lTIOnboardingDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createDate = createDate;
        this.updateDate = updateDate;
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

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public int getCandidateId() {
        return candidateId;
    }

    public void setCandidateId() {
        this.candidateId = 1;
    }

    

}
