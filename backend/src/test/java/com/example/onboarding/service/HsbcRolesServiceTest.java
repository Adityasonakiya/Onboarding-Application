package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.example.onboarding.model.HsbcRoles;
import com.example.onboarding.repository.HsbcRolesRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class HsbcRolesServiceTest {

    @Mock
    private HsbcRolesRepository hsbcRolesRepository;

    @InjectMocks
    private HsbcRolesService hsbcRolesService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetById_Found() {
        // Arrange
        HsbcRoles role = mock(HsbcRoles.class); // Use mock instead of setting fields
        when(hsbcRolesRepository.findById(1)).thenReturn(Optional.of(role));

        // Act
        HsbcRoles result = hsbcRolesService.getById(1);

        // Assert
        assertNotNull(result, "Result should not be null");
        verify(hsbcRolesRepository, times(1)).findById(1);
    }

    @Test
    void testGetById_NotFound() {
        // Arrange
        when(hsbcRolesRepository.findById(1)).thenReturn(Optional.empty());

        // Act
        HsbcRoles result = hsbcRolesService.getById(1);

        // Assert
        assertNull(result, "Result should be null when role is not found");
        verify(hsbcRolesRepository, times(1)).findById(1);
    }

    @Test
    void testGetAll() {
        // Arrange
        List<HsbcRoles> roles = Arrays.asList(mock(HsbcRoles.class), mock(HsbcRoles.class));
        when(hsbcRolesRepository.findAll()).thenReturn(roles);

        // Act
        List<HsbcRoles> result = hsbcRolesService.getAll();

        // Assert
        assertNotNull(result, "Result list should not be null");
        assertEquals(2, result.size(), "Result list size should match");
        verify(hsbcRolesRepository, times(1)).findAll();
    }

    @Test
    void testSearchRoles_WithQuery() {
        // Arrange
        String query = "Developer";
        List<HsbcRoles> roles = Arrays.asList(mock(HsbcRoles.class));
        when(hsbcRolesRepository.findByRoleTitleContainingIgnoreCase(query)).thenReturn(roles);

        // Act
        List<HsbcRoles> result = hsbcRolesService.searchRoles(query);

        // Assert
        assertNotNull(result, "Result list should not be null");
        assertEquals(1, result.size(), "Result list size should match");
        verify(hsbcRolesRepository, times(1)).findByRoleTitleContainingIgnoreCase(query);
    }

    @Test
    void testSearchRoles_EmptyQuery() {
        // Arrange
        List<HsbcRoles> roles = Arrays.asList(mock(HsbcRoles.class), mock(HsbcRoles.class));
        when(hsbcRolesRepository.findAll()).thenReturn(roles);

        // Act
        List<HsbcRoles> result = hsbcRolesService.searchRoles("");

        // Assert
        assertNotNull(result, "Result list should not be null");
        assertEquals(2, result.size(), "Result list size should match");
        verify(hsbcRolesRepository, times(1)).findAll();
    }
}
