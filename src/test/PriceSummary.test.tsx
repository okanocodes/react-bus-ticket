import { render, screen } from "@testing-library/react";
import PriceSummary from "../components/PriceSummary";
import { describe, it, expect } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../app/i18n";

const wrap = (ui: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
);

describe("PriceSummary", () => {
  it("renders seat count, unit price and total", () => {
    render(wrap(<PriceSummary seatCount={2} unitPrice={500} />));

    expect(screen.getByText(/500 TL/i)).toBeInTheDocument(); // unit price
    expect(screen.getByText(/2/i)).toBeInTheDocument(); // seat count
    expect(screen.getByText(/1000 TL/i)).toBeInTheDocument(); // total
  });

  it("shows 0 total when seatCount is 0", () => {
    render(wrap(<PriceSummary seatCount={0} unitPrice={500} />));

    // The component renders: "total: 0 TL" (assuming t('total') returns 'total')
    // We check for the complete rendered text containing the result and the key.
    expect(screen.getByText(/total: 0 TL/i)).toBeInTheDocument();
  });

  it("calculates total correctly", () => {
    render(wrap(<PriceSummary seatCount={3} unitPrice={200} />));

    expect(screen.getByText(/600 TL/i)).toBeInTheDocument();
  });
});
