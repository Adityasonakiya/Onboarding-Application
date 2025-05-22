package com.example.onboarding.controller;

import com.example.onboarding.model.CandidateStatus;
import com.example.onboarding.service.CandidateStatusService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CandidateStatusController.class)
public class CandidateStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CandidateStatusService candidateStatusService;

    @Test
    public void testGetAllCandidateStatus_Success() throws Exception {
        CandidateStatus status = new CandidateStatus();
        List<CandidateStatus> statusList = Arrays.asList(status);

        when(candidateStatusService.getAllCandidateStatus()).thenReturn(statusList);

        mockMvc.perform(get("/candidate-status/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetAllCandidateStatus_Error() throws Exception {
        when(candidateStatusService.getAllCandidateStatus()).thenReturn(null);

        mockMvc.perform(get("/candidate-status/all"))
                .andExpect(status().isInternalServerError());
    }
}