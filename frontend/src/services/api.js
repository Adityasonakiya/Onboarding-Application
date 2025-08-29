export const rolePermissions = async(psid) => {
  const response = await fetch(`http://localhost:8080/employees/access/${psid}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch role permissions");
};

export const getEmployeeByPsid = async (psid) => {
  const response = await fetch(`http://localhost:8080/employees/${psid}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch employee data");
};

export const getEmployeeCandidateByPsid = async (psid) => {
  const response = await fetch(
    `http://localhost:8080/employees/api/employee-candidates/${psid}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch employee data");
};

export const getCandidateByPhoneNumber = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/candidates/phoneNumber/${phoneNumber}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidate by phone number");
};

export const getEmployeeCandidateByCandidateId = async (candidateId) => {
  const response = await fetch(
    `http://localhost:8080/candidates/api/employee-candidates/${candidateId}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidate data");
};

export const getAllEmployees = async (psid) => {
  const response = await fetch(`http://localhost:8080/employees`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch employees data");
};

export const updateEmployee = async (psid, data) => {
  const response = await fetch(`http://localhost:8080/employees/update/${psid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getCToolStatuses = async () => {
  const response = await fetch(`http://localhost:8080/OnboardingStatuses`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch employees data");
};

export const getBgvStatuses = async () => {
  const response = await fetch(`http://localhost:8080/Bgvs`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch employees data");
};

export const getAllCandidates = async (psid) => {
  const response = await fetch(`http://localhost:8080/candidates`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidates data");
};

export const getCandidateById = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/candidates/${phoneNumber}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidate data");
};

export const getVendorById = async (vendorId) => {
  const response = await fetch(`http://localhost:8080/vendors/${vendorId}`);
  if (response.ok) {
    const data = await response.json();
    console.log("API Response:", data); // Log the response
    return data;
  }
  throw new Error("Failed to fetch data");
};

export const getAllVendors = async () => {
  const response = await fetch(`http://localhost:8080/vendors`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};

export const getVendorCandidateById = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/vendors/vendor-candidates/${phoneNumber}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};

export const getAllVendorCandidates = async () => {
  const response = await fetch(
    `http://localhost:8080/vendors/vendor-candidates`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};

export const createVendorCandidates = async (data) => {
  const response = await fetch(
    `http://localhost:8080/vendors/vendor-candidates/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getSelectionDetailsByPsId = async (psid) => {
  const response = await fetch(
    `http://localhost:8080/selection-details/psid/${psid}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch selection details by psid");
};

export const getSelectionDetailsByCandidateId = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/selection-details/candidateId/${phoneNumber}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch selection details by candidateId");
};

export const getSelectionDetailsByVendorCandidateId = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/selection-details/vendorCandidateId/${phoneNumber}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch selection details by vendor candidateId");
};

export const getTaggingDetailsByPsId = async (psId) => {
  const response = await fetch(
    `http://localhost:8080/api/tagging-details/psid/${psId}`
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed to fetch tagging details by psId");
};

export const getTaggingDetailsByCandidateId = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/api/tagging-details/candidate/${phoneNumber}`
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed to fetch tagging details by candidateId");
};

export const getTaggingDetailsByVendorCandidateId = async (phoneNumber) => {
  const response = await fetch(
    `http://localhost:8080/api/tagging-details/vendor/${phoneNumber}`
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed to fetch tagging details by candidateId");
};

export const updateTaggingDetailsByPsId = async (psId, data) => {
  const response = await fetch(
    `http://localhost:8080/api/tagging-details/psid/${psId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateTaggingDetailsByCandidateId = async (phoneNumber, data) => {
  const response = await fetch(
    `http://localhost:8080/api/tagging-details/candidate/${phoneNumber}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateTaggingDetailsByVendorCandidateId = async (
  phoneNumber,
  data
) => {
  const response = await fetch(
    `http://localhost:8080/api/tagging-details/vendor-candidate/${phoneNumber}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateSelectionDetailsByPsId = async (psId, data) => {
  const response = await fetch(
    `http://localhost:8080/selection-details/put/psid/${psId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateSelectionDetailsByCandidateId = async (
  phoneNumber,
  data
) => {
  const response = await fetch(
    `http://localhost:8080/selection-details/put/candidateId/${phoneNumber}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const updateSelectionDetailsByVendorCandidateId = async (
  phoneNumber,
  data
) => {
  const response = await fetch(
    `http://localhost:8080/selection-details/put/vendorCandidateId/${phoneNumber}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchLobs = async () => {
  const response = await fetch("http://localhost:8080/users/lobs/active");
  if (!response.ok) {
    throw new Error("Failed to fetch LOBs");
  }
  return response.json();
};

export const fetchAllLobs = async () => {
  const response = await fetch("http://localhost:8080/users/lobs");
  if (!response.ok) {
    throw new Error("Failed to fetch all LOBs");
  }
  return response.json();
};

export const fetchLob = async (lobId) => {
  const response = await fetch("http://localhost:8080/users/lob/" + lobId);
  if (!response.ok) {
    throw new Error("Failed to fetch lob");
  }
  return response.json();
};

export const fetchSubLobs = async (lobId) => {
  const response = await fetch(`http://localhost:8080/users/sublobs/${lobId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch SubLOBs");
  }
  return response.json();
};

export const fetchSubLob = async (subLobId) => {
  const response = await fetch(
    `http://localhost:8080/users/sublob/${subLobId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sublob by Id");
  }
  return response.json();
};

export const changeLobStatus = async (lobId) => {
  const response = await fetch(`http://localhost:8080/users/lobs/${lobId}/status`, {
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error("Failed to change LOB status");
  }
  return response.json();
};

export const updateLob = async(lobId,data) =>{
  const response = await fetch(`http://localhost:8080/users/lobs/${lobId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update LOB");
  }
  return response.json();
}

export const countByLob = async(lobId) =>{
  const response = await fetch(`http://localhost:8080/users/lob/count/${lobId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch LOB count");
}

export const fetchEmployeeCandidatesBySelections = async (
  loggedInPsid,
  page = 0,
  size = 5
) => {
  const validPage = Math.max(0, page);
  const response = await fetch(
    `http://localhost:8080/selection-details/api/employee-candidates?loggedInPsid=${loggedInPsid}&page=${validPage}&size=${size}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch employee candidates");
  }
  return response.json();
};

export const getEmployeeCandidateByCtool = async (ctool) => {
  const response = await fetch(
    `http://localhost:8080/employees/onboarding-status?status=${ctool}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch Employees by Ctool");
};

export const getEmployeeCandidateByBgv = async (bgv) => {
  const response = await fetch(
    `http://localhost:8080/employees/bgv-status?status=${bgv}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch Employees by Bgv");
};

export const getHsbcRoles = async () => {
  const response = await fetch(
    `http://localhost:8080/hsbc-roles`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch HSBC roles");
};

export const getHsbcRolesById = async (ref) => {
  const response = await fetch(
    `http://localhost:8080/hsbc-roles/${ref}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch HSBC roles");
};

export const getEvidenceBySelectionId = async (selectionId) => {
  const response = await fetch(
    `http://localhost:8080/evidence/selectionId/${selectionId}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch Evidence");
};

export const createVendor = async (data) => {
  const response = await fetch(`http://localhost:8080/vendors/create-vendor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const changeVendorStatus = async (vendorId) => {
  const response = await fetch(`http://localhost:8080/vendors/status/${vendorId}`, {
    method: "PUT",
  });
  
if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json(); // parse JSON instead of text
  return data;
};

export const editVendor = async (vendorId, data) => {
  const response = await fetch(`http://localhost:8080/vendors/update-vendor/${vendorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const countVendorCandidates = async(vendorId) =>{
  const response = await fetch(`http://localhost:8080/vendors/vendor-candidates/count/${vendorId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch vendor candidates count");
}

export const createRole = async(data) =>{
  const response = await fetch(`http://localhost:8080/roles/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const getRoleById = async(id)=>{
  const response = await fetch(`http://localhost:8080/roles/${id}`)
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch role");
}

export const getAllRoles = async() =>{
  const response = await fetch(`http://localhost:8080/roles/all`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch roles");
}

export const updateRole = async(roleId,data) =>{
   const response = await fetch(`http://localhost:8080/roles/update/${roleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export const countByRoles = async(roleId) =>{
  const response = await fetch(`http://localhost:8080/roles/count/${roleId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch role count");
}


export const searchCandidatesByClientName = async (hsbchiringManager) => {
  const response = await fetch(
    `http://localhost:8080/candidates/api/candidates/searchClient?hsbchiringManager=${hsbchiringManager}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidates by client name");
};


export const searchEmployeesByClientName = async (hsbchiringManager) => {
  const response = await fetch(
    `http://localhost:8080/employees/api/employees/search?hsbchiringManager=${hsbchiringManager}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch employees by client name");
};

export const searchAllByClientName = async (hsbchiringManager) => {
  const response = await fetch(
    `http://localhost:8080/candidates/api/candidates/searchAllByClient?hsbchiringManager=${hsbchiringManager}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidates and employees by client name");
};


export const searchAllByHiringManager = async (hsbchiringManager) => {
  const response = await fetch(
    `http://localhost:8080/candidates/api/candidates/searchAllByHiringManager?hsbchiringManager=${hsbchiringManager}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch candidates and employees by hiring manager");
};
