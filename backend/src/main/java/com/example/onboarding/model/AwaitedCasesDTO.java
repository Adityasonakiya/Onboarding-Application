package com.example.onboarding.model;

import java.util.Date;

public class AwaitedCasesDTO {
    Long awaited_count;
    String lobName, pricing_model, bgv_status, onboarding_status;
    Date updateDate;

    public AwaitedCasesDTO() {
    }

    public AwaitedCasesDTO(Long awaited_count, String lobName, String pricing_model, String bgv_status,
            String onboarding_status, Date updateDate) {
        this.awaited_count = awaited_count;
        this.lobName = lobName;
        this.pricing_model = pricing_model;
        this.bgv_status = bgv_status;
        this.onboarding_status = onboarding_status;
        this.updateDate = updateDate;
    }

    public Long getAwaited_count() {
        return awaited_count;
    }

    public void setAwaited_count(Long awaited_count) {
        this.awaited_count = awaited_count;
    }

    public String getLobName() {
        return lobName;
    }
    public void setLobName(String lobName) {
        this.lobName = lobName;
    }
    
    public String getPricing_model() {
        return pricing_model;
    }

    public void setPricing_model(String pricing_model) {
        this.pricing_model = pricing_model;
    }

    public String getBgv_status() {
        return bgv_status;
    }

    public void setBgv_status(String bgv_status) {
        this.bgv_status = bgv_status;
    }

    public String getOnboarding_status() {
        return onboarding_status;
    }

    public void setOnboarding_status(String onboarding_status) {
        this.onboarding_status = onboarding_status;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

}
