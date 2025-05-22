package com.example.onboarding.service;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetEmployeeByPsid_Found() {
        Employee employee = new Employee(1);
        when(employeeRepository.findById(1)).thenReturn(Optional.of(employee));

        Employee result = employeeService.getEmployeeByPsid(1);

        assertNotNull(result);
        assertEquals(employee, result);
    }

    @Test
    public void testGetEmployeeByPsid_NotFound() {
        when(employeeRepository.findById(2)).thenReturn(Optional.empty());

        Employee result = employeeService.getEmployeeByPsid(2);

        assertNull(result);
    }

    @Test
    public void testGetAllEmployees() {
        List<Employee> employees = Arrays.asList(new Employee(1), new Employee(2));
        when(employeeRepository.findAll()).thenReturn(employees);

        List<Employee> result = employeeService.getAllEmployees();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetEmployeeCandidateById_Found() {
        EmployeeCandidateDTO candidate = new EmployeeCandidateDTO();
        when(employeeRepository.findEmployeeCandidateByPsid(1)).thenReturn(Optional.of(candidate));

        EmployeeCandidateDTO result = employeeService.getEmployeeCandidateById(1);

        assertNotNull(result);
        assertEquals(candidate, result);
    }

    @Test
    public void testGetEmployeeCandidateById_NotFound() {
        when(employeeRepository.findEmployeeCandidateByPsid(2)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> employeeService.getEmployeeCandidateById(2));
    }

    @Test
    public void testSearchById() {
        List<EmployeeCandidateDTO> candidates = Arrays.asList(new EmployeeCandidateDTO());
        when(employeeRepository.searchByPsidOrCandidateId(1)).thenReturn(candidates);

        List<EmployeeCandidateDTO> result = employeeService.searchById(1);

        assertEquals(1, result.size());
    }

    @Test
    public void testGetCandidatesByOnboardingStatus() {
        List<EmployeeCandidateDTO> candidates = Arrays.asList(new EmployeeCandidateDTO());
        when(employeeRepository.findByOnboardingStatus("Joined")).thenReturn(candidates);

        List<EmployeeCandidateDTO> result = employeeService.getCandidatesByOnboardingStatus("Joined");

        assertEquals(1, result.size());
    }

    @Test
    public void testGetCandidatesByBgvStatus() {
        List<EmployeeCandidateDTO> candidates = Arrays.asList(new EmployeeCandidateDTO());
        when(employeeRepository.findByBgvStatus("Clear")).thenReturn(candidates);

        List<EmployeeCandidateDTO> result = employeeService.getCandidatesByBgvStatus("Clear");

        assertEquals(1, result.size());
    }
}