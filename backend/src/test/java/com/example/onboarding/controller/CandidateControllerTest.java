package com.example.onboarding.controller;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.service.CandidateService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CandidateController.class)
public class CandidateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CandidateService candidateService;

    @Test
    public void testGetCandidateById_Found() throws Exception {
        Candidate candidate = new Candidate();
        Mockito.when(candidateService.getCandidateById(1234567890L)).thenReturn(candidate);

        mockMvc.perform(get("/candidates/1234567890"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetCandidateById_NotFound() throws Exception {
        Mockito.when(candidateService.getCandidateById(1234567890L)).thenReturn(null);

        mockMvc.perform(get("/candidates/1234567890"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetCandidateByPhoneNumber_Found() throws Exception {
        EmployeeCandidateDTO dto = new EmployeeCandidateDTO();
        Mockito.when(candidateService.getEmployeeCandidateById(1234567890L)).thenReturn(dto);

        mockMvc.perform(get("/candidates/phoneNumber/1234567890"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllCandidates() throws Exception {
        List<Candidate> candidates = Arrays.asList(new Candidate(), new Candidate());
        Mockito.when(candidateService.getAllCandidates()).thenReturn(candidates);

        mockMvc.perform(get("/candidates"))
                .andExpect(status().isOk());
    }

    @Test
    public void testSearchCandidatesByName_Found() throws Exception {
        List<EmployeeCandidateDTO> dtos = Collections.singletonList(new EmployeeCandidateDTO());
        Mockito.when(candidateService.searchByCandidateName("John")).thenReturn(dtos);

        mockMvc.perform(get("/candidates/api/candidates/search").param("query", "John"))
                .andExpect(status().isOk());
    }

    @Test
    public void testSearchCandidatesByName_NotFound() throws Exception {
        Mockito.when(candidateService.searchByCandidateName("Unknown")).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/candidates/api/candidates/search").param("query", "Unknown"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateVendorCandidate() throws Exception {
        Candidate candidate = new Candidate();
        candidate.setCandidateId(1);
        Mockito.when(candidateService.createCandidate(Mockito.any(Candidate.class))).thenReturn(candidate);

        mockMvc.perform(post("/candidates/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"candidateId\":1}"))
                .andExpect(status().isCreated());
    }
}
