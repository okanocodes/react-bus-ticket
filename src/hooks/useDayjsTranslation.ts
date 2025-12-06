import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export const useDayjsTranslation = () => {
  const { i18n } = useTranslation();
  const formatDate = (date: string | Date, fmt: string = "LL") =>
    dayjs(date).locale(i18n.language).format(fmt);

  const localeDate = () => dayjs().locale(i18n.language);
  return { formatDate, localeDate };
};
