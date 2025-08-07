package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.HsbcRoles;
import com.example.onboarding.service.HsbcRolesService;

@CrossOrigin("*")
@RestController
@RequestMapping("/hsbc-roles")
public class HsbcRolesController {

    @Autowired
    private HsbcRolesService hsbcRolesService;

    @GetMapping("/{ref}")
    public ResponseEntity<HsbcRoles> findById(@PathVariable int ref){
        HsbcRoles role = hsbcRolesService.getById(ref);
        if(role!=null)
            return ResponseEntity.status(500).build();
        return ResponseEntity.status(200).body(role);    
    }

    // @GetMapping
    // public ResponseEntity<List<HsbcRoles>> findAll(){
    //     List<HsbcRoles> roleList = hsbcRolesService.getAll();
    //     if(roleList.isEmpty())
    //         return ResponseEntity.status(500).build();
    //     return ResponseEntity.status(200).body(roleList);    
    // }

    @GetMapping
    public ResponseEntity<List<HsbcRoles>> searchRoles(@RequestParam(required = false) String query) {
        List<HsbcRoles> roles = hsbcRolesService.searchRoles(query);
        return ResponseEntity.ok(roles);
    }
}
