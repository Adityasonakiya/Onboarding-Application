package com.example.onboarding.model;

import java.time.LocalDateTime;

public class AwaitedCasesDTO {
    Long awaited_count;
    String delivery_manager,pricing_model,bgv_status,onboarding_status;
    LocalDateTime createdDate;

    public AwaitedCasesDTO() {
    }
    public AwaitedCasesDTO(Long awaited_count, String delivery_manager, String pricing_model, String bgv_status,
            String onboarding_status) {
        this.awaited_count = awaited_count;
        this.delivery_manager = delivery_manager;
        this.pricing_model = pricing_model;
        this.bgv_status = bgv_status;
        this.onboarding_status = onboarding_status;
        this.createdDate=LocalDateTime.now();
    }
    public Long getAwaited_count() {
        return awaited_count;
    }
    public void setAwaited_count(Long awaited_count) {
        this.awaited_count = awaited_count;
    }
    public String getDelivery_manager() {
        return delivery_manager;
    }
    public void setDelivery_manager(String delivery_manager) {
        this.delivery_manager = delivery_manager;
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
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }
    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
    
    
}

