import { http, HttpResponse } from "msw";
import { generateSchedules } from "./generateSchedules";

export const handlers = [
  // Agencies
  http.get("/api/reference/agencies", () => {
    return HttpResponse.json([
      { id: "ist-alibeykoy", name: "İstanbul – Alibeyköy" },
      { id: "ist-bayrampasa", name: "İstanbul – Bayrampaşa" },
      { id: "ank-astim", name: "Ankara – AŞTİ" },
      { id: "bursa-otogar", name: "Bursa – Otogar" },
    ]);
  }),

  // 🎯 Schedules (dynamic)
  http.get("/api/schedules", ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const date = url.searchParams.get("date") as string;

    const schedules = generateSchedules(date);
    const filtered = schedules.filter((x) => x.from === from && x.to === to);

    return HttpResponse.json(filtered);
  }),

  // Seat Schema
  http.get("/api/seatSchemas/:tripId", ({ request, params }) => {
    const { tripId } = params;
    const url = new URL(request.url);
    const date = url.searchParams.get("date") as string;

    const schedules = generateSchedules(date);
    const trip = schedules.find((t) => t.id === tripId);

    if (!trip) {
      return HttpResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const available = trip.availableSeats;

    // --- 1. Generate total physical seat count ---
    // Always ensure bus has more seats than available seats.
    const seatsPerRow = 4;
    const requiredRows = Math.ceil(available / seatsPerRow);
    const safetyRows = 2; // ensures enough physical seats always
    const rows = requiredRows + safetyRows;
    const cols = 5;

    // --- 2. Build physical layout (no doors yet) ---
    // [seat,seat,aisle,seat,seat]
    const baseRow = [0, 0, 2, 0, 0];
    const cells = Array.from({ length: rows }, () => [...baseRow]);

    // --- 3. Insert doors safely ---
    // Middle door row = middle block row
    const mid = Math.floor(rows / 2);

    // Middle door placed at col 5 (NEVER replacing seat)
    cells[mid][4] = 3; // door
    cells[mid][3] = 2; // empty space next to door

    // Top door (virtual row above)
    const doors = {
      top: { row: 0, col: 5 },
      middle: { row: mid + 1, col: 5 },
    };

    // --- 4. Generate physical seats list ---
    const physicalSeats = [];
    let no = 1;
    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const cell = cells[r - 1][c - 1];
        if (cell === 0) {
          physicalSeats.push({ row: r, col: c, no });
          no++;
        }
      }
    }

    // --- 5. Assign taken/empty seats ---
    // All seats start as taken, then we free seats until we reach available count.
    const shuffled = [...physicalSeats].sort(() => Math.random() - 0.5);

    const emptySeats = shuffled.slice(0, available);
    const takenSeats = shuffled.slice(available);

    const seatObjects = [
      ...emptySeats.map((s) => ({ ...s, status: "empty" })),
      ...takenSeats.map((s) => ({ ...s, status: "taken" })),
    ];

    return HttpResponse.json({
      tripId,
      layout: {
        rows,
        cols,
        cells,
        doors,
      },
      seats: seatObjects,
      unitPrice: trip.price,
    });
  }),

  // Ticket Sell
  http.post("/api/tickets/sell", async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      ok: true,
      pnr: "AT-20251102-XYZ",
      message: "Payment step mocked.",
      received: body,
    });
  }),
];
