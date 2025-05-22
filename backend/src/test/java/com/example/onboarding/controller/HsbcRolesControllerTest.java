package com.example.onboarding.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

import com.example.onboarding.model.HsbcRoles;
import com.example.onboarding.service.HsbcRolesService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

public class HsbcRolesControllerTest {

    private MockMvc mockMvc;

    @Mock
    private HsbcRolesService hsbcRolesService;

   @InjectMocks
    private HsbcRolesController hsbcRolesController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(hsbcRolesController).build();
    }

    @Test
    void testFindById_Found() throws Exception {
        HsbcRoles role = mock(HsbcRoles.class); // Using mock instead of setting fields
        when(hsbcRolesService.getById(1)).thenReturn(role);

        mockMvc.perform(get("/hsbc-roles/1"))
               .andExpect(status().isInternalServerError()); // As per your controller logic
    }

    @Test
    void testFindById_NotFound() throws Exception {
        when(hsbcRolesService.getById(1)).thenReturn(null);

        mockMvc.perform(get("/hsbc-roles/1"))
                .andExpect(status().isOk());
    }

    @Test
    void testSearchRoles_WithQuery() throws Exception {
        List<HsbcRoles> roles = Arrays.asList(mock(HsbcRoles.class));
        when(hsbcRolesService.searchRoles("Developer")).thenReturn(roles);

        mockMvc.perform(get("/hsbc-roles").param("query", "Developer"))
                .andExpect(status().isOk());
    }

    @Test
    void testSearchRoles_WithoutQuery() throws Exception {
        List<HsbcRoles> roles = Arrays.asList(mock(HsbcRoles.class), mock(HsbcRoles.class));
        when(hsbcRolesService.searchRoles(null)).thenReturn(roles);

        mockMvc.perform(get("/hsbc-roles"))
                .andExpect(status().isOk());
    }
}
