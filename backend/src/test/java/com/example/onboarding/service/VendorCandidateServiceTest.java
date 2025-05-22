package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.User;
import com.example.onboarding.model.Vendor;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.VendorCandidateRepository;
import com.example.onboarding.repository.VendorRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class VendorCandidateServiceTest {

    @InjectMocks
    private VendorCandidateService vendorCandidateService;

    @Mock
    private VendorRepository vendorRepository;

    @Mock
    private VendorCandidateRepository vendorCandidateRepository;

    @Mock
    private UserService userService;

    @Mock
    private EmployeeRepository employeeRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetVendorCandidateById_Found() {
        VendorCandidate candidate = new VendorCandidate();
        when(vendorCandidateRepository.findByPhoneNumber(1234567890L)).thenReturn(Optional.of(candidate));

        VendorCandidate result = vendorCandidateService.getVendorCandidateById(1234567890L);

        assertEquals(candidate, result);
        verify(vendorCandidateRepository, times(1)).findByPhoneNumber(1234567890L);
    }

    @Test
    public void testGetVendorCandidateById_NotFound() {
        when(vendorCandidateRepository.findByPhoneNumber(1234567890L)).thenReturn(Optional.empty());

        VendorCandidate result = vendorCandidateService.getVendorCandidateById(1234567890L);

        assertNull(result);
        verify(vendorCandidateRepository, times(1)).findByPhoneNumber(1234567890L);
    }

    @Test
    public void testGetAllVendorCandidates() {
        List<VendorCandidate> candidates = Arrays.asList(new VendorCandidate());
        when(vendorCandidateRepository.findAll()).thenReturn(candidates);

        List<VendorCandidate> result = vendorCandidateService.getAllVendorCandidates();

        assertEquals(candidates, result);
        verify(vendorCandidateRepository, times(1)).findAll();
    }

    @Test
    public void testGetVendorById_Found() {
        Vendor vendor = new Vendor();
        when(vendorRepository.findById(1)).thenReturn(Optional.of(vendor));

        Vendor result = vendorCandidateService.getVendorById(1);

        assertEquals(vendor, result);
        verify(vendorRepository, times(1)).findById(1);
    }

    @Test
    public void testGetVendorById_NotFound() {
        when(vendorRepository.findById(1)).thenReturn(Optional.empty());

        Vendor result = vendorCandidateService.getVendorById(1);

        assertNull(result);
        verify(vendorRepository, times(1)).findById(1);
    }

    @Test
    public void testGetAllVendors() {
        List<Vendor> vendors = Arrays.asList(new Vendor());
        when(vendorRepository.findAll()).thenReturn(vendors);

        List<Vendor> result = vendorCandidateService.getAllVendors();

        assertEquals(vendors, result);
        verify(vendorRepository, times(1)).findAll();
    }

    @Test
public void testCreateVendorCandidate() {
    VendorCandidate input = new VendorCandidate();
    VendorCandidate saved = new VendorCandidate();
    User user = new User(); // Assuming User is the correct type
    user.setPsid(12345); // Set the Psid for the User object

    Employee employee = new Employee();
    employee.setPsid(12345); // Set the Psid for the Employee object

    // Mock the loggedUser() method to return a User object
    when(userService.loggedUser()).thenReturn(user);

    // Mock the employeeRepository to return an Employee object
    when(employeeRepository.findById(12345)).thenReturn(Optional.of(employee));

    // Mock the save method to return the saved VendorCandidate
    when(vendorCandidateRepository.save(input)).thenReturn(saved);

    // Call the service method
    VendorCandidate result = vendorCandidateService.createVendorCandidate(input);

    // Verify the result and interactions
    assertEquals(saved, result);
    verify(vendorCandidateRepository, times(1)).save(input);
    verify(employeeRepository, times(2)).findById(12345);
}
}