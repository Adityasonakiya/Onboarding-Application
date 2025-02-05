package com.example.onboarding.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SubLOB {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subLOBid;

    @ManyToOne
    @JoinColumn(name = "lobId", referencedColumnName = "lob_id")
    private LOB lob;

    private int subLobName;

    @ManyToOne
    @JoinColumn(name = "createdBy", referencedColumnName = "s_id")
    private Candidate createdBy;

    @ManyToOne
    @JoinColumn(name = "updateBy", referencedColumnName = "id")
    private Candidate updateBy;

    private byte[] createDate;
    private byte[] updateDate;

    public int getSubLOBid() {
        return subLOBid;
    }
    public void setSubLOBid(int subLOBid) {
        this.subLOBid = subLOBid;
    }
    public int getSubLobName() {
        return subLobName;
    }
    public void setSubLobName(int subLobName) {
        this.subLobName = subLobName;
    }
    public byte[] getCreateDate() {
        return createDate;
    }
    public void setCreateDate(byte[] createDate) {
        this.createDate = createDate;
    }
    public byte[] getUpdateDate() {
        return updateDate;
    }
    public void setUpdateDate(byte[] updateDate) {
        this.updateDate = updateDate;
    }
    public LOB getLob() {
        return lob;
    }
    public void setLob(LOB lob) {
        this.lob = lob;
    }
    public Candidate getCreatedBy() {
        return createdBy;
    }
    public void setCreatedBy(Candidate createdBy) {
        this.createdBy = createdBy;
    }
    public Candidate getUpdateBy() {
        return updateBy;
    }
    public void setUpdateBy(Candidate updateBy) {
        this.updateBy = updateBy;
    }

    
}
