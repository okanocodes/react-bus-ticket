import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

export default function RootLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      <Box component="footer" sx={{ p: 2, mt: "auto", textAlign: "center" }}>
        Footer content
      </Box>
    </Box>
  );
}
