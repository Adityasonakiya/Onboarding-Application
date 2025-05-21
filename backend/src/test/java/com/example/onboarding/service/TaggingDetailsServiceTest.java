package com.example.onboarding.service;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.TaggingDetails;
import com.example.onboarding.repository.BGVStatusRepository;
import com.example.onboarding.repository.OnboardingStatusRepository;
import com.example.onboarding.repository.TaggingDetailsRepository;

public class TaggingDetailsServiceTest {

    @Mock
    private TaggingDetailsRepository taggingDetailsRepository;

    @Mock
    private OnboardingStatusRepository onboardingStatusRepository;

    @Mock
    private BGVStatusRepository bgvStatusRepository;

    @InjectMocks
    private TaggingDetailsService taggingDetailsService;

    private TaggingDetails taggingDetails;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        taggingDetails = new TaggingDetails();
        taggingDetails.setTagId(1);
        taggingDetails.setEmployee(new Employee(1));
    }

    @Test
    public void testGetTaggingDetailsByPsId() {
        int psId = 1;
        when(taggingDetailsRepository.findByEmployee_Psid(psId)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.getTaggingDetailsByPsId(psId);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByEmployee_Psid(psId);
    }

    @Test
    public void testGetTaggingDetailsByCandidateId() {
        Long phoneNumber = (long) 1;
        when(taggingDetailsRepository.findByCandidate_PhoneNumber(phoneNumber)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.getTaggingDetailsByCandidatePhoneNumber(phoneNumber);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByCandidate_PhoneNumber(phoneNumber);
    }

    @Test
    public void testGetTaggingDetailsByVendorCandidateId() {
        Long phoneNumber = (long) 1;
        when(taggingDetailsRepository.findByVendorCandidate_PhoneNumber(phoneNumber)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.getTaggingDetailsByVendorPhoneNumber(phoneNumber);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByVendorCandidate_PhoneNumber(phoneNumber);
    }

    @Test
    public void testUpdateTaggingDetailsByPsId() {
        int psId = 1;
        TaggingDetails updatedDetails = new TaggingDetails();
        when(taggingDetailsRepository.findByEmployee_Psid(psId)).thenReturn(taggingDetails);
        when(taggingDetailsRepository.save(taggingDetails)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.updateTaggingDetailsByPsId(psId, updatedDetails);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByEmployee_Psid(psId);
        verify(taggingDetailsRepository, times(1)).save(taggingDetails);
    }

    @Test
    public void testUpdateTaggingDetailsByCandidateId() {
        Long phoneNumber = (long) 1;
        TaggingDetails updatedDetails = new TaggingDetails();
        when(taggingDetailsRepository.findByCandidate_PhoneNumber(phoneNumber)).thenReturn(taggingDetails);
        when(taggingDetailsRepository.save(taggingDetails)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.updateTaggingDetailsByCandidatePhoneNumber(phoneNumber, updatedDetails);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByCandidate_PhoneNumber(phoneNumber);
        verify(taggingDetailsRepository, times(1)).save(taggingDetails);
    }

    @Test
    public void testUpdateTaggingDetailsByVendorCandidateId() {
        Long phoneNumber = (long) 1;
        TaggingDetails updatedDetails = new TaggingDetails();
        when(taggingDetailsRepository.findByVendorCandidate_PhoneNumber(phoneNumber)).thenReturn(taggingDetails);
        when(taggingDetailsRepository.save(taggingDetails)).thenReturn(taggingDetails);

        TaggingDetails result = taggingDetailsService.updateTaggingDetailsByVendorPhoneNumber(phoneNumber, updatedDetails);
        assertNotNull(result);
        verify(taggingDetailsRepository, times(1)).findByVendorCandidate_PhoneNumber(phoneNumber);
        verify(taggingDetailsRepository, times(1)).save(taggingDetails);
    }
}