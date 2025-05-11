package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class EvidenceDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String fileName;
    private int selectionId;

    public EvidenceDTO() {
    }

    public EvidenceDTO(int id, String interviewEvidences, int selectionId) {
        this.id = id;
        this.fileName = interviewEvidences;
        this.selectionId = selectionId;
    }
    
}
