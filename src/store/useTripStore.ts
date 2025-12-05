import { create } from "zustand";

interface TripState {
  selectedTrip: any;
  selectedSeats: number[];
  setTrip: (t: any) => void;
  toggleSeat: (seat: number) => void;
  reset: () => void;
}

export const useTripStore = create<TripState>((set, get) => ({
  selectedTrip: null,
  selectedSeats: [],

  setTrip: (t) => set({ selectedTrip: t, selectedSeats: [] }),

  toggleSeat: (seat) => {
    const seats = get().selectedSeats;
    if (seats.includes(seat)) {
      set({ selectedSeats: seats.filter((s) => s !== seat) });
    } else if (seats.length < 4) {
      set({ selectedSeats: [...seats, seat] });
    }
  },

  reset: () => set({ selectedTrip: null, selectedSeats: [] }),
}));
