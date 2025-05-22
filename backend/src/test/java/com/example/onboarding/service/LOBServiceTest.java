package com.example.onboarding.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
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
        verify(lobRepo, times(1)).findByActiveTrue();
    }

}