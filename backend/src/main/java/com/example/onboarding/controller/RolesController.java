package com.example.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.onboarding.model.Roles;
import com.example.onboarding.service.RolesService;

@CrossOrigin("*")
@RestController
@RequestMapping("/roles")
public class RolesController {
    @Autowired
    private RolesService rolesService;
    
    @GetMapping("/all")
    public ResponseEntity<List<Roles>> getAllRoles() {
        List<Roles> rolesList = rolesService.getAllRoles();
        if(rolesList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(rolesList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Roles> getRoleById(@PathVariable int id) {
        Roles role = rolesService.getRoleById(id);
        if(role == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(role);
    }

    @PostMapping("/create")
    public ResponseEntity<Roles> createRole(@RequestBody Roles role) {
        Roles createdRole = rolesService.createRole(role);
        if(role.getRoleName() == null && role.getRoleFunctions() == null) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.status(201).body(createdRole);
    }       

    @PutMapping("/update/{id}")
    public ResponseEntity<Roles> updateRole(@PathVariable int id, @RequestBody Roles role) {
        Roles updatedRole = rolesService.updateRole(id, role);
        if(role.getRoleName() == null && role.getRoleFunctions() == null) {
            return ResponseEntity.badRequest().build();
        }
        else if(updatedRole == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRole);
    }

    @GetMapping("/count/{roleId}")
    public ResponseEntity<Integer> countByRoleId(@PathVariable int roleId) {
        Integer count = rolesService.countByRoleId(roleId);
        if(count == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(count);
    }
}
 