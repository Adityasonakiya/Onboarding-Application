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

import com.example.onboarding.model.SubLOB;
import com.example.onboarding.service.SubLOBService;

@WebMvcTest(SubLOBController.class)
public class SubLOBControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private SubLOBService sublobService;

    @Test
    public void TestFindSubLob() throws Exception{
        int lobId = 1;
        List<SubLOB> list = new ArrayList<>();
        SubLOB sublob = new SubLOB();
        list.add(sublob);
        Mockito.when(sublobService.findByLobId(lobId)).thenReturn(list);

        mockMvc.perform(get("/users/sublobs/{lobId}", lobId))
                .andExpect(status().isOk())
                .andExpectAll(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void TestFindSubLobById() throws Exception{
        int subLobId = 1;
        SubLOB sublob = new SubLOB();
        Mockito.when(sublobService.findById(subLobId)).thenReturn(sublob);

        mockMvc.perform(get("users/sublob/{subLobId}",subLobId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}
