package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.LOB;
import com.example.onboarding.service.LOBService;

@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class LOBController {
    @Autowired
    LOBService service;

    @GetMapping("/lob/{lobId}")
    public ResponseEntity<LOB> findLob(@PathVariable int lobId){
        LOB lob =  service.findById(lobId);
        System.out.println("lobId"+lobId);
        System.out.println(lob);
        if(lob!=null)
            return ResponseEntity.status(200).body(lob);
        return ResponseEntity.status(404).build();
    }
    @GetMapping("/lobs/active")
    public ResponseEntity<List<LOB>> findAllActiveLob(){
        List<LOB> lob =  service.findAllActive();
        if(!lob.isEmpty())
            return ResponseEntity.status(200).body(lob);
        return ResponseEntity.status(400).build();
    }

    @GetMapping("/lobs")
    public ResponseEntity<List<LOB>> findAllLob(){
        List<LOB> lob =  service.findAll();
        if(!lob.isEmpty())
            return ResponseEntity.status(200).body(lob);
        return ResponseEntity.status(400).build();
    }

    @PutMapping("/lobs/{lobId}/status")
    public ResponseEntity<LOB> updateLobStatus(@PathVariable int lobId) {
        LOB updatedLob = service.updateStatus(lobId);
        if (updatedLob != null) {
            return ResponseEntity.status(200).body(updatedLob);
        }
        return ResponseEntity.status(404).build();
    }

    @PutMapping("/lobs/{lobId}")
    public ResponseEntity<LOB> updateLob(@PathVariable int lobId, @RequestBody LOB lob){
        LOB updatedLob = service.updateLob(lobId, lob);
        if (updatedLob != null) {
            return ResponseEntity.status(200).body(updatedLob);
        }
        return ResponseEntity.status(404).build();
    }

    @GetMapping("lob/count/{lobId}")
    public ResponseEntity<Integer> getLobCount(@PathVariable int lobId) {
        Integer count = service.countByLob(lobId);
        if (count != null) {
            return ResponseEntity.status(200).body(count);
        }
        return ResponseEntity.status(404).build();
    }
}
