package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roleid;
    private String roleName;
    private String roleFunctions;
    private int remarks;
    
    public int getRoleid() {
        return roleid;
    }
    public void setRoleid(int roleid) {
        this.roleid = roleid;
    }
    public String getRoleName() {
        return roleName;
    }
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
    public String getRoleFunctions() {
        return roleFunctions;
    }
    public void setRoleFunctions(String roleFunctions) {
        this.roleFunctions = roleFunctions;
    }
    public int getRemarks() {
        return remarks;
    }
    public void setRemarks(int remarks) {
        this.remarks = remarks;
    }

    
}
