package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class EvidenceDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String interviewEvidences;

    @ManyToOne
    @JoinColumn(name="selectionId")
    private SelectionDetails selectionDetails;

    public EvidenceDTO() {
    }

    public EvidenceDTO(int id, String interviewEvidences, SelectionDetails selectionDetails) {
        this.id = id;
        this.interviewEvidences = interviewEvidences;
        this.selectionDetails = selectionDetails;
    }
    
}
