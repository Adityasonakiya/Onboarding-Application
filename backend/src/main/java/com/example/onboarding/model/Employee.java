package com.example.onboarding.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employee")
public class Employee {
    @Id
    private int psId;
 
    private String firstName;
    private String middleName;
    private String lastName;
    private String grade;
    private String location;
    private String skill;
    private BigDecimal totalExperience;
    private int pu;
    private String mailID;
 
    @ManyToOne
    @JoinColumn(name = "createdBy")
    private Employee createdBy;
 
    @ManyToOne
    @JoinColumn(name = "updatedBy")
    private Employee updatedBy;

    public Employee() {
    }

    public Employee(int psId, String firstName, String middleName, String lastName, String grade, String location,
            String skill, BigDecimal totalExperience, int pu, String mailID, Employee createdBy, Employee updatedBy) {
        this.psId = psId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.grade = grade;
        this.location = location;
        this.skill = skill;
        this.totalExperience = totalExperience;
        this.pu = pu;
        this.mailID = mailID;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }

    public int getPsId() {
        return psId;
    }

    public void setPsId(int psId) {
        this.psId = psId;
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

    public BigDecimal getTotalExperience() {
        return totalExperience;
    }

    public void setTotalExperience(BigDecimal totalExperience) {
        this.totalExperience = totalExperience;
    }

    public int getPu() {
        return pu;
    }

    public void setPu(int pu) {
        this.pu = pu;
    }

    public String getMailID() {
        return mailID;
    }

    public void setMailID(String mailID) {
        this.mailID = mailID;
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

    
}