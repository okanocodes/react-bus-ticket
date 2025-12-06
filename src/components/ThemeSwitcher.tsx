import { IconButton, useMediaQuery } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useThemeMode } from "../store/useThemeMode";
import { useColorScheme } from "@mui/material/styles";

export default function ThemeSwitcher({ children }: any) {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { mode, setMode } = useColorScheme();

  // const [mode, setMode] = useState<"light" | "dark">(
  //   prefersDarkMode ? "dark" : "light"
  // );

  // const { setMode: setStoredMode } = useThemeMode();
  // const { mode: storedMode } = useThemeMode();

  // Sync local mode with global store
  // useMemo(() => {
  //   setStoredMode(mode);
  // }, [mode, setStoredMode]);

  // console.log("prefer mode", prefersDarkMode);
  // console.log("current mode", mode);
  // console.log("stored mode", storedMode);
  return (
    <div>
      <IconButton
        onClick={() => {
          // setMode((m) => (m === "light" ? "dark" : "light"));
          // setStoredMode(mode === "light" ? "dark" : "light");
          setMode(mode === "light" ? "dark" : "light");
        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
      {children}
    </div>
  );
}
