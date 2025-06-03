jest.mock('../services/api', () => ({
  getCandidateById: jest.fn(),
  getEmployeeByPsid: jest.fn(),
  getTaggingDetailsByCandidateId: jest.fn(),
  getTaggingDetailsByPsId: jest.fn(),
  updateTaggingDetailsByPsId: jest.fn(),
  updateTaggingDetailsByCandidateId: jest.fn(),
  updateSelectionDetailsByPsId: jest.fn(),
  updateSelectionDetailsByCandidateId: jest.fn(),
  getSelectionDetailsByCandidateId: jest.fn(),
  getSelectionDetailsByPsId: jest.fn(),
  fetchSubLob: jest.fn(),
  fetchLobs: jest.fn(),
  fetchSubLobs: jest.fn(),
  getAllVendors: jest.fn(),
  getTaggingDetailsByVendorCandidateId: jest.fn(),
  getSelectionDetailsByVendorCandidateId: jest.fn(),
  updateSelectionDetailsByVendorCandidateId: jest.fn(),
  updateTaggingDetailsByVendorCandidateId: jest.fn(),
  getVendorCandidateById: jest.fn(),
  getHsbcRoles: jest.fn(),
  getEvidenceBySelectionId: jest.fn(),
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UpdateDetails from '../components/UpdateDetails';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  getAllVendors,
  getHsbcRoles,
  getEvidenceBySelectionId,
  fetchLobs,
} from '../services/api';

describe('UpdateDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getAllVendors.mockResolvedValue([
      { vendorId: 1, vendorName: 'Vendor A' },
      { vendorId: 2, vendorName: 'Vendor B' },
    ]);

    getHsbcRoles.mockResolvedValue([
      { ref: 'dev001', roleTitle: 'Developer', grade: 'G1' },
    ]);

    getEvidenceBySelectionId.mockResolvedValue([]);

    fetchLobs.mockResolvedValue([
      { lobId: 1, lobName: 'LOB A', hsbchead: 'Head A', deliveryManager: 'DM A', salesPOC: 'POC A' },
    ]);
  });

  const renderComponent = (state) => {
    render(
      <Router>
        <ToastContainer />
        <UpdateDetails location={{ state }} />
      </Router>
    );
  };

  test('renders internal user flow correctly', async () => {
    const state = { id: 101, phoneNumber: '1234567890' };

    renderComponent(state);

    await waitFor(() => {
      expect(screen.getByLabelText(/Internal/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/External/i)).toBeInTheDocument();
    });
  });

  test('renders external user flow correctly', async () => {
    const state = { id: 1, phoneNumber: '1234567890' };

    renderComponent(state);

    await waitFor(() => {
      expect(screen.getByLabelText(/Internal/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/External/i)).toBeInTheDocument();
    });
  });

  test('renders vendor user flow correctly', async () => {
    const state = { id: 99, phoneNumber: '1234567890' };

    renderComponent(state);

    await waitFor(() => {
      expect(screen.getByLabelText(/Internal/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/External/i)).toBeInTheDocument();
    });
  });

  test('handles file upload correctly', async () => {
    const state = { id: 101, phoneNumber: '1234567890' };

    renderComponent(state);

    const fileInput = screen.getByTestId('evidence-upload');
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText(/example.png/i)).toBeInTheDocument();
    });
  });

  test('handles role selection correctly', async () => {
    const state = { id: 101, phoneNumber: '1234567890' };

    renderComponent(state);

    fireEvent.focus(screen.getByPlaceholderText(/Search or select a role/i));
    fireEvent.change(screen.getByPlaceholderText(/Search or select a role/i), { target: { value: 'Developer' } });

    await waitFor(() => {
      expect(screen.getByText(/Developer/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Developer/i));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Search or select a role/i)).toHaveValue('Developer');
    });
  });
});
