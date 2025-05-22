package com.example.onboarding.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.onboarding.model.CandidateStatus;
import com.example.onboarding.service.CandidateStatusService;

@WebMvcTest(CandidateStatusController.class)
public class CandidateStatusControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private CandidateStatusService candidateStatusService;

    @Test
    public void testFindAllLob() throws Exception{
        List<CandidateStatus> list = new ArrayList<>();
        CandidateStatus cnd = new CandidateStatus();
        list.add(cnd);
        Mockito.when(candidateStatusService.getAllCandidateStatus()).thenReturn(list);

        mockMvc.perform(get("/candidate-status/all"))
                .andExpect(status().isOk())
                .andExpectAll(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetAllCandidateStatusNotFound() throws Exception {
        Mockito.when(candidateStatusService.getAllCandidateStatus()).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/candidate-status/all"))
                .andExpect(status().isNotFound());
    }

    public CandidateStatusService getCandidateStatusService() {
        return candidateStatusService;
    }
    
    public void setCandidateStatusService(CandidateStatusService candidateStatusService) {
        this.candidateStatusService = candidateStatusService;
    }
}
