import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Box, createTheme, ThemeProvider, Toolbar } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, mt: "auto", textAlign: "center" }}>
          made by{" "}
          <a href="https://github.com/okanocodes/" target="_blank">
            okan şahin
          </a>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
