package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.onboarding.model.CandidateStatus;
import com.example.onboarding.repository.CandidateStatusRepository;

public class CandidateStatusServiceTest {

    @InjectMocks
    private CandidateStatusService candidateStatusService;

    @Mock
    private CandidateStatusRepository candidateStatusRepository;

    private CandidateStatus candidateStatus;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        candidateStatus = new CandidateStatus();
    }

    @Test
    public void testGetAllCandidateStatus() {
        List<CandidateStatus> candidateStatusList = new ArrayList<>();
        candidateStatusList.add(candidateStatus);

        when(candidateStatusRepository.findAll()).thenReturn(candidateStatusList);

        List<CandidateStatus> result = candidateStatusService.getAllCandidateStatus();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(candidateStatus, result.get(0));
        verify(candidateStatusRepository, times(1)).findAll();
    }
}