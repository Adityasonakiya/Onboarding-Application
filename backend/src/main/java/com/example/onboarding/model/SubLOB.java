package com.example.onboarding.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SubLOB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subLOBid;

    @ManyToOne
    @JoinColumn(name = "lobId")
    private LOB lob;

    private String subLobName;

    @ManyToOne
    @JoinColumn(name = "createdByPsId")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updateByPsId")
    private Employee updatedBy;

    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public int getSubLOBid() {
        return this.subLOBid;
    }
    public void setSubLOBid(int subLOBid) {
        this.subLOBid = subLOBid;
    }
    public String getSubLobName() {
        return subLobName;
    }
    public void setSubLobName(String subLobName) {
        this.subLobName = subLobName;
    }
    
    public LOB getLob() {
        return lob;
    }
    public void setLob(LOB lob) {
        this.lob = lob;
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

    @Override
    public String toString() {
        return "TaggingDetails{" +
                "subLOBId=" + subLOBid +
                ", lob=" + lob +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                ", subLOBName=" + subLobName +
                ", createdBy=" + createdBy +
                ", updatedBy=" + updatedBy +
                '}';
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
