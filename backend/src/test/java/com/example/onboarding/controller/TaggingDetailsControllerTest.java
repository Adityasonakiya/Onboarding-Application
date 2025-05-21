package com.example.onboarding.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.onboarding.model.TaggingDetails;
import com.example.onboarding.service.TaggingDetailsService;

@WebMvcTest(TaggingDetailsController.class)
public class TaggingDetailsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SuppressWarnings("removal")
    @MockBean
    private TaggingDetailsService taggingDetailsService;

    @Test
    public void testGetTaggingDetailsByPsId() throws Exception {
        int psId = 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.getTaggingDetailsByPsId(psId)).thenReturn(taggingDetails);

        mockMvc.perform(get("/api/tagging-details/psid/{psId}", psId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetTaggingDetailsByCandidateId() throws Exception {
        Long phoneNumber = (long) 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.getTaggingDetailsByCandidatePhoneNumber(phoneNumber)).thenReturn(taggingDetails);

        mockMvc.perform(get("/api/tagging-details/candidate/{phoneNumber}", phoneNumber))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetTaggingDetailsByVendorCandidateId() throws Exception {
        Long phoneNumber = (long) 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.getTaggingDetailsByVendorPhoneNumber(phoneNumber)).thenReturn(taggingDetails);

        mockMvc.perform(get("/api/tagging-details/vendor/{phoneNumber}", phoneNumber))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateTaggingDetailsByPsId() throws Exception {
        int psId = 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.updateTaggingDetailsByPsId(Mockito.eq(psId), Mockito.any(TaggingDetails.class)))
                .thenReturn(taggingDetails);

        mockMvc.perform(put("/api/tagging-details/psid/{psId}", psId)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"bgvStatus\": {\"bgvStatus\": \"In progress\"}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateTaggingDetailsByCandidateId() throws Exception {
        Long phoneNumber = (long) 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.updateTaggingDetailsByCandidatePhoneNumber(Mockito.eq(phoneNumber), Mockito.any(TaggingDetails.class)))
                .thenReturn(taggingDetails);

        mockMvc.perform(put("/api/tagging-details/candidate/{phoneNumber}", phoneNumber)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"bgvStatus\": {\"bgvStatus\": \"In progress\"}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateTaggingDetailsByVendorCandidateId() throws Exception {
        Long phoneNumber = (long) 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.updateTaggingDetailsByVendorPhoneNumber(Mockito.eq(phoneNumber), Mockito.any(TaggingDetails.class)))
                .thenReturn(taggingDetails);

        mockMvc.perform(put("/api/tagging-details/vendor-candidate/{phoneNumber}", phoneNumber)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"bgvStatus\": {\"bgvStatus\": \"In progress\"}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    public TaggingDetailsService getTaggingDetailsService() {
        return taggingDetailsService;
    }

    public void setTaggingDetailsService(TaggingDetailsService taggingDetailsService) {
        this.taggingDetailsService = taggingDetailsService;
    }
}
