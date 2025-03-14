package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.onboarding.model.Employee;
import com.example.onboarding.model.EmployeeCandidateDTO;
import com.example.onboarding.service.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/employees")
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
    public ResponseEntity<List<Employee>> getAllEmployees(){
        List<Employee> employees = employeeService.getAllEmployees();
        if (employees!=null) {
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/employee-candidates")
    public ResponseEntity<List<EmployeeCandidateDTO>> getEmployeeCandidates(@RequestParam Integer createdBy) {
        List<EmployeeCandidateDTO> employeeCandidates = employeeService.getEmployeeCandidates(createdBy);
        return ResponseEntity.ok(employeeCandidates);
    }
}

