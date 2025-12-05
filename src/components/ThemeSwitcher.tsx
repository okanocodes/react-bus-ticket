import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function ThemeSwitcher({ children }: any) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <IconButton
          onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
        >
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        {children}
      </div>
    </ThemeProvider>
  );
}
