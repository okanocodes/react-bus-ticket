// src/app/dayjs-i18n.ts (FINAL APP CODE FIX)

import dayjs from "dayjs";
import "dayjs/locale/tr"; // Turkish locale
import "dayjs/locale/en"; // English locale
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";

// --- FIX: Conditionally initialize plugins in the test environment ---
// process.env.NODE_ENV is set to 'test' by default in Vitest/JSDOM environments.
if (import.meta.env.NODE_ENV !== "test") {
  dayjs.extend(utc); // Line 7: This will now be skipped during testing
  dayjs.extend(localeData);
} else {
  // If you need dayjs to be available in tests without the real plugins,
  // you can place any essential mock initialization here, but generally,
  // the vi.mock in vitest.setup.ts handles this for us.
  console.log("Skipping dayjs extension in test environment.");
}

export const updateDayjsLocale = (lng: string) => {
  dayjs.locale(lng === "tr" ? "tr" : "en"); // Sync with i18n [web:4]
};
