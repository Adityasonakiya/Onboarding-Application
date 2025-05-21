package com.example.onboarding.controller;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.onboarding.model.OnboardingStatus;
import com.example.onboarding.service.OnboardingStatusService;

@WebMvcTest(OnboardingStatusController.class)
public class OnboardingStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private OnboardingStatusService onboardingStatusService;

    @Test
    public void testGetAllOnboardingStatus() throws Exception {
        OnboardingStatus status1 = new OnboardingStatus();
        OnboardingStatus status2 = new OnboardingStatus();
        List<OnboardingStatus> statuses = Arrays.asList(status1, status2);

        Mockito.when(onboardingStatusService.getAllOnboardingStatus()).thenReturn(statuses);

        mockMvc.perform(get("/OnboardingStatuses"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetAllOnboardingStatusNotFound() throws Exception {
        Mockito.when(onboardingStatusService.getAllOnboardingStatus()).thenReturn(null);

        mockMvc.perform(get("/OnboardingStatuses"))
                .andExpect(status().isNotFound());
    }

    public OnboardingStatusService getOnboardingStatusService() {
        return onboardingStatusService;
    }

    public void setOnboardingStatusService(OnboardingStatusService onboardingStatusService) {
        this.onboardingStatusService = onboardingStatusService;
    }
    
}
