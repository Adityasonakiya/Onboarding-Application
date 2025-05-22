package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.onboarding.model.LOB;
import com.example.onboarding.repository.LOBRepository;

public class LOBServiceTest {

    private LOB lob;

    @InjectMocks
    private LOBService lobService;

    @Mock
    private LOBRepository lobRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        lob = new LOB();
        lob.setLobId(1);
        // lob.setName("Test LOB"); // Set additional fields if required
    }

    @Test
    public void testFindById() {
        int lobId = 1;
        when(lobRepo.findById(lobId)).thenReturn(Optional.of(lob));

        LOB result = lobService.findById(lobId);

        assertNotNull(result);
        assertEquals(lob, result);
        verify(lobRepo, times(1)).findById(lobId);
    }

    @Test
    public void testFindById_NotFound() {
        int lobId = 1;
        when(lobRepo.findById(lobId)).thenReturn(Optional.empty());

        LOB result = lobService.findById(lobId);

        assertNull(result);
        verify(lobRepo, times(1)).findById(lobId);
    }

    @Test
    public void testFindAll() {
        List<LOB> list = new ArrayList<>();
        list.add(lob);

        when(lobRepo.findByActiveTrue()).thenReturn(list);

        List<LOB> resultList = lobService.findAll();

        assertNotNull(resultList, "Result list should not be null");
        assertEquals(1, resultList.size(), "Result list size should be 1");
        assertEquals(lob, resultList.get(0), "The first element in the result list should match the mock LOB object");
        verify(lobRepo, times(1)).findByActiveTrue();
    }

    @Test
    public void testFindAll_Empty() {
        when(lobRepo.findByActiveTrue()).thenReturn(new ArrayList<>());

        List<LOB> resultList = lobService.findAll();

        assertNotNull(resultList, "Result list should not be null");
        assertTrue(resultList.isEmpty(), "Result list should be empty");
        verify(lobRepo, times(1)).findByActiveTrue();
    }

}