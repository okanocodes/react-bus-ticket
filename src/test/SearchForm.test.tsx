import React from "react";
// Imports come directly from @testing-library/react
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Import necessary utility from react-query for the wrapper
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchForm from "../components/SearchForm";
// Assuming you still use the wrapper utility for QueryClient
import { TestWrapper } from "../test-utils/testwrapper";
import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  beforeEach,
} from "vitest";

// --- Note on MSW and Mocks ---
// The MSW server setup (server.listen, afterEach, etc.) and the vi.mock for dayjs
// and react-i18next are now handled in 'vitest.setup.ts', simplifying this file.

// Mock data (for reference in the test)
const mockAgencies = [
  { id: "ist-alibeykoy", name: "İstanbul – Alibeyköy" },
  { id: "ist-bayrampasa", name: "İstanbul – Bayrampaşa" },
  { id: "ank-astim", name: "Ankara – AŞTİ" },
  { id: "bursa-otogar", name: "Bursa – Otogar" },
];

// --- Component Rendering Utility ---

const renderSearchForm = (onSearchMock = vi.fn()) => {
  // Use the TestWrapper that provides the QueryClient context
  return render(<SearchForm onSearch={onSearchMock} />, {
    wrapper: TestWrapper,
  });
};

// --- Tests ---

describe("SearchForm (Vitest)", () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
  });

  it("1. Renders the form elements and loads agencies via react-query", async () => {
    renderSearchForm(onSearchMock);

    // Wait for the Autocomplete labels (departure/arrival) to appear
    await waitFor(() => {
      // Note: The labels use 'departure' and 'arrival' keys from the i18n mock
      expect(screen.getByLabelText(/departure/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/arrival/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    });

    // Check if one of the loaded agency names is available in the Autocomplete options
    const departureInput = screen.getByLabelText(/departure/i);
    // User click opens the dropdown where options are found
    userEvent.click(departureInput);

    await waitFor(() => {
      expect(screen.getByText("İstanbul – Alibeyköy")).toBeInTheDocument();
    });
  });

  it("2. Handles valid form submission and calls onSearch with correct data", async () => {
    renderSearchForm(onSearchMock);

    const user = userEvent.setup();

    // --- 1. Select Departure Autocomplete (from) ---
    const departureInput = screen.getByLabelText(/departure/i);
    await user.click(departureInput);
    await user.click(screen.getByText("İstanbul – Alibeyköy"));

    // --- 2. Select Arrival Autocomplete (to) ---
    const arrivalInput = screen.getByLabelText(/arrival/i);
    await user.click(arrivalInput);
    await user.click(screen.getByText("Ankara – AŞTİ"));

    // --- 3. Set Date TextField ---
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: "2025-12-25" } });
    expect(dateInput).toHaveValue("2025-12-25");

    // --- 4. Submit the Form ---
    // The button text is the i18n key 'search'
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    // Assert onSearch was called with the correct data structure
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledTimes(1);
    });

    expect(onSearchMock).toHaveBeenCalledWith(
      {
        from: "ist-alibeykoy",
        to: "ank-astim",
        date: "2025-12-25",
      },
      expect.anything()
    );
  });

  it("3. Arrival Autocomplete correctly excludes the selected Departure location", async () => {
    renderSearchForm(onSearchMock);
    const user = userEvent.setup();

    const departureInput = screen.getByLabelText(/departure/i);
    const arrivalInput = screen.getByLabelText(/arrival/i);

    // 1. Select 'İstanbul – Alibeyköy' as Departure
    await user.click(departureInput);
    await user.click(screen.getByText("İstanbul – Alibeyköy")); // Option is selected

    // 2. Open Arrival dropdown
    await user.click(arrivalInput);

    // ASSERT: 'İstanbul – Alibeyköy' should NOT be an option in Arrival
    await waitFor(() => {
      expect(
        screen.queryByText("İstanbul – Alibeyköy")
      ).not.toBeInTheDocument();
    });

    // ASSERT: Other agencies SHOULD be available
    expect(screen.getByText("Ankara – AŞTİ")).toBeInTheDocument();
  });
});
