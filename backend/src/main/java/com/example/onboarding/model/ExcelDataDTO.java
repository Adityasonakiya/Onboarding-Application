package com.example.onboarding.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExcelDataDTO {

    // Basic Information
    private String onboardingStatus;
    private String ltiPsId;
    private String firstName;
    private String lastName;
    private String grade;
    private String location;
    private String totalExperience;
    private String skill;

    // Selection Dates and Details
    private Date hsbcSelectionDate;
    private Date ltiJoiningDate;
    private Date createdDate;
    private String selectionMonthYear;
    private Long selectionAging;

    // Category and Business Unit
    private String category;
    private String baseBu;

    // LOB and Sub-LOB
    private String lobName;
    private String subLobName;

    // Stakeholders
    private String salesPoc;
    private String hsbcHiringManager;
    private String hsbcHead;
    private String deliveryManager;

    // Financial Details
    private String irm;
    private String pricingModel;
    private Integer hsbcCtoolId;
    private Date ctoolReceivedDate;

    // Ctool Status and Aging
    private String ctoolReceivedStatus;
    private Long ctoolAging;
    private Long ctoolAgingWeekBucket;
    private Date ctoolStartDate;

    // Recruiter and Compensation
    private String recruiterName;
    private Integer ctoolTaggingRate;

    // Role Information
    private String hsbcRole;
    private Integer roleGrade;

    // Background Verification (BGV)
    private String finalBGVStatus;

    // Status Details
    private String techSelectionStatus;
    private String remarks;

    // Interview and DOJs
    private String interviewDocuments;
    private Date hsbcConfirmedDoj;
    private Long agingSelectionWithDoj;
    private Long hsbcDojAgingBucket;

    // Onboarding Information
    private Date hsbcOnboardingDate;
    private Date taggingDone;
    private Date techSelectionDone;

    public ExcelDataDTO() {
    }

    public ExcelDataDTO(String onboardingStatus, String ltiPsId, String firstName, String lastName, String grade,
            String location, String totalExperience, String skill, Date hsbcSelectionDate, Date ltiJoiningDate, Date createdDate,
            String selectionMonthYear, Long selectionAging, String category, String baseBu, String lobName, String subLobName, String salesPoc, String hsbcHiringManager,
            String hsbcHead, String deliveryManager, String irm, String pricingModel, Integer hsbcCtoolId, Date ctoolReceivedDate, String ctoolReceivedStatus,
            Long ctoolAging, Long ctoolAgingWeekBucket, Date ctoolStartDate, String recruiterName, Integer ctoolTaggingRate, String hsbcRole, Integer roleGrade,
            String finalBGVStatus, String techSelectionStatus, String remarks, String interviewDocuments, Date hsbcConfirmedDoj, Long agingSelectionWithDoj,
            Long hsbcDojAgingBucket, Date hsbcOnboardingDate, Date taggingDone, Date techSelectionDone) {

        this.onboardingStatus = onboardingStatus;
        this.ltiPsId = ltiPsId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.location = location;
        this.totalExperience = totalExperience;
        this.skill = skill;
        this.hsbcSelectionDate = hsbcSelectionDate;
        this.ltiJoiningDate = ltiJoiningDate;
        this.createdDate = createdDate;
        this.selectionMonthYear = selectionMonthYear;
        this.selectionAging = selectionAging;
        this.category = category;
        this.baseBu = baseBu;
        this.lobName = lobName;
        this.subLobName = subLobName;
        this.salesPoc = salesPoc;
        this.hsbcHiringManager = hsbcHiringManager;
        this.hsbcHead = hsbcHead;
        this.deliveryManager = deliveryManager;
        this.irm = irm;
        this.pricingModel = pricingModel;
        this.hsbcCtoolId = hsbcCtoolId;
        this.ctoolReceivedDate = ctoolReceivedDate;
        this.ctoolReceivedStatus = ctoolReceivedStatus;
        this.ctoolAging = ctoolAging;
        this.ctoolAgingWeekBucket = ctoolAgingWeekBucket;
        this.ctoolStartDate = ctoolStartDate;
        this.recruiterName = recruiterName;
        this.ctoolTaggingRate = ctoolTaggingRate;
        this.hsbcRole = hsbcRole;
        this.roleGrade = roleGrade;
        this.finalBGVStatus = finalBGVStatus;
        this.techSelectionStatus = techSelectionStatus;
        this.remarks = remarks;
        this.interviewDocuments = interviewDocuments;
        this.hsbcConfirmedDoj = hsbcConfirmedDoj;
        this.agingSelectionWithDoj = agingSelectionWithDoj;
        this.hsbcDojAgingBucket = hsbcDojAgingBucket;
        this.hsbcOnboardingDate = hsbcOnboardingDate;
        this.taggingDone = taggingDone;
        this.techSelectionDone = techSelectionDone;
    }

    @Override
    public String toString() {
        return "ExcelDataDTO [onboardingStatus=" + onboardingStatus + ", ltiPsId=" + ltiPsId + ", firstName="
                + firstName + ", lastName=" + lastName + ", grade=" + grade + ", location=" + location
                + ", totalExperience=" + totalExperience + ", skill=" + skill + ", hsbcSelectionDate="
                + hsbcSelectionDate + ", ltiJoiningDate=" + ltiJoiningDate + ", createdDate=" + createdDate
                + ", selectionMonthYear=" + selectionMonthYear + ", selectionAging=" + selectionAging + ", category="
                + category + ", baseBu=" + baseBu + ", lobName=" + lobName + ", subLobName=" + subLobName
                + ", salesPoc=" + salesPoc + ", hsbcHiringManager=" + hsbcHiringManager + ", hsbcHead=" + hsbcHead
                + ", deliveryManager=" + deliveryManager + ", irm=" + irm + ", pricingModel=" + pricingModel
                + ", hsbcCtoolId=" + hsbcCtoolId + ", ctoolReceivedDate=" + ctoolReceivedDate + ", ctoolReceivedStatus="
                + ctoolReceivedStatus + ", ctoolAging=" + ctoolAging + ", ctoolAgingWeekBucket=" + ctoolAgingWeekBucket
                + ", ctoolStartDate=" + ctoolStartDate + ", recruiterName=" + recruiterName + ", ctoolRate=" + ctoolTaggingRate
                + ", hsbcRole=" + hsbcRole + ", roleGrade=" + roleGrade
                + ", finalBGVStatus=" + finalBGVStatus + ", techSelectionStatus=" + techSelectionStatus + ", remarks="
                + remarks + ", interviewDocuments=" + interviewDocuments + ", hsbcConfirmedDoj=" + hsbcConfirmedDoj
                + ", agingSelectionWithDoj=" + agingSelectionWithDoj + ", hsbcDojAgingBucket=" + hsbcDojAgingBucket
                + ", hsbcOnboardingDate=" + hsbcOnboardingDate + ", taggingDone=" + taggingDone + ", techSelectionDone="
                + techSelectionDone + "]";
    }

}
