package com.example.onboarding.model;

import lombok.ToString;

@ToString
public class EmployeeCandidateDTO {

    private int id;
    private String firstName;
    private String lastName;
    private String lobName;
    private String hsbchiringManager;
    private String onboardingStatus;
    private String bgvStatus;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getLobName() {
        return lobName;
    }
    public void setLobName(String lobName) {
        this.lobName = lobName;
    }
    public String getHsbchiringManager() {
        return hsbchiringManager;
    }
    public void setHsbchiringManager(String hsbchiringManager) {
        this.hsbchiringManager = hsbchiringManager;
    }
    public String getOnboardingStatus() {
        return onboardingStatus;
    }
    public void setOnboardingStatus(String onboardingStatus) {
        this.onboardingStatus = onboardingStatus;
    }
    public String getBgvStatus() {
        return bgvStatus;
    }
    public void setBgvStatus(String bgvStatus) {
        this.bgvStatus = bgvStatus;
    }
    public EmployeeCandidateDTO(int id, String firstName, String lastName, String lobName, String hsbchiringManager,
            String onboardingStatus, String bgvStatus) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.lobName = lobName;
        this.hsbchiringManager = hsbchiringManager;
        this.onboardingStatus = onboardingStatus;
        this.bgvStatus = bgvStatus;
    }
    public EmployeeCandidateDTO() {
    }

}
