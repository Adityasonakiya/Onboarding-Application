export const getEmployeeByPsid = async (psid) => {
  const response = await fetch(`http://localhost:8080/employees/${psid}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch employee data');
};

export const getEmployeeCandidateByPsid = async (psid) => {
  const response = await fetch(`http://localhost:8080/employees/api/employee-candidates/${psid}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch employee data');
};

export const getAllEmployees = async (psid) => {
  const response = await fetch(`http://localhost:8080/employees`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch employees data');
};

export const getCToolStatuses = async () => {
  const response = await fetch(`http://localhost:8080/OnboardingStatuses`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch employees data');
};

export const getBgvStatuses = async () => {
  const response = await fetch(`http://localhost:8080/Bgvs`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch employees data');
};

export const getAllCandidates = async (psid) => {
  const response = await fetch(`http://localhost:8080/candidates`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch candidates data');
};

export const getCandidateById = async (candidateId) => {
  const response = await fetch(`http://localhost:8080/candidates/${candidateId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch candidate data');
};

export const getVendorById = async(vendorId) =>{
  const response = await fetch(`http://localhost:8080/vendors/${vendorId}`);
  if(response.ok){
    return response.json();
  }
  throw new Error('Failed to fetch data');
}

export const getAllVendors = async() => {
  const response = await fetch(`http://localhost:8080/vendors`);
  if(response.ok){
    return response.json();
  }
  throw new Error('Failed to fetch data');
}

export const getVendorCandidateById = async(vendorCandidateId) =>{
  const response = await fetch(`http://localhost:8080/vendors/vendor-candidates/${vendorCandidateId}`);
  if(response.ok){
    return response.json();
  }
  throw new Error('Failed to fetch data');
}

export const getAllVendorCandidates = async() => {
  const response = await fetch(`http://localhost:8080/vendors/vendor-candidates`);
  if(response.ok){
    return response.json();
  }
  throw new Error('Failed to fetch data');
}

export const createVendorCandidates = async (data) => {
  const response = await fetch(`http://localhost:8080/vendors/vendor-candidates/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const getSelectionDetailsByPsId = async (psid) => {
  const response = await fetch(`http://localhost:8080/selection-details/psid/${psid}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch selection details by psid');
};

export const getSelectionDetailsByCandidateId = async (candidateId) => {
  const response = await fetch(`http://localhost:8080/selection-details/candidateId/${candidateId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch selection details by candidateId');
};

export const getSelectionDetailsByVendorCandidateId = async (vendorCandidateId) => {
  const response = await fetch(`http://localhost:8080/selection-details/vendorCandidateId/${vendorCandidateId}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch selection details by vendor candidateId');
};

export const getTaggingDetailsByPsId = async (psId) => {
  const response = await fetch(`http://localhost:8080/api/tagging-details/psid/${psId}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch tagging details by psId');
};

export const getTaggingDetailsByCandidateId = async (candidateId) => {
  const response = await fetch(`http://localhost:8080/api/tagging-details/candidate/${candidateId}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch tagging details by candidateId');
};

export const getTaggingDetailsByVendorCandidateId = async (vendorCandidateId) => {
  const response = await fetch(`http://localhost:8080/api/tagging-details/vendor/${vendorCandidateId}`);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Failed to fetch tagging details by candidateId');
};

export const updateTaggingDetailsByPsId = async (psId, data) => {
  const response = await fetch(`http://localhost:8080/api/tagging-details/psid/${psId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateTaggingDetailsByCandidateId = async (candidateId, data) => {
  const response = await fetch(`http://localhost:8080/api/tagging-details/candidate/${candidateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateTaggingDetailsByVendorCandidateId = async (vendorCandidateId, data) => {
  const response = await fetch(`http://localhost:8080/api/tagging-details/vendor-candidate/${vendorCandidateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateSelectionDetailsByPsId = async (psId, data) => {
  const response = await fetch(`http://localhost:8080/selection-details/put/psid/${psId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateSelectionDetailsByCandidateId = async (candidateId, data) => {
  const response = await fetch(`http://localhost:8080/selection-details/put/candidateId/${candidateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateSelectionDetailsByVendorCandidateId = async (vendorCandidateId, data) => {
  const response = await fetch(`http://localhost:8080/selection-details/put/andidateId/${vendorCandidateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchLobs = async () => {
  const response = await fetch('http://localhost:8080/users/lobs');
  if (!response.ok) {
    throw new Error('Failed to fetch LOBs');
  }
  return response.json();
};

export const fetchLob = async(lobId)=>{
  const response = await fetch('https://localhost:8080/users/lob/'+ lobId);
  if(!response.ok){
    throw new Error('Failed to fetch lob');
  }
  return response.json();
}

export const fetchSubLobs = async (lobId) => {
  const response = await fetch(`http://localhost:8080/users/sublobs/${lobId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch SubLOBs');
  }
    return response.json();
};

export const fetchSubLob = async(subLobId)=>{
  const response = await fetch(`http://localhost:8080/users/sublob/${subLobId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch sublob by Id');
  }
    return response.json();
};
export const fetchEmployeeCandidates = async (createdBy, page = 0, size = 5) => {
  const validPage=Math.max(0,page)
  const response = await fetch(`http://localhost:8080/employees/api/employee-candidates?createdBy=${createdBy}&page=${validPage}&size=${size}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employee candidates');
  }
  return response.json();
};

export const getEmployeeCandidateByCtool = async (ctool) => {
  const response = await fetch(`http://localhost:8080/employees/onboarding-status?status=${ctool}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch Employees by Ctool');
};

export const getEmployeeCandidateByBgv = async (bgv) => {
  const response = await fetch(`http://localhost:8080/employees/bgv-status?status=${bgv}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch Employees by Bgv');
};