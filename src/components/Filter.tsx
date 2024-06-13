import React from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import usePrevious from "../hooks/usePrevious";
import { OtherFilters } from "../interfaces/FilterInterfaces";
import useSearchParamsContext from "../hooks/useSearchParamsContext";

interface Props {
  category: string;
  setOtherFilters: React.Dispatch<
    React.SetStateAction<OtherFilters | undefined>
  >;
  otherFilters: OtherFilters | undefined;
}

interface FilterCountries {
  ua: string;
  us: string;
  lv: string;
  bg: string;
}

const countries = { ua: "Ukraine", us: "USA", lv: "Latvia", bg: "Bulgaria" };

function Filter({ category, setOtherFilters, otherFilters }: Props) {
  const today = moment();
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const [country, setCountry] = React.useState<string>("");
  const [dateValue, setDateValue] = React.useState<moment.Moment | null>();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const prevCountry = usePrevious(country);
  const prevDateValue = usePrevious(dateValue);
  const prevSearchQuery = usePrevious(searchQuery);

  const parseFilter = () => {
    const filterObj: OtherFilters = {};
    if (category === "All" && dateValue) {
      const date = moment(dateValue).format("YYYY-MM-DD");
      filterObj.from = date;
      filterObj.to = date;
    } else if (country) {
      const countryCode = Object.keys(countries).find(
        (key) => countries[key as keyof FilterCountries] === country
      );
      filterObj.country = countryCode;
      filterObj.countryName = country;
    }

    if (searchQuery.trim()) {
      filterObj.q = searchQuery.trim();
    }

    filterObj.page = 1;
    return filterObj;
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
    setOtherFilters({ countryName: event.target.value });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setOtherFilters({ q: event.target.value });
  };

  const handleApplyClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (
      prevCountry !== country ||
      prevDateValue !== dateValue ||
      prevSearchQuery !== searchQuery
    ) {
      const params = parseFilter();
      setSearchParams(params as URLSearchParams);
      setOtherFilters(params as OtherFilters);
    }
  };

  const handleCancelClick = (event: React.MouseEvent<HTMLElement>) => {
    if (searchParams.size || !Object.values(otherFilters as OtherFilters)) {
      const params = {};
      setSearchParams(params as URLSearchParams);
      setOtherFilters(params as OtherFilters);
      setCountry("");
      setSearchQuery("");
    }
  };

  return (
    <Paper
      sx={{
        minWidth: 1 / 5,
        width: { xs: "100%", md: 1 / 5 },
        maxHeight: 350,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        gap: 3,
        pt: 4,
        flexDirection: { md: "column", xs: "row" },
        position: { md: "static", xs: "absolute" },
        flexWrap: { md: "nowrap", xs: "wrap" },
        top: "15%",
        p: { xs: 3 },
        boxSizing: "border-box",
        mt: 2,
      }}
      elevation={3}
    >
      <Typography
        variant="h6"
        sx={{
          display: {
            md: "block",
            sm: "none",
            xs: "none",
          },
        }}
      >
        Filters
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: { md: "column", xs: "row" },
          width: "100%",
          gap: 4,
        }}
      >
        <TextField
          id="search-field"
          label="Search by phrase"
          variant="standard"
          value={otherFilters?.q || ""}
          onInput={handleSearchInput}
          sx={{ width: 2 / 3 }}
        />
        {category === "All" && (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="MM/DD/YYYY"
              defaultValue={moment(otherFilters?.from)}
              maxDate={today}
              onChange={(newValue) => {
                setDateValue(newValue);
                setOtherFilters({
                  from: moment(newValue).format("YYYY-MM-DD"),
                  to: moment(newValue).format("YYYY-MM-DD"),
                });
              }}
              sx={{ width: 2 / 3 }}
            />
          </LocalizationProvider>
        )}
        {category !== "All" && (
          <FormControl variant="standard" sx={{ m: 1, width: 2 / 3 }}>
            <InputLabel id="select-country-label">Country</InputLabel>
            <Select
              labelId="select-country-label"
              id="select-country"
              label="Country"
              value={country || otherFilters?.countryName || ""}
              onChange={handleCountryChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.values(countries).map(
                (country: string, index: number) => {
                  return (
                    <MenuItem value={country} key={index}>
                      {country}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        )}
      </Box>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "row",
          flexWrap: { md: "wrap", xs: "nowrap" },
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Button variant="contained" onClick={handleApplyClick}>
          Apply
        </Button>
        <Button variant="outlined" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}

export default Filter;
