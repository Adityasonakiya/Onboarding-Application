package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.SubLOB;
import com.example.onboarding.service.SubLOBService;
@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class SubLOBController {
    @Autowired
    SubLOBService subService;

    @GetMapping("/sublobs/{lobId}")
    public ResponseEntity<List<SubLOB>> findSubLob(@PathVariable int lobId){
        List<SubLOB> sublob =  subService.findByLobId(lobId);
        if(sublob.isEmpty())
            return ResponseEntity.status(404).build();
        return ResponseEntity.status(200).body(sublob);
    }
    @GetMapping("/sublob/{subLobId}")
    public ResponseEntity<SubLOB> findSubLobById(@PathVariable int subLobId){
        SubLOB sublob =  subService.findById(subLobId);
        System.out.println(subLobId);
        System.out.println("sublob"+sublob);
        if(sublob==null)
            return ResponseEntity.status(404).build();
        return ResponseEntity.status(200).body(sublob);
    }
}
