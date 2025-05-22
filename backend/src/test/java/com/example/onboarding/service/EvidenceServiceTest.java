package com.example.onboarding.service;

import com.example.onboarding.model.EvidenceDTO;
import com.example.onboarding.repository.EvidenceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EvidenceServiceTest {

    @Mock
    private EvidenceRepository evidenceRepository;

    @InjectMocks
    private EvidenceService evidenceService;

    private EvidenceDTO evidence;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        evidence = new EvidenceDTO(1, "file1.pdf", 100);
    }

    @Test
    public void testCreateEvidence() {
        when(evidenceRepository.save(any(EvidenceDTO.class))).thenReturn(evidence);

        EvidenceDTO result = evidenceService.createEvidence(evidence);

        assertNotNull(result);
        assertEquals(evidence, result);
        verify(evidenceRepository, times(1)).save(evidence);
    }

    @Test
    public void testGetEvidenceById_Found() {
        when(evidenceRepository.findById(1)).thenReturn(Optional.of(evidence));

        EvidenceDTO result = evidenceService.getEvidenceById(1);

        assertNotNull(result);
        assertEquals(evidence, result);
        verify(evidenceRepository, times(1)).findById(1);
    }

    @Test
    public void testGetEvidenceById_NotFound() {
        when(evidenceRepository.findById(2)).thenReturn(Optional.empty());

        EvidenceDTO result = evidenceService.getEvidenceById(2);

        assertNull(result);
        verify(evidenceRepository, times(1)).findById(2);
    }

    @Test
    public void testGetEvidenceBySelectionId() {
        List<EvidenceDTO> evidenceList = Arrays.asList(evidence);
        when(evidenceRepository.findBySelectionId(100)).thenReturn(evidenceList);

        List<EvidenceDTO> result = evidenceService.getEvidenceBySelectionId(100);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(evidenceRepository, times(1)).findBySelectionId(100);
    }

    @Test
    public void testDeleteEvidence_Success() {
        List<EvidenceDTO> evidenceList = Arrays.asList(evidence);
        when(evidenceRepository.findBySelectionId(100)).thenReturn(evidenceList);

        boolean result = evidenceService.deleteEvidence("file1.pdf", 100);

        assertTrue(result);
        verify(evidenceRepository, times(1)).deleteById(1);
    }

    @Test
    public void testDeleteEvidence_NotFound() {
        List<EvidenceDTO> evidenceList = Arrays.asList(evidence);
        when(evidenceRepository.findBySelectionId(100)).thenReturn(evidenceList);

        boolean result = evidenceService.deleteEvidence("file2.pdf", 100);

        assertFalse(result);
        verify(evidenceRepository, never()).deleteById(anyInt());
    }
}