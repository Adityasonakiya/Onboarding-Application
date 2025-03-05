package com.example.onboarding.model;

public class SelectionDTO {

    private Long selectionCount;
    private String lobName;
    private String pricingModel;
    
    // Default constructor
    public SelectionDTO() {
    }

    // Constructor with parameters
    public SelectionDTO(Long selectionCount, String lobName, String pricingModel) {
        this.selectionCount = selectionCount;
        this.lobName = lobName;
        this.pricingModel = pricingModel;
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
    
}
