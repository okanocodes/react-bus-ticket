import React from "react";
import { Box, Typography } from "@mui/material";
import type { SeatSchema } from "../types/seats";
import { useTripStore } from "../store/useTripStore";
import DoorBackOutlinedIcon from "@mui/icons-material/DoorBackOutlined";

export default React.memo(function SeatMap({ schema }: { schema: SeatSchema }) {
  const selectedSeats = useTripStore((s) => s.selectedSeats);
  const toggleSeat = useTripStore((s) => s.toggleSeat);

  const { layout, seats: providedSeats } = schema;
  const { rows, cols, cells, doors } = layout;

  // koltukları hızlı erişim için haritalama
  const seatMap: Record<string, any> = {};
  providedSeats.forEach((s) => {
    seatMap[`${s.row}-${s.col}`] = s;
  });

  // hücre ölçüleri
  const CELL = {
    w: 42,
    h: 42,
    radius: 1,
  };

  const cellsUI: React.ReactNode[] = [];

  // grid (koltuk + koridor + orta kapı)
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const key = `${r}-${c}`;
      const cellType = cells[r - 1]?.[c - 1] ?? 0;

      // orta kapı
      if (doors?.middle && doors.middle.row === r && doors.middle.col === c) {
        cellsUI.push(
          <Box
            key={key}
            sx={{
              width: CELL.w,
              height: CELL.h,
              bgcolor: "#424242",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 0 4px rgba(0,0,0,0.4)",
              fontSize: "1.2rem",
            }}
          >
            <DoorBackOutlinedIcon />
          </Box>
        );
        continue;
      }

      // koridor
      if (cellType === 2) {
        cellsUI.push(<Box key={key} sx={{ width: CELL.w, height: CELL.h }} />);
        continue;
      }

      // koltuklar
      const seat = seatMap[key];

      if (!seat) {
        cellsUI.push(<Box key={key} sx={{ width: CELL.w, height: CELL.h }} />);
        continue;
      }

      const isSelected = selectedSeats.includes(seat.no);
      const isTaken = seat.status === "taken";
      const maxLimitReached = selectedSeats.length >= 4;
      const isDisabled = isTaken || (maxLimitReached && !isSelected);

      cellsUI.push(
        <Box
          key={key}
          role={isTaken ? "img" : "button"}
          onClick={() => !isTaken && toggleSeat(seat.no)}
          sx={{
            width: CELL.w,
            height: CELL.h,
            borderRadius: CELL.radius,
            bgcolor: isTaken
              ? "error.main"
              : isSelected
              ? "success.main"
              : "grey.200",
            cursor: isDisabled ? "not-allowed" : "pointer",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
            fontWeight: 600,
            fontSize: "0.8rem",
            boxShadow: isSelected
              ? "0 0 6px rgba(0,180,0,0.8)"
              : "0 0 4px rgba(0,0,0,0.15)",
          }}
        >
          {seat.no}
        </Box>
      );
    }
  }

  return (
    <Box>
      {/* 
      ön kapı
      */}

      {doors?.top && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${CELL.w}px)`,
            gap: { xs: 2, md: 4, lg: 8 },
            justifyContent: { xs: "center", md: "start" },
            mb: 1,
          }}
        >
          {Array.from({ length: cols }).map((_, i) => {
            const col = i + 1;
            const isDoor = col === doors?.top?.col;
            return (
              <Box
                key={`top-${col}`}
                sx={{
                  width: CELL.w,
                  height: CELL.h,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  bgcolor: isDoor ? "#424242" : "transparent",
                  color: isDoor ? "white" : "transparent",
                  boxShadow: isDoor ? "0 0 4px rgba(0,0,0,0.4)" : "none",
                  fontSize: "1.2rem",
                }}
              >
                {isDoor ? <DoorBackOutlinedIcon /> : ""}
              </Box>
            );
          })}
        </Box>
      )}

      {/* 
      koltuk grid
       */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL.w}px)`,
          gap: { xs: 2, md: 4, lg: 8 },
          justifyContent: { xs: "center", md: "start" },
        }}
      >
        {cellsUI}
      </Box>
    </Box>
  );
});
