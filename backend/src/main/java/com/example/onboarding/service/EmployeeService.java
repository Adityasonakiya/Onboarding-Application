package com.example.onboarding.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Employee;
import com.example.onboarding.repository.EmployeeRepository;

@Service
public class EmployeeService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee getEmployeeByPsid(int psid) {
        Optional<Employee> employee = employeeRepository.findById(psid);
        return employee.orElse(null);
    }


}
