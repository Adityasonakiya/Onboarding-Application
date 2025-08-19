package com.example.onboarding.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccessControlDTO {

    private Integer psid;
    private String roleName;
    private String lobName;

    private Long canViewDashboard;
    private Long canViewLandingPage;
    private Long canAccessAdminDashboard;
    private Long canAddSelection;
    private Long canUpdateSelection;
    private Long canAccessMasters;

    

    public AccessControlDTO(Integer psid, String roleName, String lobName, Long canViewDashboard,
            Long canViewLandingPage, Long canAccessAdminDashboard, Long canAddSelection,
            Long canUpdateSelection, Long canAccessMasters) {
        this.psid = psid;
        this.roleName = roleName;
        this.lobName = lobName;
        this.canViewDashboard = canViewDashboard;
        this.canViewLandingPage = canViewLandingPage;
        this.canAccessAdminDashboard = canAccessAdminDashboard;
        this.canAddSelection = canAddSelection;
        this.canUpdateSelection = canUpdateSelection;
        this.canAccessMasters = canAccessMasters;
    }

    // Optional: Convenience methods to convert to boolean
    public boolean isCanViewDashboard() {
        return canViewDashboard != null && canViewDashboard == 1;
    }

    public boolean isCanAccessAdminDashboard() {
        return canAccessAdminDashboard != null && canAccessAdminDashboard == 1;
    }

    public boolean isCanAddSelection() {
        return canAddSelection != null && canAddSelection == 1;
    }

    public boolean isCanUpdateSelection() {
        return canUpdateSelection != null && canUpdateSelection == 1;
    }

    public boolean isCanAccessMasters() {
        return canAccessMasters != null && canAccessMasters == 1;
    }

    public boolean isCanViewLandingPage() {
        return canViewLandingPage != null && canViewLandingPage == 1;
    }
}
