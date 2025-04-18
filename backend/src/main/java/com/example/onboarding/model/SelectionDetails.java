package com.example.onboarding.model;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.ToString;

@Entity
@ToString
public class SelectionDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int selectionId;

    @ManyToOne
    @JoinColumn(name = "psId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "vendor_candidate_id")
    private VendorCandidate vendorCandidate;

    private String deliveryManager;


    @ManyToOne
    @JoinColumn(name = "lobId")
    private LOB lob;

    @ManyToOne
    @JoinColumn(name = "subLobId")
    private SubLOB subLob;

    private String irm;

    @ManyToOne
    @JoinColumn(name = "createdBy")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedBy")
    private Employee updatedBy;

    private Date HSBCSelectionDate;
    private String HSBCHiringManager;
    private String HSBCHead;
    private String salesPOC;
    private String PricingModel;
    private int HSBCToolId;
    private Date CToolReceivedDate;
    private String CToolJobCategory;
    private String CToolLocation;
    private int CToolRate;
    private int CToolProposedRate;
    private String recruiterName;
    private String interviewEvidences;
    private String offerReleaseStatus;
    private Date HSBCOnboardingDate;
    private Date techSelectionDate;
    private Date DOJReceivedDate;
    private Date LTIOnboardingDate;
    private Date createDate;
    private Date updateDate;
    private Date candidateStatusDate;

    // Getters and Setters

    public Date getCandidateStatusDate() {
        return candidateStatusDate;
    }

    public void setCandidateStatusDate(Date candidateStatusDate) {
        this.candidateStatusDate = candidateStatusDate;
    }

    public int getSelectionId() {
        return selectionId;
    }

    public void setSelectionId(int selectionId) {
        this.selectionId = selectionId;
    }

    public Date getHSBCSelectionDate() {
        return HSBCSelectionDate;
    }

    public void setHSBCSelectionDate(Date HSBCSelectionDate) {
        this.HSBCSelectionDate = HSBCSelectionDate;
    }

    public String getHSBCHiringManager() {
        return HSBCHiringManager;
    }

    public void setHSBCHiringManager(String HSBCHiringManager) {
        this.HSBCHiringManager = HSBCHiringManager;
    }

    public String getHSBCHead() {
        return HSBCHead;
    }

    public void setHSBCHead(String HSBCHead) {
        this.HSBCHead = HSBCHead;
    }
    
    public String getSalesPOC() {
        return salesPOC;
    }

    public void setSalesPOC(String salesPOC) {
        this.salesPOC = salesPOC;
    }

    public String getPricingModel() {
        return PricingModel;
    }

    public void setPricingModel(String PricingModel) {
        this.PricingModel = PricingModel;
    }

    public int getHSBCToolId() {
        return HSBCToolId;
    }

    public void setHSBCToolId(int HSBCToolId) {
        this.HSBCToolId = HSBCToolId;
    }

    public Date getCToolReceivedDate() {
        return CToolReceivedDate;
    }

    public void setCToolReceivedDate(Date CToolReceivedDate) {
        this.CToolReceivedDate = CToolReceivedDate;
    }

    public String getCToolJobCategory() {
        return CToolJobCategory;
    }

    public void setCToolJobCategory(String CToolJobCategory) {
        this.CToolJobCategory = CToolJobCategory;
    }

    public String getCToolLocation() {
        return CToolLocation;
    }

    public void setCToolLocation(String cToolLocation) {
        CToolLocation = cToolLocation;
    }

    public int getCToolRate() {
        return CToolRate;
    }

    public void setCToolRate(int cToolRate) {
        CToolRate = cToolRate;
    }

    public int getCToolProposedRate() {
        return CToolProposedRate;
    }

    public void setCToolProposedRate(int CToolProposedRate) {
        this.CToolProposedRate = CToolProposedRate;
    }

    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    public String getInterviewEvidences() {
        return interviewEvidences;
    }

    public void setInterviewEvidences(String interviewEvidences) {
        this.interviewEvidences = interviewEvidences;
    }

    public String getOfferReleaseStatus() {
        return offerReleaseStatus;
    }

    public void setOfferReleaseStatus(String offerReleaseStatus) {
        this.offerReleaseStatus = offerReleaseStatus;
    }

    public Date getHSBCOnboardingDate() {
        return HSBCOnboardingDate;
    }

    public void setHSBCOnboardingDate(Date HSBCOnboardingDate) {
        this.HSBCOnboardingDate = HSBCOnboardingDate;
    }

    public Date getTechSelectionDate() {
        return techSelectionDate;
    }

    public void setTechSelectionDate(Date techSelectionDate) {
        this.techSelectionDate = techSelectionDate;
    }

    public Date getDOJReceivedDate() {
        return DOJReceivedDate;
    }

    public void setDOJReceivedDate(Date DOJReceivedDate) {
        this.DOJReceivedDate = DOJReceivedDate;
    }

    public Date getLTIOnboardingDate() {
        return LTIOnboardingDate;
    }

    public void setLTIOnboardingDate(Date LTIOnboardingDate) {
        this.LTIOnboardingDate = LTIOnboardingDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public LOB getLob() {
        return lob;
    }

    public void setLob(LOB lob) {
        this.lob = lob;
    }

    public SubLOB getSubLob() {
        return subLob;
    }

    public void setSubLob(SubLOB subLob) {
        this.subLob = subLob;
    }

    public String getIrm() {
        return irm;
    }

    public void setIrm(String irm) {
        this.irm = irm;
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

    public void setDeliveryManager(String deliveryManager) {
        this.deliveryManager = deliveryManager;
    }

    public String getDeliveryManager() {
        return deliveryManager;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public String toString() {
        return "SelectionDetails [selectionId=" + selectionId + ", employee=" + employee + ", candidate=" + candidate+ ", vendor candidate=" + vendorCandidate
                + ", deliveryManager=" + deliveryManager + ", lob=" + lob + ", subLob=" + subLob + ", irm=" + irm
                + ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", HSBCSelectionDate=" + HSBCSelectionDate
                + ", HSBCHiringManager=" + HSBCHiringManager + ", HSBCHead=" + HSBCHead + ", salesPOC=" + salesPOC
                + ", PricingModel=" + PricingModel + ", HSBCToolId=" + HSBCToolId + ", CToolReceivedDate="
                + CToolReceivedDate + ", CToolJobCategory=" + CToolJobCategory + ", CToolLocation=" + CToolLocation
                + ", CToolRate=" + CToolRate + ", CToolProposedRate=" + CToolProposedRate + ", recruiterName="
                + recruiterName + ", InterviewEvidences=" + interviewEvidences + ", offerReleaseStatus="
                + offerReleaseStatus + ", HSBCOnboardingDate=" + HSBCOnboardingDate + ", techSelectionDate="
                + techSelectionDate + ", DOJReceivedDate=" + DOJReceivedDate + ", LTIOnboardingDate="
                + LTIOnboardingDate + ", createDate=" + createDate + ", updateDate=" + updateDate
                + ", getSelectionId()=" + getSelectionId() + ", getHSBCSelectionDate()=" + getHSBCSelectionDate()
                + ", getHSBCHiringManager()=" + getHSBCHiringManager() + ", getHSBCHead()=" + getHSBCHead()
                + ", getClass()=" + getClass() + ", getSalesPOC()=" + getSalesPOC() + ", getPricingModel()="
                + getPricingModel() + getHSBCToolId() + ", getCToolReceivedDate()="
                + getCToolReceivedDate() + ", getCToolJobCategory()=" + getCToolJobCategory() + ", getCToolLocation()="
                + getCToolLocation() + ", getCToolRate()=" + getCToolRate() + ", getCToolProposedRate()="
                + getCToolProposedRate() + ", getRecruiterName()=" + getRecruiterName() + ", getInterviewEvidences()="
                + getInterviewEvidences() + ", hashCode()=" + hashCode() + ", getOfferReleaseStatus()="
                + getOfferReleaseStatus() + ", getHSBCOnboardingDate()=" + getHSBCOnboardingDate()
                + ", getTechSelectionDate()=" + getTechSelectionDate() + ", getDOJReceivedDate()="
                + getDOJReceivedDate() + ", getLTIOnboardingDate()=" + getLTIOnboardingDate() + ", getEmployee()="
                + getEmployee() + ", getCandidate()=" + getCandidate() + ", getLob()=" + getLob() + ", getSubLob()="
                + getSubLob() + ", getIrm()=" + getIrm() + ", getCreatedBy()=" + getCreatedBy() + ", getUpdatedBy()="
                + getUpdatedBy() + ", getDeliveryManager()=" + getDeliveryManager() + ", getCreateDate()="
                + getCreateDate() + ", getUpdateDate()=" + getUpdateDate() + ", toString()=" + super.toString() + "]";
    }

    public VendorCandidate getVendorCandidate() {
        return vendorCandidate;
    }

    public void setVendorCandidate(VendorCandidate vendorCandidate) {
        this.vendorCandidate = vendorCandidate;
    }

    public SelectionDetails() {
    }

    public SelectionDetails(int selectionId, Employee employee, Candidate candidate, VendorCandidate vendorCandidate,
            String deliveryManager, LOB lob, SubLOB subLob, String irm, Employee createdBy, Employee updatedBy,
            Date hSBCSelectionDate, String hSBCHiringManager, String hSBCHead, String salesPOC, String pricingModel,
            int hSBCToolId, Date cToolReceivedDate, String cToolJobCategory, String cToolLocation, int cToolRate,
            int cToolProposedRate, String recruiterName, String interviewEvidences, String offerReleaseStatus,
            Date hSBCOnboardingDate, Date techSelectionDate, Date dOJReceivedDate, Date lTIOnboardingDate,
            Date createDate, Date updateDate, Date candidateStatusDate) {
        this.selectionId = selectionId;
        this.employee = employee;
        this.candidate = candidate;
        this.vendorCandidate = vendorCandidate;
        this.deliveryManager = deliveryManager;
        this.lob = lob;
        this.subLob = subLob;
        this.irm = irm;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        HSBCSelectionDate = hSBCSelectionDate;
        HSBCHiringManager = hSBCHiringManager;
        HSBCHead = hSBCHead;
        this.salesPOC = salesPOC;
        PricingModel = pricingModel;
        HSBCToolId = hSBCToolId;
        CToolReceivedDate = cToolReceivedDate;
        CToolJobCategory = cToolJobCategory;
        CToolLocation = cToolLocation;
        CToolRate = cToolRate;
        CToolProposedRate = cToolProposedRate;
        this.recruiterName = recruiterName;
        this.interviewEvidences = interviewEvidences;
        this.offerReleaseStatus = offerReleaseStatus;
        HSBCOnboardingDate = hSBCOnboardingDate;
        this.techSelectionDate = techSelectionDate;
        DOJReceivedDate = dOJReceivedDate;
        LTIOnboardingDate = lTIOnboardingDate;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.candidateStatusDate = candidateStatusDate;
    }
    
}