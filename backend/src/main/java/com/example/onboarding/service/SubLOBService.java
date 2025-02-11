package com.example.onboarding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.onboarding.model.SubLOB;
import com.example.onboarding.repository.LOBRepository;
import com.example.onboarding.repository.SubLOBRepository;

@Service
public class SubLOBService {
    @Autowired
    SubLOBRepository sublobRepo;
    @Autowired
    LOBRepository lobRepo;

    public List<SubLOB> findByLobId(int lobId){
        return sublobRepo.findAllByLob_LobId(lobId);
    }
}
