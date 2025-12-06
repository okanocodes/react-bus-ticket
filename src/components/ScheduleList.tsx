import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Tooltip,
  IconButton,
  Menu,
  Icon,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "../store/useTripStore";
import type { ScheduleItem } from "../types/schedules";
import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc.js";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../app/i18n";

dayjs.extend(dayjsPluginUTC);

export default function ScheduleList({
  list,
  onSortByDeparture,
  onSortByPrice,
  scheduleDate,
}: {
  list: ScheduleItem[];
  onSortByDeparture: () => void;
  onSortByPrice: () => void;
  scheduleDate: string;
}) {
  const navigate = useNavigate();
  const setTrip = useTripStore((s) => s.setTrip);

  const { t } = useTranslation();

  if (!list.length) return <Typography>{t("scheduleNotFound")}</Typography>;

  const parsedDate = new Date(Date.parse(scheduleDate));
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const formattedScheduleDate = scheduleDate
    ? parsedDate.toLocaleDateString(i18n.language, dateOptions)
    : "";

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const sortByDeparture = (a: any, b: any) => {
  //   return new Date(a.departure).getTime() - new Date(b.departure).getTime();
  // };

  // const sortByPrice = (a: any, b: any) => {
  //   return a.price - b.price;
  // };

  return (
    <Stack spacing={2} mt={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          {t("dateOfJourney")}: {formattedScheduleDate}
        </Box>
        <Box display="flex" gap={2}>
          <Tooltip title="Sırala">
            <Button
              aria-controls={open ? "sort-icon" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="outlined"
              color="primary"
            >
              <SwapVertIcon></SwapVertIcon>
              <Typography>{t("sort")}</Typography>
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="sort-menu"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                onSortByDeparture();
                handleClose();
              }}
              disableRipple
            >
              Kalkış Saatine Göre
            </MenuItem>
            <MenuItem
              onClick={() => {
                onSortByPrice();
                handleClose();
              }}
              disableRipple
            >
              Fiyata Göre
            </MenuItem>
          </Menu>
        </Box>
      </Stack>

      {/* <Box display="flex" gap={2} mb={2}>
        <Button variant="outlined" onClick={onSortByDeparture}>
          Kalkış Saatine Göre
        </Button>
        <Button variant="outlined" onClick={onSortByPrice}>
          Fiyata Göre
        </Button>
      </Box> */}
      {list.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <Typography variant="h5">{item.company}</Typography>

            <Typography variant="body1" color="textSecondary" mb={1}>
              {t("availableSeats")}: {item.availableSeats}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* <Typography variant="h6" component="div">
                  {dayjs(item.departure).format("DD/MM/YYYY")}
                </Typography> */}
                <Typography variant="h6" component="div">
                  {dayjs(item.departure).format("HH:mm")} →
                  {dayjs(item.arrival).format("HH:mm")}
                  {/* {item.departure} → {item.arrival} */}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h5" component="div">
                  {item.price} TL
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setTrip(item);
                    navigate(`/seats/${item.id}`);
                  }}
                >
                  {t("selectSchedule")}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
