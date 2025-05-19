package com.example.onboarding.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.onboarding.model.BGVStatus;
import com.example.onboarding.service.BGVStatusService;

@WebMvcTest(BGVStatusController.class)
public class BGVStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BGVStatusService bgvStatusService;

    @Test
    public void testGetAllBgvStatus() throws Exception {
        List<BGVStatus> bgvStatusList = new ArrayList<>();
        BGVStatus bgvStatus = new BGVStatus();
        bgvStatusList.add(bgvStatus);

        Mockito.when(bgvStatusService.getAllBgv()).thenReturn(bgvStatusList);

        mockMvc.perform(get("/Bgvs"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("[{}]")); // Adjust the expected JSON as per your BGVStatus structure
    }

    @Test
    public void testGetAllBgvStatusNotFound() throws Exception {
        Mockito.when(bgvStatusService.getAllBgv()).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/Bgvs"))
                .andExpect(status().isNotFound());
    }
}
