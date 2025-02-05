package com.example.onboarding.model;

import java.security.Timestamp;
import java.util.Optional;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int psid;

    @ManyToOne
    @JoinColumn(name = "psid", referencedColumnName = "psId")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "roleId", referencedColumnName = "roleid")
    private Roles role;

    @ManyToOne
    @JoinColumn(name = "userManagerId", referencedColumnName = "psId")
    private Candidate userManager;
    @Column(nullable = false)
    private String password;
    private Timestamp lastLogin;
    private Timestamp lastLogout;
    
    public int getPsid() {
        return psid;
    }
    public void setPsid(int psid) {
        this.psid = psid;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Timestamp getLastLogin() {
        return lastLogin;
    }
    public void setLastLogin(Timestamp lastLogin) {
        this.lastLogin = lastLogin;
    }
    public Timestamp getLastLogout() {
        return lastLogout;
    }
    public void setLastLogout(Timestamp lastLogout) {
        this.lastLogout = lastLogout;
    }
    public Candidate getCandidate() {
        return candidate;
    }
    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }
    public Roles getRole() {
        return role;
    }
    public void setRole(Roles role) {
        this.role = role;
    }
    public Candidate getUserManager() {
        return userManager;
    }
    public void setUserManager(Candidate userManager) {
        this.userManager = userManager;
    }   
}