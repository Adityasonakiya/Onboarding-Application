package com.example.onboarding.model;

public class CtoolDto {
    Long ctool_count;
    String lobName;
    String onboarding_status;
    String bgv_status;

    public CtoolDto() {
    }

    public CtoolDto(Long ctool_count, String lobName, String onboarding_status, String bgv_status) {
        this.ctool_count = ctool_count;
        this.lobName = lobName;
        this.onboarding_status = onboarding_status;
        this.bgv_status = bgv_status;
    }

    public Long getCtool_count() {
        return ctool_count;
    }

    public void setCtool_count(Long ctool_count) {
        this.ctool_count = ctool_count;
    }

    public String getOnboarding_status() {
        return onboarding_status;
    }

    public void setOnboarding_status(String onboarding_status) {
        this.onboarding_status = onboarding_status;
    }

    public String getBgv_status() {
        return bgv_status;
    }

    public void setBgv_status(String bgv_status) {
        this.bgv_status = bgv_status;
    }

    public String getLobName() {
        return lobName;
    }

    public void setLobName(String lobName) {
        this.lobName = lobName;
    }

}
