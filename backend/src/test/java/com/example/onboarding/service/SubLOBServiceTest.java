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

import com.example.onboarding.model.SubLOB;
import com.example.onboarding.repository.SubLOBRepository;

public class SubLOBServiceTest {

    private SubLOB subLob;

    @InjectMocks
    private SubLOBService sublobService;

    @Mock
    private SubLOBRepository sublobRepo;

    @BeforeEach
    public void setUp(){
        MockitoAnnotations.openMocks(this);
        subLob = new SubLOB();
        subLob.setSubLOBid(1);
    }

    @Test
    public void testFindById(){
        int sublobId = 1;
                when(sublobRepo.findById(sublobId)).thenReturn(Optional.of(subLob));

                SubLOB result = sublobService.findById(sublobId);
                assertNotNull(result);
                verify(sublobRepo , times(1)).findById(sublobId);
    }

    @Test
    public void testFindByLobId(){
        int lobId = 1;
         // Create a mock list and add an object to it
        List<SubLOB> list = new ArrayList<>();
        list.add(subLob);
        // Mock the repository call
        when(sublobRepo.findAllByLob_LobId(lobId)).thenReturn(list);
        // Call the service method
        List<SubLOB> resultList = sublobService.findByLobId(lobId);
        // Assert the results are not null and verify the repository interaction
        assertNotNull(resultList);
        assertEquals(1, resultList.size());
        assertEquals(subLob, resultList.get(0));
        verify(sublobRepo, times(1)).findAll();
    }

}
