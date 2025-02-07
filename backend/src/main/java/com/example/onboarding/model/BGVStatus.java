package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BGVStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bgvStatusId;
    private String bgvStatus;
    private String remarks;
    
    public int getBgvStatusId() {
        return bgvStatusId;
    }
    public void setBgvStatusId(int bgvStatusId) {
        this.bgvStatusId = bgvStatusId;
    }
    public String getBgvStatus() {
        return bgvStatus;
    }
    public void setBgvStatus(String bgvStatus) {
        this.bgvStatus = bgvStatus;
    }
    public String getRemarks() {
        return remarks;
    }
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
 
}
