export function generateSchedules(date: string) {
  if (!date) return [];

  return [
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
}
