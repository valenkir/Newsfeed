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

const countries = { ua: "Ukraine", us: "USA", lv: "Latvia", bg: "Bulgaria" };

function Filter({ category }: { category: string }) {
  const today = moment();
  const [country, setCountry] = React.useState<string>("");
  const [dateValue, setDateValue] = React.useState<moment.Moment | null>(today);
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  return (
    <Paper
      sx={{
        minWidth: 1 / 5,
        width: { xs: "100%" },
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
        p: { xs: 3, md: 0 },
        boxSizing: "border-box",
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
          sx={{ width: 2 / 3 }}
        />
        {category === "All" && (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="MM/DD/YYYY"
              value={dateValue}
              maxDate={today}
              onChange={(newValue) => setDateValue(newValue)}
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
              value={country}
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
        <Button variant="contained">Apply</Button>
        <Button variant="outlined">Cancel</Button>
      </Box>
    </Paper>
  );
}

export default Filter;
