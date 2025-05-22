package com.example.onboarding.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.List;

import com.example.onboarding.model.Vendor;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.service.VendorCandidateService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType; // Correct import
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(VendorCandidateController.class)
public class VendorCandidateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private VendorCandidateService vendorCandidateService;

    @Test
    public void testGetVendorById_Found() throws Exception {
        Vendor vendor = new Vendor(); // You can set fields if needed
        Mockito.when(vendorCandidateService.getVendorById(1)).thenReturn(vendor);

        mockMvc.perform(get("/vendors/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetVendorById_NotFound() throws Exception {
        Mockito.when(vendorCandidateService.getVendorById(1)).thenReturn(null);

        mockMvc.perform(get("/vendors/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllVendors() throws Exception {
        List<Vendor> vendors = Arrays.asList(new Vendor());
        Mockito.when(vendorCandidateService.getAllVendors()).thenReturn(vendors);

        mockMvc.perform(get("/vendors"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetVendorCandidateById_Found() throws Exception {
        VendorCandidate candidate = new VendorCandidate();
        Mockito.when(vendorCandidateService.getVendorCandidateById(1234567890L)).thenReturn(candidate);

        mockMvc.perform(get("/vendors/vendor-candidates/1234567890"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetVendorCandidateById_NotFound() throws Exception {
        Mockito.when(vendorCandidateService.getVendorCandidateById(1234567890L)).thenReturn(null);

        mockMvc.perform(get("/vendors/vendor-candidates/1234567890"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllVendorCandidates() throws Exception {
        List<VendorCandidate> candidates = Arrays.asList(new VendorCandidate());
        Mockito.when(vendorCandidateService.getAllVendorCandidates()).thenReturn(candidates);

        mockMvc.perform(get("/vendors/vendor-candidates"))
                .andExpect(status().isOk());
    }

    @Test
    public void testCreateVendorCandidate() throws Exception {
        VendorCandidate input = new VendorCandidate();
        VendorCandidate saved = new VendorCandidate();

        Mockito.when(vendorCandidateService.createVendorCandidate(Mockito.any(VendorCandidate.class)))
                .thenReturn(saved);

        mockMvc.perform(post("/vendors/vendor-candidates/create")
                .contentType(MediaType.APPLICATION_JSON) // Correct usage
                .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated());
    }

    @Test
    public void testCreateVendorCandidate_BadRequest() throws Exception {
        mockMvc.perform(post("/vendors/vendor-candidates/create")
                .contentType(MediaType.APPLICATION_JSON) // Correct usage
                .content(""))
                .andExpect(status().isBadRequest());
    }
}