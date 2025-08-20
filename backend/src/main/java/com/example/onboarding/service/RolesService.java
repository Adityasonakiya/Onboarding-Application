package com.example.onboarding.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.onboarding.model.Roles;
import com.example.onboarding.repository.EmployeeRepository;
import com.example.onboarding.repository.RolesRepository;

@Service
public class RolesService {
    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    // Define your service methods here
    public Roles createRole(Roles role) {
        return rolesRepository.save(role);
    }

    public List<Roles> getAllRoles() {
        return rolesRepository.findAll();
    }

    public Roles getRoleById(int id) {
        return rolesRepository.findById(id).orElse(null);
    }

    public Roles updateRole(int id, Roles role) {
        Roles r = rolesRepository.findById(id).orElse(null);
        System.out.println("Role Service point"+ r);
        if (r == null) {
            return null;    
        }
        else{
            r.setRoleName(role.getRoleName());
            r.setRoleFunctions(role.getRoleFunctions());
            return rolesRepository.save(r);
        }
    }

    public Integer countByRoleId(int roleId) {
        return employeeRepository.countByRoles_RoleId(roleId);
    }
}
