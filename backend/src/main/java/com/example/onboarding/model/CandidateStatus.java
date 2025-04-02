package com.example.onboarding.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Entity;

@Entity
public class CandidateStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int candidateStatusId;
    private String candidateStatus;
    private String remarks;
    
    @OneToMany(mappedBy = "candidateStatus", cascade = CascadeType.ALL)
    private List<TaggingDetails> taggingDetails;

    public int getCandidateStatusId() {
        return candidateStatusId;
    }

    public void setCandidateStatusId(int candidateStatusId) {
        this.candidateStatusId = candidateStatusId;
    }

    public String getCandidateStatus() {
        return candidateStatus;
    }

    public void setCandidateStatus(String candidateStatus) {
        this.candidateStatus = candidateStatus;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public List<TaggingDetails> getTaggingDetails() {
        return taggingDetails;
    }

    public void setTaggingDetails(List<TaggingDetails> taggingDetails) {
        this.taggingDetails = taggingDetails;
    }
    
}
