package com.example.onboarding.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SelectionDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int selectionId;

    @ManyToOne
    @JoinColumn(name = "psId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name="candidateId")
    private Candidate candidate;

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
    private String InterviewEvidences;
    private String offerReleaseStatus;
    private Date HSBCOnboardingDate;
    private Date techSelectionDate;
    private Date DOJReceivedDate;
    private Date LTIOnboardingDate;
    private byte[] createDate;
    private byte[] updateDate;


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
        return InterviewEvidences;
    }
    public void setInterviewEvidences(String InterviewEvidences) {
        this.InterviewEvidences = InterviewEvidences;
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
    public byte[] getCreateDate() {
        return createDate;
    }
    public void setCreateDate(byte[] createDate) {
        this.createDate = createDate;
    }
    public byte[] getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(byte[] updateDate) {
        this.updateDate = updateDate;
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
    
}
