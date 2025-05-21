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

import com.example.onboarding.model.LOB;
import com.example.onboarding.service.LOBService;

@WebMvcTest(LOBController.class)
public class LOBControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private LOBService lobService;

    @Test
    public void testFindLob() throws Exception {
        int lobId = 1;
        LOB lob = new LOB();
        Mockito.when(lobService.findById(lobId)).thenReturn(lob);

        mockMvc.perform(get("/users/lob/{lobId}", lobId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testFindAllLob() throws Exception{
        List<LOB> list = new ArrayList<>();
        LOB lob = new LOB();
        list.add(lob);
        Mockito.when(lobService.findAll()).thenReturn(list);

        mockMvc.perform(get("/users/lobs"))
                .andExpect(status().isOk())
                .andExpectAll(content().contentType(MediaType.APPLICATION_JSON));
    }

    public LOBService getLobService() {
        return lobService;
    }

    public void setLobService(LOBService lobService) {
        this.lobService = lobService;
    }
    
}
