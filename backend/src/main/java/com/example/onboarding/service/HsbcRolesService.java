package com.example.onboarding.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.HsbcRoles;
import com.example.onboarding.repository.HsbcRolesRepository;

@Service
public class HsbcRolesService {

    @Autowired
    private HsbcRolesRepository hsbcRolesRepository;

    public HsbcRoles getById(int id){
        Optional<HsbcRoles> role = hsbcRolesRepository.findById(id);
        return role.orElse(null);
    }

    public List<HsbcRoles> getAll(){
        return hsbcRolesRepository.findAll();
    }

    public List<HsbcRoles> searchRoles(String query) {
        if (query == null || query.isEmpty()) {
            return getAll(); // Return all roles if query is empty
        } else {
            return hsbcRolesRepository.findByRoleTitleContainingIgnoreCase(query); // Filter by title
        }
    }

}
