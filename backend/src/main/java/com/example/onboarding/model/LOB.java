package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class LOB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lobId;
    private String lobName;
    private String remarks;
    @ManyToOne
    @JoinColumn(name = "createdBy")
    private Candidate createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedBy")
    private Candidate updatedBy;
    private byte[] createdDate;
    private byte[] updateDate;
    public int getLobId() {
        return lobId;
    }
    public void setLobId(int lobId) {
        this.lobId = lobId;
    }
    public String getLobName() {
        return lobName;
    }
    public void setLobName(String lobName) {
        this.lobName = lobName;
    }
    public String getRemarks() {
        return remarks;
    }
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    
    public byte[] getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(byte[] createdDate) {
        this.createdDate = createdDate;
    }
    public byte[] getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(byte[] updateDate) {
        this.updateDate = updateDate;
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
