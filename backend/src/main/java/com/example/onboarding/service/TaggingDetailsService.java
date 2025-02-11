package com.example.onboarding.service;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.BGVStatus;
import com.example.onboarding.model.Candidate;
import com.example.onboarding.model.Employee;
import com.example.onboarding.model.OnboardingStatus;
import com.example.onboarding.model.TaggingDetails;
import com.example.onboarding.repository.BGVStatusRepository;
import com.example.onboarding.repository.OnboardingStatusRepository;
import com.example.onboarding.repository.TaggingDetailsRepository;

import jakarta.transaction.Transactional;

import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

@Service
public class TaggingDetailsService {
    private static final Logger logger = LoggerFactory.getLogger(TaggingDetailsService.class);

    @Autowired
    private TaggingDetailsRepository taggingDetailsRepository;

    @Autowired
    private OnboardingStatusRepository onboardingStatusRepository;

    @Autowired
    private BGVStatusRepository bgvStatusRepository;

    @Transactional
    public TaggingDetails updateTaggingDetailsByPsId(int psId, TaggingDetails updatedDetails) {
        try {
            logger.info("Updating TaggingDetails by PsId: {}", psId);
            logger.info("Received update details: {}", updatedDetails); // Log received details

            TaggingDetails existingDetails = taggingDetailsRepository.findByEmployee_Psid(psId);
            if (existingDetails != null) {
                logger.info("Existing details found for PsId: {}", psId);

                if (updatedDetails.getOnboardingStatus() != null) {
                    OnboardingStatus onboardingStatus = onboardingStatusRepository
                            .save(updatedDetails.getOnboardingStatus());
                    existingDetails.setOnboardingStatus(onboardingStatus);
                    logger.info("New onboarding status: {}", onboardingStatus);
                }

                if (updatedDetails.getBgvStatus() != null) {
                    BGVStatus bgvStatus = bgvStatusRepository.save(updatedDetails.getBgvStatus());
                    existingDetails.setBgvStatus(bgvStatus);
                    logger.info("New BGV status: {}", bgvStatus);
                }

                if (updatedDetails.getCreateDate() != null) {
                    existingDetails.setCreateDate(updatedDetails.getCreateDate());
                    logger.info("Set create date: {}", updatedDetails.getCreateDate());
                }

                if (updatedDetails.getUpdateDate() != null) {
                    existingDetails.setUpdateDate(updatedDetails.getUpdateDate());
                    logger.info("Set update date: {}", updatedDetails.getUpdateDate());
                }

                logger.info("Details after updating: {}", existingDetails);
                return taggingDetailsRepository.save(existingDetails);
            } else {
                logger.info("No existing details found for PsId: {}, creating new entry", psId);
                updatedDetails.setEmployee(new Employee(psId));

                if (updatedDetails.getOnboardingStatus() != null) {
                    OnboardingStatus onboardingStatus = onboardingStatusRepository
                            .save(updatedDetails.getOnboardingStatus());
                    updatedDetails.setOnboardingStatus(onboardingStatus);
                    updatedDetails.setStatusRemarks(onboardingStatus.getRemarks());
                    logger.info("New onboarding status: {}", onboardingStatus);
                }

                if (updatedDetails.getBgvStatus() != null) {
                    BGVStatus bgvStatus = bgvStatusRepository.save(updatedDetails.getBgvStatus());
                    updatedDetails.setBgvStatus(bgvStatus);
                    logger.info("New BGV status: {}", bgvStatus);
                }

                logger.info("New details created: {}", updatedDetails);
                return taggingDetailsRepository.save(updatedDetails);
            }
        } catch (Exception e) {
            logger.error("Error updating TaggingDetails by PsId", e);
            throw e; // Re-throw the exception after logging it
        }
    }

    public TaggingDetails updateTaggingDetailsByCandidateId(int candidateId, TaggingDetails updatedDetails) {
        try {
            logger.info("Updating TaggingDetails by CandidateId: {}", candidateId);
            TaggingDetails existingDetails = taggingDetailsRepository.findByCandidate_CandidateId(candidateId);
            if (existingDetails != null) {
                logger.info("Existing details found for CandidateId: {}", candidateId);
                if (updatedDetails.getOnboardingStatus() != null) {
                    OnboardingStatus onboardingStatus = onboardingStatusRepository
                            .save(updatedDetails.getOnboardingStatus());
                    existingDetails.setOnboardingStatus(onboardingStatus);
                    existingDetails.setStatusRemarks(onboardingStatus.getRemarks());
                }
                if (updatedDetails.getBgvStatus() != null) {
                    BGVStatus bgvStatus = bgvStatusRepository.save(updatedDetails.getBgvStatus());
                    existingDetails.setBgvStatus(bgvStatus);
                }
                existingDetails.setCreateDate(updatedDetails.getCreateDate());
                existingDetails.setUpdateDate(updatedDetails.getUpdateDate());
                return taggingDetailsRepository.save(existingDetails);
            } else {
                logger.info("No existing details found for CandidateId: {}, creating new entry", candidateId);
                updatedDetails.setCandidate(new Candidate(candidateId)); // Assuming Candidate class has a constructor
                                                                         // with candidateId
                if (updatedDetails.getOnboardingStatus() != null) {
                    OnboardingStatus onboardingStatus = onboardingStatusRepository
                            .save(updatedDetails.getOnboardingStatus());
                    updatedDetails.setOnboardingStatus(onboardingStatus);
                    updatedDetails.setStatusRemarks(onboardingStatus.getRemarks());
                }
                if (updatedDetails.getBgvStatus() != null) {
                    BGVStatus bgvStatus = bgvStatusRepository.save(updatedDetails.getBgvStatus());
                    updatedDetails.setBgvStatus(bgvStatus);
                }
                return taggingDetailsRepository.save(updatedDetails);
            }
        } catch (Exception e) {
            logger.error("Error updating TaggingDetails by CandidateId", e);
            throw e; // Re-throw the exception after logging it
        }
    }

    public TaggingDetails getTaggingDetailsByPsId(int psId) {
        return taggingDetailsRepository.findByEmployee_Psid(psId);
    }

    public TaggingDetails getTaggingDetailsByCandidateId(int candidateId) {
        return taggingDetailsRepository.findByCandidate_CandidateId(candidateId);
    }
}