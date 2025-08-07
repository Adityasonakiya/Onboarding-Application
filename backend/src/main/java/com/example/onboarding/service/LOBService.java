package com.example.onboarding.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.LOB;
import com.example.onboarding.repository.LOBRepository;
import com.example.onboarding.repository.SelectionDetailsRepository;

@Service
public class LOBService {
    @Autowired
    LOBRepository lobrepo;

    @Autowired
    SelectionDetailsRepository selectionDetailsRepository;

    public LOB findById(int lobId) {
        Optional<LOB> lob = lobrepo.findById(lobId);
        return lob.orElse(null);
    }

    public List<LOB> findAllActive() {
        return lobrepo.findByActiveTrue();
    }

    public List<LOB> findAll() {
        return lobrepo.findAll();
    }

    public LOB updateStatus(int lobId) {
        Optional<LOB> lob = lobrepo.findById(lobId);
        if (lob.isPresent()) {
            LOB existingLob = lob.get();
            existingLob.setActive(!existingLob.getActive());
            return lobrepo.save(existingLob);
        }
        return null;
    }

    public LOB updateLob(int lobId,LOB lob){
        LOB existingLob = lobrepo.findById(lobId).get();
        if (existingLob != null) {
            existingLob.setLobName(lob.getLobName());
            existingLob.setDeliveryManager(lob.getDeliveryManager());
            existingLob.setSalesPOC(lob.getSalesPOC());
            existingLob.setHSBCHead(lob.getHSBCHead());
            return lobrepo.save(existingLob);
        }
        return null;
    }

    public Integer countByLob(int lobId){
        return selectionDetailsRepository.countByLob_LobId(lobId);
    }

}
