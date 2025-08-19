package com.example.onboarding.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

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
    assertNull(result, "Result should be null when LOB is not found");
    verify(lobRepo, times(1)).findById(lobId);
}

@Test
public void testFindAllActive() {

    List<LOB> list = new ArrayList<>();
    list.add(lob);
    when(lobRepo.findByActiveTrue()).thenReturn(list);

    List<LOB> result = lobService.findAllActive();

    assertNotNull(result, "Result list should not be null");
    assertEquals(1, result.size(), "Result list size should match");
    assertEquals(lob, result.get(0), "First element in the result list should match the mock LOB object");
    verify(lobRepo, times(1)).findByActiveTrue();
}

@Test
public void testFindAll() {

    List<LOB> list = new ArrayList<>();
    list.add(lob);
    when(lobRepo.findAll()).thenReturn(list);

    List<LOB> result = lobService.findAll();

    assertNotNull(result, "Result list should not be null");
    assertEquals(1, result.size(), "Result list size should match");
    assertEquals(lob, result.get(0), "First element in the result list should match the mock LOB object");
    verify(lobRepo, times(1)).findAll();
}

}