package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.LOB;
import com.example.onboarding.service.LOBService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/users")
public class LOBController {
    @Autowired
    LOBService service;

    @GetMapping("/lob/{lobId}")
    public ResponseEntity<LOB> findLob(@PathVariable int lobId){
        LOB lob =  service.findById(lobId);
        if(lob!=null)
            return ResponseEntity.status(200).body(lob);
        return ResponseEntity.status(404).build();
    }
    @GetMapping("/lob")
    public ResponseEntity<List<LOB>> findAllLob(){
        List<LOB> lob =  service.findAll();
        if(!lob.isEmpty())
            return ResponseEntity.status(200).body(lob);
        return ResponseEntity.status(404).build();
    }
}
