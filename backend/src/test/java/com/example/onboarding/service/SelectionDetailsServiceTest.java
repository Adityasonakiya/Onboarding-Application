package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.example.onboarding.model.AwaitedCasesDTO;
import com.example.onboarding.model.CtoolDto;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.model.ExcelDataDTO;
import com.example.onboarding.model.HsbcRoles;
import com.example.onboarding.model.SelectionDTO;
import com.example.onboarding.model.SelectionDetails;
import com.example.onboarding.model.User;
import com.example.onboarding.model.VendorCandidate;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.SelectionDetailsRepository;
import com.example.onboarding.repository.VendorCandidateRepository;

public class SelectionDetailsServiceTest {

    @Mock
    private SelectionDetailsRepository selectionDetailsRepository;

    @Mock
    private UserService userService;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private TaggingDetailsService taggingDetailsService;

    @Mock
    private VendorCandidateRepository vendorCandidateRepository;

    @InjectMocks
    private SelectionDetailsService selectionDetailsService;

    private SelectionDetails selectionDetails;

    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        selectionDetails = new SelectionDetails();
        selectionDetails.setSelectionId(1);
        selectionDetails.setEmployee(new Employee(1));
    }

    @Test
    public void testGetSelectionDetailsByPsid() {
        int psid = 1;
        when(selectionDetailsRepository.findSelectionDetailsByPsId(psid)).thenReturn(selectionDetails);

        SelectionDetails result = selectionDetailsService.getSelectionDetailsByPsid(psid);
        assertNotNull(result);
        assertEquals(selectionDetails, result);
        verify(selectionDetailsRepository, times(1)).findSelectionDetailsByPsId(psid);
    }

    @Test
    public void testGetSelectionDetailsByCandidatePhoneNumber() {
        Long phone = 1234567890L;
        when(selectionDetailsRepository.findByCandidate_PhoneNumber(phone)).thenReturn(selectionDetails);

        SelectionDetails result = selectionDetailsService.getSelectionDetailsByCandidatePhoneNumber(phone);
        assertNotNull(result);
        assertEquals(selectionDetails, result);
        verify(selectionDetailsRepository, times(1)).findByCandidate_PhoneNumber(phone);
    }

    @Test
    public void testGetSelectionDetailsByVendorCandidatePhoneNumber() {
        Long phone = 1234567890L;
        when(selectionDetailsRepository.findByVendorCandidate_PhoneNumber(phone)).thenReturn(selectionDetails);

        SelectionDetails result = selectionDetailsService.getSelectionDetailsByVendorCandidatePhoneNumber(phone);
        assertNotNull(result);
        assertEquals(selectionDetails, result);
        verify(selectionDetailsRepository, times(1)).findByVendorCandidate_PhoneNumber(phone);
    }

    @Test
    public void testUpdateSelectionDetailsByPsId_Existing() {
        int psid = 1;

        SelectionDetails updatedDetails = new SelectionDetails();

        updatedDetails.setSelectionId(1);
        updatedDetails.setEmployee(new Employee(1));
        updatedDetails.setLob(null);
        updatedDetails.setSubLob(null);
        // Fix: Set a non-null HsbcRoles object
        HsbcRoles hsbcRoles = new HsbcRoles();
        hsbcRoles.setGrade(7); // or any grade you want
        updatedDetails.setHsbcRoles(hsbcRoles);

        user = new User();
        user.setPsid(1);

        when(selectionDetailsRepository.findSelectionDetailsByPsId(psid)).thenReturn(selectionDetails);
        when(userService.loggedUser()).thenReturn(user);
        when(employeeRepository.findById(anyInt())).thenReturn(Optional.of(new Employee(1)));
        when(selectionDetailsRepository.save(any(SelectionDetails.class))).thenReturn(selectionDetails);

        SelectionDetails result = selectionDetailsService.updateSelectionDetailsByPsId(psid, updatedDetails);
        assertNotNull(result);
        verify(selectionDetailsRepository, times(1)).findSelectionDetailsByPsId(psid);
        verify(selectionDetailsRepository, times(1)).save(any(SelectionDetails.class));
    }

    @Test
    public void testUpdateSelectionDetailsByPsId_NotExisting() {
        int psid = 2;
        SelectionDetails updatedDetails = new SelectionDetails();
        updatedDetails.setSelectionId(2);

        when(selectionDetailsRepository.findSelectionDetailsByPsId(psid)).thenReturn(null);
        when(selectionDetailsRepository.save(updatedDetails)).thenReturn(updatedDetails);

        SelectionDetails result = selectionDetailsService.updateSelectionDetailsByPsId(psid, updatedDetails);
        assertNotNull(result);
        assertEquals(updatedDetails, result);
        verify(selectionDetailsRepository, times(1)).findSelectionDetailsByPsId(psid);
        verify(selectionDetailsRepository, times(1)).save(updatedDetails);
    }

    @Test
    public void testUpdateSelectionDetailsByCandidatePhoneNumber_Existing() {
        Long phone = 1234567890L;
        SelectionDetails updatedDetails = new SelectionDetails();
        updatedDetails.setSelectionId(1);
        // Fix: Set a non-null HsbcRoles object
        HsbcRoles hsbcRoles = new HsbcRoles();
        hsbcRoles.setGrade(7); // or any grade you want
        updatedDetails.setHsbcRoles(hsbcRoles);

        user = new User();
        user.setPsid(1);

        when(selectionDetailsRepository.findByCandidate_PhoneNumber(phone)).thenReturn(selectionDetails);
        when(userService.loggedUser()).thenReturn(user);
        when(employeeRepository.findById(anyInt())).thenReturn(Optional.of(new Employee(1)));
        when(selectionDetailsRepository.save(any(SelectionDetails.class))).thenReturn(selectionDetails);

        SelectionDetails result = selectionDetailsService.updateSelectionDetailsByCandidatePhoneNumber(phone, updatedDetails);
        assertNotNull(result);
        verify(selectionDetailsRepository, times(1)).findByCandidate_PhoneNumber(phone);
        verify(selectionDetailsRepository, times(1)).save(any(SelectionDetails.class));
    }

    @Test
    public void testUpdateSelectionDetailsByCandidatePhoneNumber_NotExisting() {
        Long phone = 1234567890L;
        SelectionDetails updatedDetails = new SelectionDetails();

        when(selectionDetailsRepository.findByCandidate_PhoneNumber(phone)).thenReturn(null);
        when(selectionDetailsRepository.save(updatedDetails)).thenReturn(updatedDetails);

        SelectionDetails result = selectionDetailsService.updateSelectionDetailsByCandidatePhoneNumber(phone, updatedDetails);
        assertNotNull(result);
        assertEquals(updatedDetails, result);
        verify(selectionDetailsRepository, times(1)).findByCandidate_PhoneNumber(phone);
        verify(selectionDetailsRepository, times(1)).save(updatedDetails);
    }

    @Test
    public void testUpdateSelectionDetailsByVendorCandidatePhoneNumber_Existing() {
        Long phone = 1234567890L;
        SelectionDetails updatedDetails = new SelectionDetails();
        updatedDetails.setSelectionId(1);
        // Fix: Set a non-null HsbcRoles object
        HsbcRoles hsbcRoles = new HsbcRoles();
        hsbcRoles.setGrade(7); // or any grade you want
        updatedDetails.setHsbcRoles(hsbcRoles);

        user = new User();
        user.setPsid(1);

        when(selectionDetailsRepository.findByVendorCandidate_PhoneNumber(phone)).thenReturn(selectionDetails);
        when(userService.loggedUser()).thenReturn(user);
        when(employeeRepository.findById(anyInt())).thenReturn(Optional.of(new Employee(1)));
        when(selectionDetailsRepository.save(any(SelectionDetails.class))).thenReturn(selectionDetails);

        SelectionDetails result = selectionDetailsService.updateSelectionDetailsByVendorCandidatePhoneNumber(phone, updatedDetails);
        assertNotNull(result);
        verify(selectionDetailsRepository, times(1)).findByVendorCandidate_PhoneNumber(phone);
        verify(selectionDetailsRepository, times(1)).save(any(SelectionDetails.class));
    }

    @Test
    public void testUpdateSelectionDetailsByVendorCandidatePhoneNumber_NotExisting() {
        Long phone = 1234567890L;
        SelectionDetails updatedDetails = new SelectionDetails();

        when(selectionDetailsRepository.findByVendorCandidate_PhoneNumber(phone)).thenReturn(null);
        when(selectionDetailsRepository.save(updatedDetails)).thenReturn(updatedDetails);

        SelectionDetails result = selectionDetailsService.updateSelectionDetailsByVendorCandidatePhoneNumber(phone, updatedDetails);
        assertNotNull(result);
        assertEquals(updatedDetails, result);
        verify(selectionDetailsRepository, times(1)).findByVendorCandidate_PhoneNumber(phone);
        verify(selectionDetailsRepository, times(1)).save(updatedDetails);
    }

    @Test
    public void testCreateSelectionDetails_Employee_New() {
        SelectionDetails details = new SelectionDetails();
        Employee emp = new Employee(1);
        details.setEmployee(emp);
        user = new User();
        user.setPsid(1);

        when(selectionDetailsRepository.existsByEmployee_Psid(1)).thenReturn(false);
        when(userService.loggedUser()).thenReturn(user);
        when(employeeRepository.findById(1)).thenReturn(Optional.of(emp));
        when(selectionDetailsRepository.save(details)).thenReturn(details);

        SelectionDetails result = selectionDetailsService.createSelectionDetails_Employee(details);
        assertNotNull(result);
        verify(selectionDetailsRepository, times(1)).save(details);
    }

    @Test
    public void testCreateSelectionDetails_Candidate_New() {
        SelectionDetails details = new SelectionDetails();
        com.example.onboarding.model.Candidate candidate = new com.example.onboarding.model.Candidate();
        candidate.setPhoneNumber(1234567890L);
        details.setCandidate(candidate);
        user = new User();
        user.setPsid(1);

        when(selectionDetailsRepository.existsByCandidate_PhoneNumber(1234567890L)).thenReturn(false);
        when(userService.loggedUser()).thenReturn(user);
        when(employeeRepository.findById(1)).thenReturn(Optional.of(new Employee(1)));
        when(selectionDetailsRepository.save(details)).thenReturn(details);

        SelectionDetails result = selectionDetailsService.createSelectionDetails_Candidate(details);
        assertNotNull(result);
        verify(selectionDetailsRepository, times(1)).save(details);
    }

    @Test
    public void testCreateSelectionDetails_VendorCandidate_New() {
        SelectionDetails details = new SelectionDetails();
        VendorCandidate vendorCandidate = new VendorCandidate();
        vendorCandidate.setVendorCandidateId(1);
        details.setVendorCandidate(vendorCandidate);
        user = new User();
        user.setPsid(1);

        when(vendorCandidateRepository.findById(1)).thenReturn(Optional.of(vendorCandidate));
        when(userService.loggedUser()).thenReturn(user);
        when(employeeRepository.findById(1)).thenReturn(Optional.of(new Employee(1)));
        when(selectionDetailsRepository.save(details)).thenReturn(details);

        SelectionDetails result = selectionDetailsService.createSelectionDetails_VendorCandidate(details);
        assertNotNull(result);
        verify(selectionDetailsRepository, times(1)).save(details);
    }

    @Test
    public void testGetEmployeeCandidates() {
        Integer createdBy = 1;
        int page = 0;
        int size = 2;
        List<EmployeeCandidateDTO> dtoList = Arrays.asList(new EmployeeCandidateDTO(), new EmployeeCandidateDTO());
        Page<EmployeeCandidateDTO> pageResult = new PageImpl<>(dtoList, PageRequest.of(page, size), dtoList.size());

        when(selectionDetailsRepository.findEmployeeCandidates(eq(createdBy), any(PageRequest.class)))
                .thenReturn(pageResult);

        Page<EmployeeCandidateDTO> result = selectionDetailsService.getEmployeeCandidates(createdBy, page, size);

        assertNotNull(result);
        assertEquals(2, result.getContent().size());
        verify(selectionDetailsRepository, times(1))
                .findEmployeeCandidates(eq(createdBy), any(PageRequest.class));
    }

    @Test
    public void testFindSelections() {
        String filter = "test";
        List<SelectionDTO> selectionList = Arrays.asList(new SelectionDTO(), new SelectionDTO());
        when(selectionDetailsRepository.findSelections(filter)).thenReturn(selectionList);

        List<SelectionDTO> result = selectionDetailsService.findSelections(filter);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(selectionDetailsRepository, times(1)).findSelections(filter);
    }

    @Test
    public void testFindAwaitedCases() {
        String filter = "awaited";
        List<AwaitedCasesDTO> awaitedList = Arrays.asList(new AwaitedCasesDTO(), new AwaitedCasesDTO());
        when(selectionDetailsRepository.findAwaitedCases(filter)).thenReturn(awaitedList);

        List<AwaitedCasesDTO> result = selectionDetailsService.findAwaitedCases(filter);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(selectionDetailsRepository, times(1)).findAwaitedCases(filter);
    }

    @Test
    public void testFindCtool() {
        String filter = "ctool";
        List<CtoolDto> ctoolList = Arrays.asList(new CtoolDto(), new CtoolDto());
        when(selectionDetailsRepository.findCtool(filter)).thenReturn(ctoolList);

        List<CtoolDto> result = selectionDetailsService.findCtool(filter);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(selectionDetailsRepository, times(1)).findCtool(filter);
    }

    @Test
    public void testFindExcelData() {
        Integer createdBy = 1;
        List<ExcelDataDTO> excelList = Arrays.asList(new ExcelDataDTO(), new ExcelDataDTO());
        when(selectionDetailsRepository.findCustomQueryResults(createdBy)).thenReturn(excelList);

        List<ExcelDataDTO> result = selectionDetailsService.findExcelData(createdBy);

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(selectionDetailsRepository, times(2)).findCustomQueryResults(createdBy); // called twice in method
    }

}
