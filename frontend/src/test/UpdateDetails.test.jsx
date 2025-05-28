import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UpdateDetails from "../components/UpdateDetails";

jest.mock("../services/api", () => ({
  getAllVendors: jest.fn(() => Promise.resolve([{ vendorId: 1, vendorName: "Vendor A" }])),
  getHsbcRoles: jest.fn(() => Promise.resolve([{ ref: "1", roleTitle: "Role A", grade: "Grade A" }])),
  fetchLobs: jest.fn(() => Promise.resolve([{ lobId: 1, lobName: "LOB A" }])),
  fetchSubLobs: jest.fn(() => Promise.resolve([{ subLOBid: 1, subLobName: "SubLOB A" }])),
}));

describe("UpdateDetails Component", () => {
  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: { id: 1, phoneNumber: "1234567890" } }),
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders UpdateDetails component", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    expect(screen.getByText("HSBC Updation Form")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Vendor A")).toBeInTheDocument());
  });

  test("updates form inputs", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const psIdInput = screen.getByLabelText(/PS ID/i);
    fireEvent.change(psIdInput, { target: { value: "123456" } });
    expect(psIdInput.value).toBe("123456");

    const statusSelect = screen.getByLabelText(/Status/i);
    fireEvent.change(statusSelect, { target: { value: "Tagging Completed" } });
    expect(statusSelect.value).toBe("Tagging Completed");
  });

  test("handles file upload", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const fileInput = screen.getByLabelText(/Interview Evidences/i);
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => expect(screen.getByText("example.png")).toBeInTheDocument());
  });

  test("filters HSBC Roles dropdown", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const roleInput = screen.getByPlaceholderText(/Search or select a role/i);
    fireEvent.change(roleInput, { target: { value: "Role" } });

    await waitFor(() => expect(screen.getByText("Role A")).toBeInTheDocument());
    fireEvent.click(screen.getByText("Role A"));
    expect(roleInput.value).toBe("Role A");
  });

  test("calls handleSubmit on form submission", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const submitButton = screen.getByText(/Update/i);
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/landing-page"));
  });

  test("navigates on cancel button click", async () => {
    render(
      <BrowserRouter>
        <UpdateDetails />
      </BrowserRouter>
    );

    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith("/landing-page");
  });
});