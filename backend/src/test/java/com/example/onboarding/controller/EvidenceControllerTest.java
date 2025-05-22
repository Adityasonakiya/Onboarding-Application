package com.example.onboarding.controller;

import com.example.onboarding.model.EvidenceDTO;
import com.example.onboarding.service.EvidenceService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EvidenceController.class)
public class EvidenceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EvidenceService evidenceService;

    @Test
    public void testGetEvidenceById_Found() throws Exception {
        EvidenceDTO evidence = new EvidenceDTO(1, "file1.pdf", 100);
        Mockito.when(evidenceService.getEvidenceById(1)).thenReturn(evidence);

        mockMvc.perform(get("/evidence/id/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetEvidenceById_NotFound() throws Exception {
        Mockito.when(evidenceService.getEvidenceById(1)).thenReturn(null);

        mockMvc.perform(get("/evidence/id/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetEvidenceBySelectionId_Found() throws Exception {
        EvidenceDTO evidence = new EvidenceDTO(1, "file1.pdf", 100);
        Mockito.when(evidenceService.getEvidenceBySelectionId(100)).thenReturn(Arrays.asList(evidence));

        mockMvc.perform(get("/evidence/selectionId/100"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetEvidenceBySelectionId_NotFound() throws Exception {
        Mockito.when(evidenceService.getEvidenceBySelectionId(100)).thenReturn(Arrays.asList());

        mockMvc.perform(get("/evidence/selectionId/100"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateEvidence() throws Exception {
        EvidenceDTO evidence = new EvidenceDTO(1, "file1.pdf", 100);
        Mockito.when(evidenceService.createEvidence(any(EvidenceDTO.class))).thenReturn(evidence);

        mockMvc.perform(post("/evidence")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"fileName\":\"file1.pdf\",\"selectionId\":100}"))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testDeleteEvidence_Success() throws Exception {
        Mockito.when(evidenceService.deleteEvidence("file1.pdf", 100)).thenReturn(true);

        mockMvc.perform(delete("/evidence/delete")
                .param("fileName", "file1.pdf")
                .param("selectionId", "100"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteEvidence_NotFound() throws Exception {
        Mockito.when(evidenceService.deleteEvidence("file1.pdf", 100)).thenReturn(false);

        mockMvc.perform(delete("/evidence/delete")
                .param("fileName", "file1.pdf")
                .param("selectionId", "100"))
                .andExpect(status().isNotFound());
    }
}