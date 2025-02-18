package com.example.onboarding.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.onboarding.model.*;
import com.example.onboarding.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class TaggingDetailsServiceTest {

    @Mock
    private TaggingDetailsRepository taggingDetailsRepository;

    @Mock
    private OnboardingStatusRepository onboardingStatusRepository;

    @Mock
    private BGVStatusRepository bgvStatusRepository;

    @InjectMocks
    private TaggingDetailsService taggingDetailsService;

    private TaggingDetails taggingDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        taggingDetails = new TaggingDetails();
        taggingDetails.setTagId(1);
        taggingDetails.setEmployee(new Employee(1));
    }

    @Test
    public void testGetTaggingDetailsByPsId() {
        int psId = 1;
        when(taggingDetailsRepository.findByEmployee_Psid(psId)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.getTaggingDetailsByPsId(psId);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByEmployee_Psid(psId);
    }

    @Test
    public void testGetTaggingDetailsByCandidateId() {
        int candidateId = 1;
        when(taggingDetailsRepository.findByCandidate_CandidateId(candidateId)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.getTaggingDetailsByCandidateId(candidateId);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByCandidate_CandidateId(candidateId);
    }

    @Test
    public void testUpdateTaggingDetailsByPsId() {
        int psId = 1;
        TaggingDetails updatedDetails = new TaggingDetails();
        when(taggingDetailsRepository.findByEmployee_Psid(psId)).thenReturn(taggingDetails);
        when(taggingDetailsRepository.save(taggingDetails)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.updateTaggingDetailsByPsId(psId, updatedDetails);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByEmployee_Psid(psId);
        verify(taggingDetailsRepository, times(1)).save(taggingDetails);
    }

    @Test
    public void testUpdateTaggingDetailsByCandidateId() {
        int candidateId = 1;
        TaggingDetails updatedDetails = new TaggingDetails();
        when(taggingDetailsRepository.findByCandidate_CandidateId(candidateId)).thenReturn(taggingDetails);
        when(taggingDetailsRepository.save(taggingDetails)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.updateTaggingDetailsByCandidateId(candidateId, updatedDetails);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByCandidate_CandidateId(candidateId);
        verify(taggingDetailsRepository, times(1)).save(taggingDetails);
    }
}