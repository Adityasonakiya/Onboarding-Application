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
    @JoinColumn(name = "psId", referencedColumnName = "psId")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "candidateId", referencedColumnName = "candidateId")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "lobId", referencedColumnName = "lob_id")
    private LOB lob;

    @ManyToOne
    @JoinColumn(name = "subLobId", referencedColumnName = "subLOBid")
    private SubLOB subLob;

    @ManyToOne
    @JoinColumn(name = "deliveryManager", referencedColumnName = "psId")
    private Candidate deliveryManager;

    @ManyToOne
    @JoinColumn(name = "IRM", referencedColumnName = "psId")
    private Employee irm;

    @ManyToOne
    @JoinColumn(name = "createdBy", referencedColumnName = "psId")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedBy", referencedColumnName = "psId")
    private Employee updatedBy;

    private int psId;
    private int candidateId;
    private Date HSBCSelecionDate;
    private int lobId;
    private int subLobId;
    private String HSBCHiringManager;
    private String HSBCHead;
    private String salesPOC;
    private String PricingModel;
    private int IRM;
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
    public int getPsId() {
        return psId;
    }
    public void setPsId(int psId) {
        this.psId = psId;
    }
    public int getCandidateId() {
        return candidateId;
    }
    public void setCandidateId(int candidateId) {
        this.candidateId = candidateId;
    }
    public Date getHSBCSelecionDate() {
        return HSBCSelecionDate;
    }
    public void setHSBCSelecionDate(Date hSBCSelecionDate) {
        HSBCSelecionDate = hSBCSelecionDate;
    }
    public int getLobId() {
        return lobId;
    }
    public void setLobId(int lobId) {
        this.lobId = lobId;
    }
    public int getSubLobId() {
        return subLobId;
    }
    public void setSubLobId(int subLobId) {
        this.subLobId = subLobId;
    }
    public String getHSBCHiringManager() {
        return HSBCHiringManager;
    }
    public void setHSBCHiringManager(String hSBCHiringManager) {
        HSBCHiringManager = hSBCHiringManager;
    }
    public String getHSBCHead() {
        return HSBCHead;
    }
    public void setHSBCHead(String hSBCHead) {
        HSBCHead = hSBCHead;
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
    public void setPricingModel(String pricingModel) {
        PricingModel = pricingModel;
    }
    public int getIRM() {
        return IRM;
    }
    public void setIRM(int iRM) {
        IRM = iRM;
    }
    public int getHSBCToolId() {
        return HSBCToolId;
    }
    public void setHSBCToolId(int hSBCToolId) {
        HSBCToolId = hSBCToolId;
    }
    public Date getCToolReceivedDate() {
        return CToolReceivedDate;
    }
    public void setCToolReceivedDate(Date cToolReceivedDate) {
        CToolReceivedDate = cToolReceivedDate;
    }
    public String getCToolJobCategory() {
        return CToolJobCategory;
    }
    public void setCToolJobCategory(String cToolJobCategory) {
        CToolJobCategory = cToolJobCategory;
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
    public void setCToolProposedRate(int cToolProposedRate) {
        CToolProposedRate = cToolProposedRate;
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
    public void setInterviewEvidences(String interviewEvidences) {
        InterviewEvidences = interviewEvidences;
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
    public void setHSBCOnboardingDate(Date hSBCOnboardingDate) {
        HSBCOnboardingDate = hSBCOnboardingDate;
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
    public void setDOJReceivedDate(Date dOJReceivedDate) {
        DOJReceivedDate = dOJReceivedDate;
    }
    public Date getLTIOnboardingDate() {
        return LTIOnboardingDate;
    }
    public void setLTIOnboardingDate(Date lTIOnboardingDate) {
        LTIOnboardingDate = lTIOnboardingDate;
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
    public Candidate getDeliveryManager() {
        return deliveryManager;
    }
    public void setDeliveryManager(Candidate deliveryManager) {
        this.deliveryManager = deliveryManager;
    }
    public Employee getIrm() {
        return irm;
    }
    public void setIrm(Employee irm) {
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

    
}
