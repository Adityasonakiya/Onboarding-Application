package com.example.onboarding.model;

import java.sql.Timestamp;
// import java.util.Optional;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer psid;

    @ManyToOne
    @JoinColumn(name = "roleId", nullable = false)
    private Roles roles;

    @Column(nullable = false)
    private String password;
    private Timestamp lastLogin;
    private Timestamp lastLogout;

    public User() {}


    public Integer getPsid() {
        return psid;
    }
    public void setPsid(Integer psid) {
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
    public Roles getRoles() {
        return roles;
    }
    public void setRoles(Roles roles) {
        this.roles = roles;
    }
    
    @Override
    public String toString() {
        return "TaggingDetails{" +
                "psid=" + psid +
                ", roles=" + roles +
                ", lastLogin=" + lastLogin +
                ", lastLogout=" + lastLogout +
                '}';
    }

}