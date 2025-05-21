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
    public void setUp(){
        MockitoAnnotations.openMocks(this);
        lob = new LOB();
        lob.setLobId(1);
    }

    @Test
    public void testFindById(){
        int lobId = 1;
                when(lobRepo.findById(lobId)).thenReturn(Optional.of(lob));

                LOB result = lobService.findById(lobId);
                assertNotNull(result);
                verify(lobRepo , times(1)).findById(lobId);
    }

    @Test
    public void testFindAll(){
         // Create a mock list and add an object to it
        List<LOB> list = new ArrayList<>();
        list.add(lob);
        // Mock the repository call
        when(lobRepo.findByActiveTrue()).thenReturn(list);
        // Call the service method
        List<LOB> resultList = lobService.findAll();
        // Assert the results are not null and verify the repository interaction
        assertNotNull(resultList);
        assertEquals(1, resultList.size());
        assertEquals(lob, resultList.get(0));
        verify(lobRepo, times(1)).findByActiveTrue();
    }

}
