package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    private int psid;
    private String firstName;
    private String middleName;
    private String lastName;
    private String grade;
    private String location;
    private String skill;
    private double totalExperience;
    private String pu;
    private String mailID;

    @ManyToOne
    @JoinColumn(name = "createdBy")
    private Candidate createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedBy")
    private Candidate updatedBy;

    private byte[] createdDate;
    private byte[] updatedDate;

    public Employee(int psid) {
        this.psid = psid;
    }

    public Employee() {
    }

    public int getPsid() {
        return psid;
    }

    public void setPsid(int psId) {
        this.psid = psId;
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

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public double getTotalExperience() {
        return totalExperience;
    }

    public void setTotalExperience(double totalExperience) {
        this.totalExperience = totalExperience;
    }

    public String getPu() {
        return pu;
    }

    public void setPu(String pu) {
        this.pu = pu;
    }

    public String getMailID() {
        return mailID;
    }

    public void setMailID(String mailID) {
        this.mailID = mailID;
    }

    public byte[] getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(byte[] createdDate) {
        this.createdDate = createdDate;
    }

    public byte[] getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(byte[] updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Candidate getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Candidate createdBy) {
        this.createdBy = createdBy;
    }

    public Candidate getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Candidate updatedBy) {
        this.updatedBy = updatedBy;
    }

}