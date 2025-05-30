import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdateDetails from "../components/UpdateDetails";

// ✅ Mock API services
jest.mock("../services/api", () => ({
  getAllVendors: jest.fn(() => Promise.resolve([{ vendorId: 1, vendorName: "Vendor A" }])),
  getHsbcRoles: jest.fn(() => Promise.resolve([{ ref: "1", roleTitle: "Role A", grade: "Grade A" }])),
  fetchLobs: jest.fn(() => Promise.resolve([{ lobId: 1, lobName: "LOB A" }])),
  fetchSubLobs: jest.fn(() => Promise.resolve([{ subLOBid: 1, subLobName: "SubLOB A" }])),
  getCandidateById: jest.fn(() => Promise.resolve({ name: "Test Candidate", psId: "123456" })), // ✅ Added
}));

// ✅ Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { id: 1, phoneNumber: "1234567890" } }),
  };
});

describe("UpdateDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders UpdateDetails component and loads dropdowns", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    expect(await screen.findByText("HSBC Updation Form")).toBeInTheDocument();
    expect(await screen.findByText("Vendor A")).toBeInTheDocument();
  });

  test("updates form inputs correctly", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const psIdInput = await screen.findByLabelText(/PS ID/i);
    fireEvent.change(psIdInput, { target: { value: "123456" } });
    expect(psIdInput.value).toBe("123456");

    const statusSelect = screen.getByLabelText(/Status/i);
    fireEvent.change(statusSelect, { target: { value: "Tagging Completed" } });
    expect(statusSelect.value).toBe("Tagging Completed");
  });

  test("handles file upload and displays file name", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const fileInput = await screen.findByLabelText(/Interview Evidences/i);
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("example.png")).toBeInTheDocument();
    });
  });

  test("filters and selects HSBC Roles from dropdown", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const roleInput = await screen.findByPlaceholderText(/Search or select a role/i);
    fireEvent.change(roleInput, { target: { value: "Role" } });

    const roleOption = await screen.findByText("Role A");
    fireEvent.click(roleOption);

    expect(roleInput.value).toBe("Role A");
  });

  test("submits form and navigates on success", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    fireEvent.change(await screen.findByLabelText(/PS ID/i), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: "Tagging Completed" } });

    const submitButton = screen.getByText(/Update/i);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/landing-page");
    });
  });

  test("navigates to landing page on cancel", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const cancelButton = await screen.findByText(/Cancel/i);
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/landing-page");
    });
  });
});
