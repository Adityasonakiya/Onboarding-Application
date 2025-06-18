package com.example.onboarding.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
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

    private String baseBu;

    @ManyToOne
    @JoinColumn(name = "lobId")
    private LOB lob;

    @ManyToOne
    @JoinColumn(name = "subLobId")
    private SubLOB subLob;

    private String irm;

    @ManyToOne
    @JoinColumn(name = "hsbcRoleId")
    private HsbcRoles hsbcRoles;

    @ManyToOne
    @JoinColumn(name = "createdBy")
    private Employee createdBy;

    @ManyToOne
    @JoinColumn(name = "updatedBy")
    private Employee updatedBy;

    private Date HSBCSelectionDate;
    private String HSBCHiringManager;
    private String PricingModel;
    private Integer HSBCToolId;
    private Date CToolReceivedDate;
    private String CToolLocation;
    private Integer CToolGrade;
    private Integer CToolTaggingRate;
    private Integer CToolProposedRate;
    private String recruiterName;
    private String deliveryManager;
    private String HSBCHead;
    private String salesPOC;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EvidenceDTO> interviewEvidences = new ArrayList<>();

    private String offerReleaseStatus;
    private Date HSBCOnboardingDate;
    private Date techSelectionDate;
    private Date DOJReceivedDate;
    private Date LTIOnboardingDate;
    private Date createDate;
    private Date updateDate;
    private Date candidateStatusDate;
    private Date ctoolStartDate;
    private Date bgvInitiatedDate;
    private Date billingStartDate;
    private Integer hsbcId;

    public SelectionDetails() {
    }

    public SelectionDetails(int selectionId, Employee employee, Candidate candidate, VendorCandidate vendorCandidate,
            String baseBu, LOB lob, SubLOB subLob, String irm, HsbcRoles hsbcRoles, Employee createdBy,
            Employee updatedBy, Date hSBCSelectionDate, String hSBCHiringManager, String pricingModel,
            Integer hSBCToolId, Date cToolReceivedDate, String cToolLocation, Integer cToolGrade,
            Integer cToolTaggingRate,Integer cToolProposedRate, String recruiterName, String deliveryManager, String hSBCHead, String salesPOC,
            List<EvidenceDTO> interviewEvidences, String offerReleaseStatus, Date hSBCOnboardingDate,
            Date techSelectionDate, Date dOJReceivedDate, Date lTIOnboardingDate, Date createDate, Date updateDate,
            Date candidateStatusDate, Date ctoolStartDate, Date bgvInitiatedDate, Date billingStartDate, Integer hsbcId) {
        this.selectionId = selectionId;
        this.employee = employee;
        this.candidate = candidate;
        this.vendorCandidate = vendorCandidate;
        this.baseBu = baseBu;
        this.lob = lob;
        this.subLob = subLob;
        this.irm = irm;
        this.hsbcRoles = hsbcRoles;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        HSBCSelectionDate = hSBCSelectionDate;
        HSBCHiringManager = hSBCHiringManager;
        PricingModel = pricingModel;
        HSBCToolId = hSBCToolId;
        CToolReceivedDate = cToolReceivedDate;
        CToolLocation = cToolLocation;
        CToolGrade = cToolGrade;
        CToolTaggingRate = cToolTaggingRate;
        CToolProposedRate = cToolProposedRate;
        this.recruiterName = recruiterName;
        this.deliveryManager = deliveryManager;
        HSBCHead = hSBCHead;
        this.salesPOC = salesPOC;
        this.interviewEvidences = interviewEvidences;
        this.offerReleaseStatus = offerReleaseStatus;
        HSBCOnboardingDate = hSBCOnboardingDate;
        this.techSelectionDate = techSelectionDate;
        DOJReceivedDate = dOJReceivedDate;
        LTIOnboardingDate = lTIOnboardingDate;
        this.createDate = createDate;
        this.updateDate = updateDate;
        this.candidateStatusDate = candidateStatusDate;
        this.ctoolStartDate = ctoolStartDate;
        this.bgvInitiatedDate = bgvInitiatedDate;
        this.billingStartDate=billingStartDate;
        this.hsbcId=hsbcId;
    }

    public int getSelectionId() {
        return selectionId;
    }

    public void setSelectionId(int selectionId) {
        this.selectionId = selectionId;
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

    public VendorCandidate getVendorCandidate() {
        return vendorCandidate;
    }

    public void setVendorCandidate(VendorCandidate vendorCandidate) {
        this.vendorCandidate = vendorCandidate;
    }

    public String getBaseBu() {
        return baseBu;
    }

    public void setBaseBu(String baseBu) {
        this.baseBu = baseBu;
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

    public HsbcRoles getHsbcRoles() {
        return hsbcRoles;
    }

    public void setHsbcRoles(HsbcRoles hsbcRoles) {
        this.hsbcRoles = hsbcRoles;
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

    public Date getHSBCSelectionDate() {
        return HSBCSelectionDate;
    }

    public void setHSBCSelectionDate(Date hSBCSelectionDate) {
        HSBCSelectionDate = hSBCSelectionDate;
    }

    public String getHSBCHiringManager() {
        return HSBCHiringManager;
    }

    public void setHSBCHiringManager(String hSBCHiringManager) {
        HSBCHiringManager = hSBCHiringManager;
    }

    public String getPricingModel() {
        return PricingModel;
    }

    public void setPricingModel(String pricingModel) {
        PricingModel = pricingModel;
    }

    public Integer getHSBCToolId() {
        return HSBCToolId;
    }

    public void setHSBCToolId(Integer hSBCToolId) {
        HSBCToolId = hSBCToolId;
    }

    public Date getCToolReceivedDate() {
        return CToolReceivedDate;
    }

    public void setCToolReceivedDate(Date cToolReceivedDate) {
        CToolReceivedDate = cToolReceivedDate;
    }

    public String getCToolLocation() {
        return CToolLocation;
    }

    public void setCToolLocation(String cToolLocation) {
        CToolLocation = cToolLocation;
    }

    public Integer getCToolGrade() {
        return CToolGrade;
    }

    public void setCToolGrade(Integer cToolGrade) {
        CToolGrade = cToolGrade;
    }

    public Integer getCToolTaggingRate() {
        return CToolTaggingRate;
    }

    public void setCToolTaggingRate(Integer cToolTaggingRate) {
        CToolTaggingRate = cToolTaggingRate;
    }

    public Integer getCToolProposedRate() {
        return CToolProposedRate;
    }

    public void setCToolProposedRate(Integer cToolProposedRate) {
        CToolProposedRate = cToolProposedRate;
    }

    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    public List<EvidenceDTO> getInterviewEvidences() {
        return interviewEvidences;
    }

    public void setInterviewEvidences(List<EvidenceDTO> interviewEvidences) {
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

    public Date getCandidateStatusDate() {
        return candidateStatusDate;
    }

    public void setCandidateStatusDate(Date candidateStatusDate) {
        this.candidateStatusDate = candidateStatusDate;
    }

    public Date getCtoolStartDate() {
        return ctoolStartDate;
    }

    public void setCtoolStartDate(Date ctoolStartDate) {
        this.ctoolStartDate = ctoolStartDate;
    }

    public Date getBgvInitiatedDate() {
        return bgvInitiatedDate;
    }

    public void setBgvInitiatedDate(Date bgvInitiatedDate) {
        this.bgvInitiatedDate = bgvInitiatedDate;
    }

    public String getDeliveryManager() {
        return deliveryManager;
    }

    public void setDeliveryManager(String deliveryManager) {
        this.deliveryManager = deliveryManager;
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

    public void setSalesPOC(String salesPoc) {
        this.salesPOC = salesPoc;
    }

    public Date getBillingStartDate() {
        return billingStartDate;
    }

    public void setBillingStartDate(Date billingStartDate) {
        this.billingStartDate = billingStartDate;
    }

    public Integer getHsbcId() {
        return hsbcId;
    }

    public void setHsbcId(Integer hsbcId) {
        this.hsbcId = hsbcId;
    }

}