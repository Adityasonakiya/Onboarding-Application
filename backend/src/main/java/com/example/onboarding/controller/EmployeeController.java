package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.AccessControlDTO;
import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.service.EmployeeService;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin("*")
// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employees")
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/{psid}")
    public ResponseEntity<Employee> getEmployeeByPsid(@PathVariable int psid) {
        Employee employee = employeeService.getEmployeeByPsid(psid);
        if (employee != null) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        if (employees != null) {
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // @GetMapping("/employee-candidates")
    // public ResponseEntity<List<EmployeeCandidateDTO>>
    // getEmployeeCandidates(@RequestParam Integer createdBy) {
    // List<EmployeeCandidateDTO> employeeCandidates =
    // employeeService.getEmployeeCandidates(createdBy);
    // return ResponseEntity.ok(employeeCandidates);
    // }
    // @GetMapping("/api/employee-candidates")
    // public Page<EmployeeCandidateDTO> getEmployeeCandidates(
    // @RequestParam Integer createdBy,
    // @RequestParam int page,
    // @RequestParam int size
    // ) {
    // return employeeService.getEmployeeCandidates(createdBy, page, size);
    // }

    @GetMapping("/api/employee-candidates/{id}")
    public ResponseEntity<EmployeeCandidateDTO> getEmployeeCandidateById(@PathVariable int id) {
        try {
            EmployeeCandidateDTO employeeCandidateDTO = employeeService.getEmployeeCandidateById(id);
            return ResponseEntity.ok(employeeCandidateDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    

    // @GetMapping("/api/candidate")
    // public ResponseEntity<EmployeeCandidateDTO> getCandidateByName(@RequestParam
    // String firstName,
    // @RequestParam String lastName) {
    // Optional<EmployeeCandidateDTO> candidate =
    // employeeService.findCandidateByName(firstName, lastName);
    // return candidate.map(ResponseEntity::ok).orElseGet(() ->
    // ResponseEntity.notFound().build());
    // }

    @GetMapping("/search")
    public ResponseEntity<List<EmployeeCandidateDTO>> searchById(@RequestParam int query) {
        List<EmployeeCandidateDTO> results = employeeService.searchById(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/onboarding-status")
    public ResponseEntity<List<EmployeeCandidateDTO>> getCandidatesByOnboardingStatus(
            @RequestParam("status") String onboardingStatus) {
        List<EmployeeCandidateDTO> candidates = employeeService.getCandidatesByOnboardingStatus(onboardingStatus);
        return ResponseEntity.ok(candidates);
    }

    @GetMapping("/bgv-status")
    public ResponseEntity<List<EmployeeCandidateDTO>> getCandidatesByBgvStatus(
            @RequestParam("status") String bgvStatus) {
        List<EmployeeCandidateDTO> candidates = employeeService.getCandidatesByBgvStatus(bgvStatus);
        return ResponseEntity.ok(candidates);
    }

    @PutMapping("/update/{psid}")
    public ResponseEntity<Employee> updateEmployeeRole(@PathVariable int psid, @RequestBody Employee employee) {
        try {
            Employee updatedEmployee = employeeService.updateEmployee(psid, employee);
            return ResponseEntity.ok(updatedEmployee);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/access/{psid}")
    public ResponseEntity<AccessControlDTO> getAccessControlByPsid(@PathVariable Integer psid) {
        AccessControlDTO accessControl = employeeService.getAccessControlByPsid(psid);
        if (accessControl != null) {
            return ResponseEntity.ok(accessControl);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
