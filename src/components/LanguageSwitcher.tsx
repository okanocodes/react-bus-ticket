import { Button, ButtonGroup } from "@mui/material";
import i18n from "../app/i18n";

export default function LanguageSwitcher() {
  return (
    <ButtonGroup size="small" variant="outlined" color="inherit">
      <Button onClick={() => i18n.changeLanguage("tr")}>TR</Button>
      <Button onClick={() => i18n.changeLanguage("en")}>EN</Button>
    </ButtonGroup>
  );
}
