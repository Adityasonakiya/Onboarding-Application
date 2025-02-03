package com.example.onboarding.model;

import java.security.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int psid;
 
    @Column(nullable = false)
    private int roleId;
 
    @Column(nullable = false)
    private String password;
 
    private Timestamp lastLogin;
    private Timestamp lastLogout;
    private int userManagerId;
    public User() {
    }
    public User(int psid, int roleId, String password, Timestamp lastLogin, Timestamp lastLogout, int userManagerId) {
        this.psid = psid;
        this.roleId = roleId;
        this.password = password;
        this.lastLogin = lastLogin;
        this.lastLogout = lastLogout;
        this.userManagerId = userManagerId;
    }
    public int getPsid() {
        return psid;
    }
    public void setPsid(int psid) {
        this.psid = psid;
    }
    public int getRoleId() {
        return roleId;
    }
    public void setRoleId(int roleId) {
        this.roleId = roleId;
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
    public int getUserManagerId() {
        return userManagerId;
    }
    public void setUserManagerId(int userManagerId) {
        this.userManagerId = userManagerId;
    }

    
}