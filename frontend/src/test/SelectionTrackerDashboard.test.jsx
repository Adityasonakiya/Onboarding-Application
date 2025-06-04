import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectionTrackerDashboard from '../components/SelectionTrackerDashboard';
import * as XLSX from 'xlsx';

// Mock child components
jest.mock('../components/PieChart', () => () => <div data-testid="pie-chart" />);
jest.mock('../components/Navbar', () => () => <div data-testid="navbar" />);

// Mock XLSX
jest.mock('xlsx', () => ({
    utils: {
        json_to_sheet: jest.fn(),
        book_new: jest.fn(),
        book_append_sheet: jest.fn(),
    },
    writeFile: jest.fn(),
}));

describe('SelectionTrackerDashboard', () => {
    const mockUser = { name: 'Test User' };

    beforeEach(() => {
        global.fetch = jest.fn((url) => {
            if (url.includes('selections')) {
                return Promise.resolve({
                    json: () => Promise.resolve([
                        { lobName: 'LOB1', pricingModel: 'FP', selectionCount: 5, hsbcselectionDate: '2025-06-01' },
                    ]),
                });
            }
            if (url.includes('awaited-cases')) {
                return Promise.resolve({
                    json: () => Promise.resolve([
                        { delivery_manager: 'DM1', pricing_model: 'T&M', bgv_status: 'BGV Completed', onboarding_status: 'In progress', awaited_count: 3, updateDate: '2025-06-01' },
                    ]),
                });
            }
            if (url.includes('ctool')) {
                return Promise.resolve({
                    json: () => Promise.resolve([
                        { lobName: 'LOB1', onboarding_status: 'CTool Pending', bgv_status: 'In progress', updateDate: '2025-06-01' },
                    ]),
                });
            }
            return Promise.resolve({ json: () => Promise.resolve([]) });
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders dashboard and key UI elements', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        expect(screen.getByText(/HSBC Selection Tracker Dashboard/i)).toBeInTheDocument();
        expect(await screen.findByTestId('pie-chart')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('handles filter change and updates state', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        const customRadio = screen.getByLabelText(/Custom/i);
        fireEvent.click(customRadio);
        expect(screen.getByLabelText(/From:/i)).toBeInTheDocument();
    });

    it('calls XLSX.writeFile on export', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        const exportButtons = await screen.findAllByTitle(/Export/i);
        fireEvent.click(exportButtons[0]);
        await waitFor(() => {
            expect(XLSX.writeFile).toHaveBeenCalled();
        });
    });

    it('changes to 7days filter and triggers fetch', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        const radio = screen.getByLabelText(/7 Days/i);
        fireEvent.click(radio);
        expect(radio).toBeChecked();
    });

    it('changes to currentMonth filter and triggers fetch', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        const radio = screen.getByLabelText(/Current Month/i);
        fireEvent.click(radio);
        expect(radio).toBeChecked();
    });


    it('updates selectionFilter dropdown and triggers fetch', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        const dropdown = screen.getByTestId('selection-filter');
        fireEvent.change(dropdown, { target: { value: 'internal' } });
        expect(dropdown.value).toBe('internal');
    });


    it('resets filters and fetches data on refresh', async () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        const refreshButton = screen.getByTitle('Refresh');
        fireEvent.click(refreshButton);
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });
    });


    it('renders all three dropdown filters', () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        expect(screen.getByTestId('selection-filter')).toBeInTheDocument();
        expect(screen.getByTestId('ctool-filter')).toBeInTheDocument();
        expect(screen.getByTestId('awaited-cases-filter')).toBeInTheDocument();
    });

    it('renders all radio buttons for date filters', () => {
        render(<SelectionTrackerDashboard user={mockUser} />);
        expect(screen.getByLabelText(/7 Days/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Current Month/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Custom/i)).toBeInTheDocument();
    });
});