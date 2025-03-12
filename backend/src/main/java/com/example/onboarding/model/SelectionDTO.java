package com.example.onboarding.model;

import java.util.Date;

public class SelectionDTO {

    private Long selectionCount;
    private String lobName;
    private String pricingModel;
    private Date hsbcselectionDate;

    public SelectionDTO() {
    }

    public SelectionDTO(Long selectionCount, String lobName, String pricingModel, Date hsbcselectionDate) {
        this.selectionCount = selectionCount;
        this.lobName = lobName;
        this.pricingModel = pricingModel;
        this.hsbcselectionDate = hsbcselectionDate;
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

    public Date getHsbcselectionDate() {
        return hsbcselectionDate;
    }

    public void setHsbcselectionDate(Date hsbcselectionDate) {
        this.hsbcselectionDate = hsbcselectionDate;
    }

}