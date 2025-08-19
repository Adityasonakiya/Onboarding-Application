package com.example.onboarding.controller;

import com.example.onboarding.model.*;
import com.example.onboarding.service.SelectionDetailsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SelectionDetailsController.class)
public class SelectionDetailsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SelectionDetailsService selectionDetailsService;

    @Test
    public void testGetSelectionDetailsByPsid_Found() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.getSelectionDetailsByPsid(1)).thenReturn(details);

        mockMvc.perform(get("/selection-details/psid/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetSelectionDetailsByPsid_NotFound() throws Exception {
        Mockito.when(selectionDetailsService.getSelectionDetailsByPsid(1)).thenReturn(null);

        mockMvc.perform(get("/selection-details/psid/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetSelectionDetailsByCandidateId_Found() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.getSelectionDetailsByCandidatePhoneNumber(123L)).thenReturn(details);

        mockMvc.perform(get("/selection-details/candidateId/123"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetSelectionDetailsByCandidateId_NotFound() throws Exception {
        Mockito.when(selectionDetailsService.getSelectionDetailsByCandidatePhoneNumber(123L)).thenReturn(null);

        mockMvc.perform(get("/selection-details/candidateId/123"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetSelectionDetailsByVendorCandidateId_Found() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.getSelectionDetailsByVendorCandidatePhoneNumber(123L)).thenReturn(details);

        mockMvc.perform(get("/selection-details/vendorCandidateId/123"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetSelectionDetailsByVendorCandidateId_NotFound() throws Exception {
        Mockito.when(selectionDetailsService.getSelectionDetailsByVendorCandidatePhoneNumber(123L)).thenReturn(null);

        mockMvc.perform(get("/selection-details/vendorCandidateId/123"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testCreateSelectionDetails_Employee() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.createSelectionDetails_Employee(any(SelectionDetails.class))).thenReturn(details);

        mockMvc.perform(post("/selection-details/create/employee")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"employee\": {\"psid\": 1}}"))
                .andExpect(status().isCreated())
                .andExpect(content().string("Selection created successfully"));
    }

    @Test
    public void testCreateSelectionDetails_Candidate_Success() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.createSelectionDetails_Candidate(any(SelectionDetails.class))).thenReturn(details);

        mockMvc.perform(post("/selection-details/create/candidate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"candidate\": {\"phoneNumber\": 123}}"))
                .andExpect(status().isCreated())
                .andExpect(content().string("Selection created successfully"));
    }

    @Test
    public void testCreateSelectionDetails_Candidate_Failure() throws Exception {
        Mockito.doThrow(new RuntimeException("Selection already exists"))
                .when(selectionDetailsService).createSelectionDetails_Candidate(any(SelectionDetails.class));

        mockMvc.perform(post("/selection-details/create/candidate")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"candidate\": {\"phoneNumber\": 123}}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Selection already exists"));
    }

    @Test
    public void testCreateSelectionDetails_VendorCandidate_Success() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.createSelectionDetails_VendorCandidate(any(SelectionDetails.class))).thenReturn(details);

        mockMvc.perform(post("/selection-details/create/vendor")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"vendorCandidate\": {\"vendorCandidateId\": 1}}"))
                .andExpect(status().isCreated())
                .andExpect(content().string("Selection created successfully"));
    }

    @Test
    public void testCreateSelectionDetails_VendorCandidate_Failure() throws Exception {
        Mockito.doThrow(new RuntimeException("Selection already exists"))
                .when(selectionDetailsService).createSelectionDetails_VendorCandidate(any(SelectionDetails.class));

        mockMvc.perform(post("/selection-details/create/vendor")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"vendorCandidate\": {\"vendorCandidateId\": 1}}"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Selection already exists"));
    }

    @Test
    public void testUpdateSelectionDetailsByPsId_Found() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.updateSelectionDetailsByPsId(eq(1), any(SelectionDetails.class))).thenReturn(details);

        mockMvc.perform(put("/selection-details/put/psid/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"employee\": {\"psid\": 1}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateSelectionDetailsByPsId_NotFound() throws Exception {
        Mockito.when(selectionDetailsService.updateSelectionDetailsByPsId(eq(1), any(SelectionDetails.class))).thenReturn(null);

        mockMvc.perform(put("/selection-details/put/psid/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"employee\": {\"psid\": 1}}"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateSelectionDetailsByCandidateId_Found() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.updateSelectionDetailsByCandidatePhoneNumber(eq(123L), any(SelectionDetails.class))).thenReturn(details);

        mockMvc.perform(put("/selection-details/put/candidateId/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"candidate\": {\"phoneNumber\": 123}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateSelectionDetailsByCandidateId_NotFound() throws Exception {
        Mockito.when(selectionDetailsService.updateSelectionDetailsByCandidatePhoneNumber(eq(123L), any(SelectionDetails.class))).thenReturn(null);

        mockMvc.perform(put("/selection-details/put/candidateId/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"candidate\": {\"phoneNumber\": 123}}"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateSelectionDetailsByVendorCandidateId_Found() throws Exception {
        SelectionDetails details = new SelectionDetails();
        Mockito.when(selectionDetailsService.updateSelectionDetailsByVendorCandidatePhoneNumber(eq(123L), any(SelectionDetails.class))).thenReturn(details);

        mockMvc.perform(put("/selection-details/put/vendorCandidateId/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"vendorCandidate\": {\"vendorCandidateId\": 1}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateSelectionDetailsByVendorCandidateId_NotFound() throws Exception {
        Mockito.when(selectionDetailsService.updateSelectionDetailsByVendorCandidatePhoneNumber(eq(123L), any(SelectionDetails.class))).thenReturn(null);

        mockMvc.perform(put("/selection-details/put/vendorCandidateId/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"vendorCandidate\": {\"vendorCandidateId\": 1}}"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetEmployeeCandidates() throws Exception {
        EmployeeCandidateDTO dto = new EmployeeCandidateDTO();
        Mockito.when(selectionDetailsService.getEmployeeCandidates(anyInt(), anyInt(), anyInt()))
                .thenReturn(new PageImpl<>(Collections.singletonList(dto), PageRequest.of(0, 1), 1));

        mockMvc.perform(get("/selection-details/api/employee-candidates")
                .param("loggedInPsid", "1")
                .param("page", "0")
                .param("size", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testFindSelections() throws Exception {
        SelectionDTO dto = new SelectionDTO();
        Mockito.when(selectionDetailsService.findSelections(anyString(),anyInt()))
                .thenReturn(Arrays.asList(dto));

        mockMvc.perform(get("/selection-details/selections")
                .param("filter", "test")
                .param("loggedInPsid", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testFindAwaitedCases() throws Exception {
        AwaitedCasesDTO dto = new AwaitedCasesDTO();
        Mockito.when(selectionDetailsService.findAwaitedCases(anyString(),anyInt()))
                .thenReturn(Arrays.asList(dto));

        mockMvc.perform(get("/selection-details/awaited-cases")
                .param("filter", "test")
                .param("loggedInPsid", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testFindCtool() throws Exception {
        CtoolDto dto = new CtoolDto();
        Mockito.when(selectionDetailsService.findCtool(anyString(),anyInt()))
                .thenReturn(Arrays.asList(dto));

        mockMvc.perform(get("/selection-details/ctool")
                .param("filter", "test")
                .param("loggedInPsid", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testFindExcelData() throws Exception {
        ExcelDataDTO dto = new ExcelDataDTO();
        Mockito.when(selectionDetailsService.findExcelData(anyInt()))
                .thenReturn(Arrays.asList(dto));

        mockMvc.perform(get("/selection-details/excel")
                .param("createdBy", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}
