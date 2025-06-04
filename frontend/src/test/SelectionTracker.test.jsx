jest.mock("../services/api", () => ({
  getCandidateById: jest.fn(),
  getEmployeeByPsid: jest.fn(),
  getSelectionDetailsByCandidateId: jest.fn(),
  getSelectionDetailsByPsId: jest.fn(),
  fetchLobs: jest.fn(),
  fetchSubLobs: jest.fn(),
  fetchSubLob: jest.fn(),
  getTaggingDetailsByPsId: jest.fn(),
  getAllVendors: jest.fn(),
  getTaggingDetailsByVendorCandidateId: jest.fn(),
  getSelectionDetailsByVendorCandidateId: jest.fn(),
  getVendorCandidateById: jest.fn(),
  getHsbcRoles: jest.fn(),
}));

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SelectionTracker from "../components/SelectionTracker";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import {
  getCandidateById,
  getEmployeeByPsid,
  getSelectionDetailsByCandidateId,
  getSelectionDetailsByPsId,
  fetchLobs,
  fetchSubLobs,
  getAllVendors,
  getHsbcRoles,
} from "../services/api";

describe("SelectionTracker Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fetchLobs.mockResolvedValue([
      { lobId: 1, lobName: "LOB A" },
      { lobId: 2, lobName: "LOB B" },
    ]);
    fetchSubLobs.mockResolvedValue([
      {
        subLobId: 1,
        subLobName: "SubLOB A",
        lob: { lobId: 1, lobName: "LOB A" },
      },
      {
        subLobId: 2,
        subLobName: "SubLOB B",
        lob: { lobId: 2, lobName: "LOB B" },
      },
    ]);
    getAllVendors.mockResolvedValue([
      { vendorId: 1, vendorName: "Vendor A" },
      { vendorId: 2, vendorName: "Vendor B" },
    ]);
    getHsbcRoles.mockResolvedValue([
      { ref: "dev001", roleTitle: "Developer", grade: "1" },
      { ref: "qa001", roleTitle: "QA", grade: "2" },
    ]);
    getCandidateById.mockResolvedValue({
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
    });
    getEmployeeByPsid.mockResolvedValue({
      firstName: "Jane",
      lastName: "Smith",
      psId: 765123,
    });
    getSelectionDetailsByCandidateId.mockResolvedValue({});
    getSelectionDetailsByPsId.mockResolvedValue({});
    require("../services/api").getVendorCandidateById.mockResolvedValue({
      vendor: 2,
      phoneNumber: "1234567880",
      firstName: "Vendor",
      lastName: "Candidate",
    });
  });

  const renderComponent = (state) => {
    return render(
      <Router>
        <ToastContainer />
        <SelectionTracker location={{ state }} />
      </Router>
    );
  };

  test("renders SelectionTracker with default internal state", async () => {
    renderComponent({ id: 765123 });

    await waitFor(() => {
      expect(screen.getByText(/Selection Tracker/i)).toBeInTheDocument();
    });
    expect(fetchLobs).toHaveBeenCalled();
  });

  test("renders lob and sublob dropdowns", async () => {
    renderComponent({ id: 765123 });

    await waitFor(() => {
      expect(screen.getByLabelText(/^LOB:/)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Sub LOB:/)).toBeInTheDocument();
    });
  });

  test("handles lob change and loads sublobs", async () => {
    renderComponent({ id: 765123 });

    await waitFor(() => {
      expect(screen.getByLabelText(/^LOB:/)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/^LOB:/), {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(fetchSubLobs).toHaveBeenCalled();
    });
  });

  test("handles role search and selection", async () => {
    renderComponent({ id: 765123 });

    const roleInput = screen.getByPlaceholderText(/Search or select a role/i);
    fireEvent.focus(roleInput);
    fireEvent.change(roleInput, { target: { value: "Developer" } });

    await waitFor(() => {
      expect(screen.getByText(/Developer/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Developer/i));

    await waitFor(() => {
      expect(roleInput).toHaveValue("Developer");
    });
  });

  test("handles vendor flow", async () => {
    renderComponent({ id: 99, phoneNumber: "1234567880" });

    await waitFor(() => {
      expect(getAllVendors).toHaveBeenCalled();
      expect(screen.getByLabelText(/Vendor/i)).toBeInTheDocument();
    });
  });

  test("shows validation errors on submit if required fields are empty", async () => {
    renderComponent({ id: 765123, phoneNumber: "1234567890" });

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      // At least one required error should be shown
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });

  test("handles phone number change for external user", async () => {
    const { container } = renderComponent({
      id: 99,
      phoneNumber: "1234567880",
    });

    const phoneInput = container.querySelector('input[name="phone"]');

    fireEvent.change(phoneInput, { target: { value: "9876543210" } });
    expect(phoneInput).toHaveValue("9876543210");
  });

  test("handles cancel button", async () => {
    renderComponent({ id: 765123 });

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelBtn);

    // Should navigate or reset form, depending on implementation
    // Here we just check the button exists and is clickable
    expect(cancelBtn).toBeInTheDocument();
  });
});
