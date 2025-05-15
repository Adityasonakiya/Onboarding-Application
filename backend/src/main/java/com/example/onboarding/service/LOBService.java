package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.LOB;
import com.example.onboarding.repository.LOBRepository;

@Service
public class LOBService {
    @Autowired
    LOBRepository lobrepo;

    public LOB findById(int lobId) {
        Optional<LOB> lob = lobrepo.findById(lobId);
        return lob.orElse(null);
    }

    public List<LOB> findAll() {
        return lobrepo.findByActiveTrue();
    }

}
