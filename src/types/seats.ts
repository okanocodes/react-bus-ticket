export interface SeatSchema {
  tripId: string;
  layout: {
    rows: number;
    cols: number;
    cells: number[][];
    doors?: {
      top?: { row: number; col: number };
      middle?: { row: number; col: number };
    };
  };

  seats: {
    no: number;
    row: number;
    col: number;
    status: "empty" | "taken";
  }[];

  unitPrice: number;
}
