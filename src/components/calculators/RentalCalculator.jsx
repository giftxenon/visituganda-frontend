import { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  Box,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const currencyToCountry = {
  USD: "us",
  GBP: "gb",
  EUR: "eu",
  UGX: "ug",
  KES: "ke",
  TZS: "tz",
  RWF: "rw",
  NGN: "ng",
  ZAR: "za",
  CAD: "ca",
  AUD: "au",
  JPY: "jp",
};

export default function RentalCalculator({ dailyCost }) {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const days = Math.max(endDate.diff(startDate, "day"), 1);
  const totalUSD = days * dailyCost;
  const converted =
    rates[currency] ? (totalUSD * rates[currency]).toFixed(2) : totalUSD;

  const countryCode = currencyToCountry[currency];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {/* Dates */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(v) => setStartDate(v || dayjs())}
            sx={{ flex: 1 }}
          />
          <DatePicker
            label="Return Date"
            value={endDate}
            onChange={(v) => setEndDate(v || dayjs().add(1, "day"))}
            sx={{ flex: 1 }}
          />
        </Stack>

        {/* Days + Currency + Total */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Days"
            value={days}
            InputProps={{ readOnly: true }}
            sx={{ flex: 1 }}
          />

          {/* Currency Select with FLAGS */}
          <FormControl sx={{ flex: 1 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
              renderValue={(value) => {
                const code = currencyToCountry[value];
                return (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {code ? (
                      <img
                        src={`https://flagcdn.com/w20/${code}.png`}
                        alt={value}
                      />
                    ) : (
                      <span>🌍</span>
                    )}
                    <Typography>{value}</Typography>
                  </Box>
                );
              }}
            >
              {Object.keys(rates).map((cur) => {
                const code = currencyToCountry[cur];
                return (
                  <MenuItem key={cur} value={cur}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {code ? (
                        <img
                          src={`https://flagcdn.com/w20/${code}.png`}
                          alt={cur}
                        />
                      ) : (
                        <span>🌍</span>
                      )}
                      <Typography>{cur}</Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            label="Total Cost"
            value={`${converted} ${currency}`}
            InputProps={{ readOnly: true }}
            sx={{ flex: 1 }}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
