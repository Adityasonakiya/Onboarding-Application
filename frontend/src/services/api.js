export const getEmployeeByPsid = async (psid) => {
    const response = await fetch(`http://localhost:8080/employees/${psid}`);
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to fetch employee data');
};

export const getCandidateById = async (candidateId) => {
    const response = await fetch(`http://localhost:8080/candidates/${candidateId}`);
    if (response.ok) {
        return response.json();
    }
    throw new Error('Failed to fetch candidate data');
};

export const getSelectionDetailsByPsid = async (psid) => {
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
  
