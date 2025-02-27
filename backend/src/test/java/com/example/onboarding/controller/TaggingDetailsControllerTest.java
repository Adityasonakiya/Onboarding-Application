package com.example.onboarding.controller;

import com.example.onboarding.model.TaggingDetails;
import com.example.onboarding.service.TaggingDetailsService;
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

@WebMvcTest(TaggingDetailsController.class)
public class TaggingDetailsControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
        int candidateId = 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.getTaggingDetailsByCandidateId(candidateId)).thenReturn(taggingDetails);

        mockMvc.perform(get("/api/tagging-details/candidate/{candidateId}", candidateId))
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
        int candidateId = 1;
        TaggingDetails taggingDetails = new TaggingDetails();
        Mockito.when(taggingDetailsService.updateTaggingDetailsByCandidateId(Mockito.eq(candidateId), Mockito.any(TaggingDetails.class)))
                .thenReturn(taggingDetails);

        mockMvc.perform(put("/api/tagging-details/candidate/{candidateId}", candidateId)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"bgvStatus\": {\"bgvStatus\": \"In progress\"}}"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}