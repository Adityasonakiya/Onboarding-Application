package com.example.onboarding.model;

import java.time.LocalDateTime;

public class SelectionDTO {

    private Long selectionCount;
    private String lobName;
    private String pricingModel;
    LocalDateTime createdDate;
    
    // Default constructor
    public SelectionDTO() {
    }

    // Constructor with parameters
    public SelectionDTO(Long selectionCount, String lobName, String pricingModel) {
        this.selectionCount = selectionCount;
        this.lobName = lobName;
        this.pricingModel = pricingModel;
        this.createdDate=LocalDateTime.now();
    }

    public Long getSelectionCount() {
        return selectionCount;
    }
    public void setSelectionCount(Long selectionCount) {
        this.selectionCount = selectionCount;
    }
    public String getLobName() {
        return lobName;
    }
    public void setLobName(String lobName) {
        this.lobName = lobName;
    }
    public String getPricingModel() {
        return pricingModel;
    }
    public void setPricingModel(String pricingModel) {
        this.pricingModel = pricingModel;
    }
    
    @Override
    public String toString() {
        return "SelectionDTO [selectionCount="+selectionCount+" lobName=" + lobName + ", pricingModel=" + pricingModel + "]";
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
    
}
