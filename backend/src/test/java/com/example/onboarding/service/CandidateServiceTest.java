package com.example.onboarding.service;

import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.repository.CandidateRepository;
import com.example.onboarding.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepository;

    @Mock
    private UserService userService;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private CandidateService candidateService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks before each test
    }

    @Test
    public void testGetCandidateById_Found() {
        Candidate candidate = new Candidate();
        when(candidateRepository.findByPhoneNumber(123L)).thenReturn(Optional.of(candidate));

        Candidate result = candidateService.getCandidateById(123L); // <-- FIXED
        assertNotNull(result);
    }

    @Test
    public void testGetCandidateById_NotFound() {
        when(candidateRepository.findByPhoneNumber(123L)).thenReturn(Optional.empty());

        Candidate result = candidateService.getCandidateById(123L);
        assertNull(result);
    }

    @Test
    public void testGetAllCandidates() {
        List<Candidate> candidates = Arrays.asList(new Candidate(), new Candidate());
        when(candidateRepository.findAll()).thenReturn(candidates);

        List<Candidate> result = candidateService.getAllCandidates();
        assertEquals(2, result.size());
    }

    @Test
    public void testSearchByCandidateName() {
        List<EmployeeCandidateDTO> dtos = Collections.singletonList(new EmployeeCandidateDTO());
        when(candidateRepository.searchByCandidateName("John")).thenReturn(dtos);

        List<EmployeeCandidateDTO> result = candidateService.searchByCandidateName("John");
        assertEquals(1, result.size());
    }

    @Test
    public void testGetEmployeeCandidateById_Found() {
        EmployeeCandidateDTO dto = new EmployeeCandidateDTO();
        when(candidateRepository.findEmployeeCandidateByPhoneNumber(123L)).thenReturn(Optional.of(dto));

        EmployeeCandidateDTO result = candidateService.getEmployeeCandidateById(123L);
        assertNotNull(result);
    }

    @Test
    public void testGetEmployeeCandidateById_NotFound() {
        when(candidateRepository.findEmployeeCandidateByPhoneNumber(123L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> candidateService.getEmployeeCandidateById(123L));
    }
}
