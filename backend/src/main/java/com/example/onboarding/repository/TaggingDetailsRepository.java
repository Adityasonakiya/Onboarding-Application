package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.TaggingDetails;

@Repository
public interface TaggingDetailsRepository extends JpaRepository<TaggingDetails,Integer>{

}
