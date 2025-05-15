package com.example.onboarding.model;

import java.time.LocalDateTime;

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
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedBy")
    private Employee updatedBy;
    private LocalDateTime createdDate;
    private LocalDateTime updateDate;
    private String deliveryManager;
    private String salesPOC;
    private String HSBCHead;
    private Boolean active;

    public LOB() {
    }

    public LOB(int lobId, String lobName, String remarks, Employee createdBy, Employee updatedBy,
            LocalDateTime createdDate, LocalDateTime updateDate, String deliveryManager, String salesPOC,
            String hSBCHead, Boolean active) {
        this.lobId = lobId;
        this.lobName = lobName;
        this.remarks = remarks;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDate = createdDate;
        this.updateDate = updateDate;
        this.deliveryManager = deliveryManager;
        this.salesPOC = salesPOC;
        HSBCHead = hSBCHead;
        this.active = active;
    }

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

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getDeliveryManager() {
        return deliveryManager;
    }

    public void setDeliveryManager(String deliveryManager) {
        this.deliveryManager = deliveryManager;
    }

    public String getSalesPOC() {
        return salesPOC;
    }

    public void setSalesPOC(String salesPOC) {
        this.salesPOC = salesPOC;
    }

    public String getHSBCHead() {
        return HSBCHead;
    }

    public void setHSBCHead(String hSBCHead) {
        HSBCHead = hSBCHead;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

}
