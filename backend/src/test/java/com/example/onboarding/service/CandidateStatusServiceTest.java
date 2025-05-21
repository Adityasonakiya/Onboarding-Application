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
    private CandidateStatusService cndStatusService;

    @Mock
    private CandidateStatusRepository cndStatusRepository;

    private CandidateStatus cndStatus;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        cndStatus = new CandidateStatus();
    }

    @Test
    public void testGetAllCandidateStatus(){
        List<CandidateStatus> cndStatusList = new ArrayList<>();
        cndStatusList.add(cndStatus);

        when(cndStatusRepository.findAll()).thenReturn(cndStatusList);

        List<CandidateStatus> result = cndStatusService.getAllCandidateStatus();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(cndStatus, result.get(0));
        verify(cndStatusRepository, times(1)).findAll();
    }

}
