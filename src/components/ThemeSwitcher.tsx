import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { useColorScheme } from "@mui/material/styles";

export default function ThemeSwitcher({ children }: any) {
  const { mode, setMode } = useColorScheme();

  return (
    <div>
      <IconButton
        onClick={() => {
          setMode(mode === "light" ? "dark" : "light");
        }}
      >
        {mode === "light" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      {children}
    </div>
  );
}
