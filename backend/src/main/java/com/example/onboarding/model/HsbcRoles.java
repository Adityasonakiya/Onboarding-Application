package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class HsbcRoles{

    @Id    
    private int ref;             // Unique identifier for the role
    private String name;         // Name or country
    private String roleTitle;    // Role title with grade equivalent
    private int grade;           // Grade as an integer
    
    // Default Constructor
    public HsbcRoles() {}
    
    // Parameterized Constructor
    public HsbcRoles(int ref, String name, String roleTitle, int grade) {
        this.ref = ref;
        this.name = name;
        this.roleTitle = roleTitle;
        this.grade = grade;
    }
    
    // Getters and Setters
    public int getRef() {
        return ref;
    }
    
    public void setRef(int ref) {
        this.ref = ref;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getRoleTitle() {
        return roleTitle;
    }
    
    public void setRoleTitle(String roleTitle) {
        this.roleTitle = roleTitle;
    }
    
    public int getGrade() {
        return grade;
    }
    
    public void setGrade(int grade) {
        this.grade = grade;
    }
    
    @Override
    public String toString() {
        return "HsbcRoles{" +
                   "ref=" + ref +
                   ", name='" + name + '\'' +
                   ", roleTitle='" + roleTitle + '\'' +
                   ", grade=" + grade +
                   '}';
    }     
}
