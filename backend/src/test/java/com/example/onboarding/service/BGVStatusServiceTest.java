package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.onboarding.model.BGVStatus;
import com.example.onboarding.repository.BGVStatusRepository;

public class BGVStatusServiceTest {

    @InjectMocks
    private BGVStatusService bgvStatusService;

    @Mock
    private BGVStatusRepository bgvStatusRepository;

    private BGVStatus bgvStatus;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        bgvStatus = new BGVStatus();
    }

    @Test
    public void testGetAllBgv() {
        List<BGVStatus> bgvStatusList = new ArrayList<>();
        bgvStatusList.add(bgvStatus);

        when(bgvStatusRepository.findAll()).thenReturn(bgvStatusList);

        List<BGVStatus> result = bgvStatusService.getAllBgv();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(bgvStatus, result.get(0));
        verify(bgvStatusRepository, times(1)).findAll();
    }
}
