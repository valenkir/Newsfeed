import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import usePrevious from "../hooks/usePrevious";
import { OtherFilters } from "../interfaces/FilterInterfaces";
import useSearchParamsContext from "../hooks/useSearchParamsContext";
import { copyCurrentSearchParams } from "../helperFunctions";

interface FilterCountries {
  ua: string;
  us: string;
  lv: string;
  bg: string;
}

const countries = { ua: "Ukraine", us: "USA", lv: "Latvia", bg: "Bulgaria" };

function Filter() {
  const { searchParams, setSearchParams } = useSearchParamsContext();
  const [otherFilters, setOtherFilters] = React.useState<
    OtherFilters | undefined
  >();
  const prevCountry = usePrevious(otherFilters?.countryName);
  const prevSearchQuery = usePrevious(otherFilters?.q);

  const parseFilter = () => {
    const filterObj: OtherFilters = {};
    if (otherFilters?.countryName) {
      const countryCode = Object.keys(countries).find(
        (key) =>
          countries[key as keyof FilterCountries] === otherFilters?.countryName
      );
      filterObj.country = countryCode;
      filterObj.countryName = otherFilters?.countryName;
    }

    if (otherFilters?.q) {
      filterObj.q = otherFilters?.q;
    }

    filterObj.page = 1;
    return filterObj;
  };

  const handleCountryChange = (event: SelectChangeEvent) => {
    const currentFilters: OtherFilters = { ...otherFilters };
    currentFilters.countryName = event.target.value;
    setOtherFilters(currentFilters);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFilters: OtherFilters = { ...otherFilters };
    const value = event.target.value.trim();
    currentFilters.q = value;
    setOtherFilters(currentFilters);
  };

  const handleApplyClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (
      prevCountry !== otherFilters?.countryName ||
      prevSearchQuery !== otherFilters?.q
    ) {
      const params = parseFilter();
      const currentFilters = copyCurrentSearchParams(searchParams);
      if (!params.q && currentFilters.q) {
        delete currentFilters.q;
      }
      if (!params.countryName && currentFilters.countryName) {
        delete currentFilters.countryName;
        delete currentFilters.country;
      }

      setSearchParams({ ...currentFilters, ...params } as URLSearchParams);
      setOtherFilters({ ...currentFilters, ...params } as OtherFilters);
    }
  };

  const handleCancelClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (searchParams.size || Object.values(otherFilters as OtherFilters)) {
      const params = {};
      setSearchParams(params as URLSearchParams);
      setOtherFilters({
        q: "",
        countryName: "",
        country: "",
      });
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
        position: { xs: "absolute" },
        flexWrap: { md: "nowrap", xs: "wrap" },
        top: "20%",
        left: { xs: 0 },
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
        <FormControl variant="standard" sx={{ m: 1, width: 2 / 3 }}>
          <InputLabel id="select-country-label">Country</InputLabel>
          <Select
            labelId="select-country-label"
            id="select-country"
            label="Country"
            value={otherFilters?.countryName || ""}
            onChange={handleCountryChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Object.values(countries).map((country: string, index: number) => {
              return (
                <MenuItem value={country} key={index}>
                  {country}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
          Clear
        </Button>
      </Box>
    </Paper>
  );
}

export default Filter;
