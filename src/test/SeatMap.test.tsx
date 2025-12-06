import { render, screen, fireEvent } from "@testing-library/react";
import SeatMap from "../components/SeatMap";
import { describe, it, expect, vi } from "vitest";
import { I18nextProvider } from "react-i18next";
import i18n from "../app/i18n";
import * as store from "../store/useTripStore";
import type { SeatSchema } from "../types/seats";

import { mockZustand } from "./mockZustand";

mockZustand();

const wrap = (ui: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
);

const mockSchema: SeatSchema = {
  tripId: "TEST-TRIP",
  unitPrice: 100,

  layout: {
    rows: 3,
    cols: 5,
    cells: [
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
    ],
    doors: {
      top: { row: 1, col: 3 },
      middle: { row: 2, col: 5 },
    },
  },

  seats: [
    { no: 1, row: 1, col: 1, status: "empty" },
    { no: 2, row: 1, col: 2, status: "empty" },
    { no: 3, row: 1, col: 4, status: "taken" },
  ],
};

describe("SeatMap", () => {
  it("renders seats", () => {
    render(wrap(<SeatMap schema={mockSchema} />));
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders doors", () => {
    render(wrap(<SeatMap schema={mockSchema} />));
    expect(screen.getAllByTestId("seat-door").length).toBe(2);
  });

  it("marks taken seats as disabled", () => {
    render(wrap(<SeatMap schema={mockSchema} />));
    const takenSeat = screen.getByText("3");
    expect(takenSeat.closest("div")).toHaveClass("taken");
  });

  it("allows selecting a seat", () => {
    render(wrap(<SeatMap schema={mockSchema} />));

    const seat = screen.getByTestId("seat-1");

    fireEvent.click(seat);

    expect(seat).toHaveClass("selected");
  });

  it("prevents selecting when already 4 seats chosen", () => {
    vi.spyOn(store, "useTripStore").mockImplementation((selector: any) =>
      selector({
        selectedSeats: [10, 11, 12, 13],
        toggleSeat: vi.fn(),
      })
    );

    render(wrap(<SeatMap schema={mockSchema} />));

    const seat = screen.getByText("1");
    expect(seat.closest("div")).toHaveClass("not-allowed");
  });
});
