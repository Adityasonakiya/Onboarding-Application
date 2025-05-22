package com.example.onboarding.controller;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
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

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    @Test
    public void testGetEmployeeByPsid_Found() throws Exception {
        Employee employee = new Employee(1);
        Mockito.when(employeeService.getEmployeeByPsid(1)).thenReturn(employee);

        mockMvc.perform(get("/employees/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetEmployeeByPsid_NotFound() throws Exception {
        Mockito.when(employeeService.getEmployeeByPsid(2)).thenReturn(null);

        mockMvc.perform(get("/employees/2"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllEmployees_Found() throws Exception {
        Mockito.when(employeeService.getAllEmployees()).thenReturn(Arrays.asList(new Employee(1)));

        mockMvc.perform(get("/employees"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetAllEmployees_NotFound() throws Exception {
        Mockito.when(employeeService.getAllEmployees()).thenReturn(null);

        mockMvc.perform(get("/employees"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetEmployeeCandidateById_Found() throws Exception {
        EmployeeCandidateDTO candidate = new EmployeeCandidateDTO();
        Mockito.when(employeeService.getEmployeeCandidateById(1)).thenReturn(candidate);

        mockMvc.perform(get("/employees/api/employee-candidates/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetEmployeeCandidateById_NotFound() throws Exception {
        Mockito.when(employeeService.getEmployeeCandidateById(2)).thenThrow(new EntityNotFoundException());

        mockMvc.perform(get("/employees/api/employee-candidates/2"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testSearchById() throws Exception {
        Mockito.when(employeeService.searchById(1)).thenReturn(Arrays.asList(new EmployeeCandidateDTO()));

        mockMvc.perform(get("/employees/search").param("query", "1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetCandidatesByOnboardingStatus() throws Exception {
        Mockito.when(employeeService.getCandidatesByOnboardingStatus("Joined")).thenReturn(Arrays.asList(new EmployeeCandidateDTO()));

        mockMvc.perform(get("/employees/onboarding-status").param("status", "Joined"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetCandidatesByBgvStatus() throws Exception {
        Mockito.when(employeeService.getCandidatesByBgvStatus("Clear")).thenReturn(Arrays.asList(new EmployeeCandidateDTO()));

        mockMvc.perform(get("/employees/bgv-status").param("status", "Clear"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}