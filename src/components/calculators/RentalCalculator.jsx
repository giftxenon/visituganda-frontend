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

/**
 * Currency → Representative Country (ISO 3166-1 alpha-2)
 * Used for flag display
 */
const currencyToCountry = {
  // Major
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  JPY: "jp",
  CNY: "cn",
  AUD: "au",
  CAD: "ca",
  CHF: "ch",

  // Africa
  UGX: "ug",
  KES: "ke",
  TZS: "tz",
  RWF: "rw",
  NGN: "ng",
  GHS: "gh",
  ZAR: "za",
  XOF: "sn", // West African CFA
  XAF: "cm", // Central African CFA
  MAD: "ma",
  EGP: "eg",
  DZD: "dz",
  ETB: "et",
  ZMW: "zm",
  MWK: "mw",
  BWP: "bw",
  NAD: "na",
  MUR: "mu",
  SCR: "sc",
  TND: "tn",

  // Americas
  MXN: "mx",
  BRL: "br",
  ARS: "ar",
  CLP: "cl",
  COP: "co",
  PEN: "pe",
  UYU: "uy",
  BOB: "bo",
  DOP: "do",
  JMD: "jm",
  TTD: "tt",
  BBD: "bb",

  // Europe
  NOK: "no",
  SEK: "se",
  DKK: "dk",
  PLN: "pl",
  CZK: "cz",
  HUF: "hu",
  RON: "ro",
  BGN: "bg",
  HRK: "hr",
  ISK: "is",
  RUB: "ru",
  UAH: "ua",
  TRY: "tr",

  // Middle East
  AED: "ae",
  SAR: "sa",
  QAR: "qa",
  KWD: "kw",
  BHD: "bh",
  OMR: "om",
  ILS: "il",
  JOD: "jo",
  LBP: "lb",
  IRR: "ir",

  // Asia
  INR: "in",
  PKR: "pk",
  BDT: "bd",
  LKR: "lk",
  NPR: "np",
  IDR: "id",
  MYR: "my",
  SGD: "sg",
  THB: "th",
  PHP: "ph",
  VND: "vn",
  KRW: "kr",
  HKD: "hk",
  TWD: "tw",
  KZT: "kz",
  UZS: "uz",
  MMK: "mm",
  KHR: "kh",
  LAK: "la",

  // Oceania
  NZD: "nz",
  FJD: "fj",
  PGK: "pg",

  // Crypto / special (no flags)
  BTC: null,
  ETH: null,
  LTC: null,
  XRP: null,
  XDR: null,
};

export default function RentalCalculator({ dailyCost }) {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch(() => setRates({}));
  }, []);

  const days = Math.max(endDate.diff(startDate, "day"), 1);
  const totalUSD = days * dailyCost;

  const converted = rates[currency]
    ? (totalUSD * rates[currency]).toFixed(2)
    : totalUSD.toFixed(2);

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

          {/* Currency Select with Flags */}
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
