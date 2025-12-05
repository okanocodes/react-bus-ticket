import { http, HttpResponse } from "msw";

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

  // Schedules
  http.get("/api/schedules", ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const date = url.searchParams.get("date");

    // mock seferler
    const mock = [
      {
        id: "TRIP-1001",
        company: "Hitit Turizm",
        from: "ist-alibeykoy",
        to: "ank-astim",
        departure: `${date}T08:30:00+03:00`,
        arrival: `${date}T13:15:00+03:00`,
        price: 899,
        availableSeats: 18,
      },
      {
        id: "TRIP-1002",
        company: "Metro Express",
        from: "ist-bayrampasa",
        to: "ank-astim",
        departure: `${date}T09:15:00+03:00`,
        arrival: `${date}T14:05:00+03:00`,
        price: 700,
        availableSeats: 12,
      },
      {
        id: "TRIP-1003",
        company: "Pamukkale Seyehat",
        from: "ank-astim",
        to: "bursa-otogar",
        departure: `${date}T09:15:00+03:00`,
        arrival: `${date}T14:05:00+03:00`,
        price: 950,
        availableSeats: 11,
      },
      {
        id: "TRIP-1004",
        company: "Anadolu Seyehat",
        from: "ank-astim",
        to: "bursa-otogar",
        departure: `${date}T10:15:00+03:00`,
        arrival: `${date}T15:05:00+03:00`,
        price: 900,
        availableSeats: 12,
      },
    ];

    const filtered = mock.filter((x) => x.from === from && x.to === to);
    return HttpResponse.json(filtered);
  }),

  // Seat Schema
  http.get("/api/seatSchemas/:tripId", ({ params }) => {
    const { tripId } = params;

    return HttpResponse.json({
      tripId,
      layout: {
        rows: 10,
        cols: 5,
        cells: Array.from({ length: 10 }).map(() => [0, 2, 0, 0, 0]),
      },
      seats: [
        { no: 1, row: 1, col: 1, status: "empty" },
        { no: 2, row: 1, col: 3, status: "taken" },
        { no: 3, row: 1, col: 4, status: "empty" },
      ],
      unitPrice: 695,
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
