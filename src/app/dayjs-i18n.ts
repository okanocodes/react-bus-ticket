import dayjs from "dayjs";
import "dayjs/locale/tr"; // Turkish locale
import "dayjs/locale/en"; // English locale
import utc from "dayjs/plugin/utc";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(utc);
dayjs.extend(localeData);

export const updateDayjsLocale = (lng: string) => {
  dayjs.locale(lng === "tr" ? "tr" : "en"); // Sync with i18n [web:4]
};
