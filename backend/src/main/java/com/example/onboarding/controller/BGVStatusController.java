package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.BGVStatus;
import com.example.onboarding.service.BGVStatusService;

@CrossOrigin("*")
@RestController
public class BGVStatusController {
    @Autowired
    BGVStatusService bgvStatusService;

    @GetMapping("/Bgvs")
    public ResponseEntity<List<BGVStatus>> getAll(){
        List<BGVStatus> bgvs=bgvStatusService.getAllBgv();
        if(bgvs!=null)
            return new ResponseEntity<>(bgvs,HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
