package com.example.onboarding.service;

import com.example.onboarding.model.OnboardingStatus;
import com.example.onboarding.repository.OnboardingStatusRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class OnboardingStatusServiceTest {

    @Mock
    private OnboardingStatusRepository onboardingStatusRepository;

    @InjectMocks
    private OnboardingStatusService onboardingStatusService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllOnboardingStatus() {
        OnboardingStatus status1 = new OnboardingStatus();
        OnboardingStatus status2 = new OnboardingStatus();
        List<OnboardingStatus> statuses = Arrays.asList(status1, status2);

        when(onboardingStatusRepository.findAll()).thenReturn(statuses);

        List<OnboardingStatus> result = onboardingStatusService.getAllOnboardingStatus();
        assertEquals(2, result.size());
        verify(onboardingStatusRepository, times(1)).findAll();
    }
}