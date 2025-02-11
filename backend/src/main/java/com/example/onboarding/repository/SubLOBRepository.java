package com.example.onboarding.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.onboarding.model.SubLOB;
import java.util.List;

@Repository
public interface SubLOBRepository extends JpaRepository<SubLOB,Integer>{
    List<SubLOB> findAllByLob_LobId(int lobId);
}
