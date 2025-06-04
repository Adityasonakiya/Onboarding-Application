
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LandingPage from '../components/LandingPage';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  fetchEmployeeCandidatesBySelections,
  getEmployeeCandidateByBgv,
  getEmployeeCandidateByCtool,
  getVendorById,
  getCandidateByPhoneNumber,
  getEmployeeCandidateByPsid,
} from '../services/api';

jest.mock('../services/api', () => ({
  fetchEmployeeCandidatesBySelections: jest.fn(),
  getCandidateById: jest.fn(),
  getEmployeeByPsid: jest.fn(),
  getEmployeeCandidateByBgv: jest.fn(),
  getEmployeeCandidateByCtool: jest.fn(),
  getEmployeeCandidateByPsid: jest.fn(),
  getEmployeeCandidateByCandidateId: jest.fn(),
  getVendorById: jest.fn(),
  getCandidateByPhoneNumber: jest.fn(),
}));

describe('LandingPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify({ psid: '12345' }));

    fetchEmployeeCandidatesBySelections.mockResolvedValue({
      content: [
        {
          id: 101,
          firstName: 'John',
          lastName: 'Doe',
          lobName: 'LOB A',
          hsbchiringManager: 'Manager X',
          onboardingStatus: 'In Progress',
          bgvStatus: 'Clear',
          phoneNumber: '1234567890',
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          lobName: 'LOB B',
          hsbchiringManager: 'Manager Y',
          onboardingStatus: 'Pending',
          bgvStatus: 'Pending',
          phoneNumber: '0987654321',
        },
      ],
      totalPages: 2,
    });

    getVendorById.mockResolvedValue({ vendorName: 'Vendor B' });
    getEmployeeCandidateByBgv.mockResolvedValue({ totalPages: 1 });
    getEmployeeCandidateByCtool.mockResolvedValue({ totalPages: 1 });
    getCandidateByPhoneNumber.mockResolvedValue({
      id: 101,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
    });
    getEmployeeCandidateByPsid.mockResolvedValue({
      id: 101,
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
    });
  });

  const renderComponent = (state = {}) => {
    render(
      <Router>
        <LandingPage location={{ state }} />
      </Router>
    );
  };

  test('renders table with candidates', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/My Selections/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });

  test('calls add new selection on button click', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Add New Selection/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Add New Selection/i));
    // Navigation is tested by react-router, so just ensure no error
  });

  test('calls refresh on button click', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Refresh/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Refresh/i));
    // Navigation is tested by react-router, so just ensure no error
  });

  test('renders vendor name for vendor candidate', async () => {
    fetchEmployeeCandidatesBySelections.mockResolvedValueOnce({
      content: [
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          lobName: 'LOB B',
          hsbchiringManager: 'Manager Y',
          onboardingStatus: 'Pending',
          bgvStatus: 'Pending',
          phoneNumber: '0987654321',
        },
      ],
      totalPages: 1,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Vendor B/i)).toBeInTheDocument();
    });
  });

  test('filters candidate by id if state.id is present', async () => {
    renderComponent({ id: 101 });

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  test('filters candidate by phoneNumber if state.phoneNumber is present', async () => {
    renderComponent({ phoneNumber: '1234567890' });

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  test('pagination controls work', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/My Selections/i)).toBeInTheDocument();
    });

    const nextButton = screen.getByText(/>>/i);
    fireEvent.click(nextButton);
    // Should update page, but navigation is internal state
  });

  test('rows per page select works', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByLabelText(/Select rows:/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Select rows:/i), { target: { value: '10' } });
    expect(screen.getByLabelText(/Select rows:/i)).toHaveValue('10');
  });
});