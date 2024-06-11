import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const countries = { ua: "Ukraine", us: "USA", lv: "Latvia", bg: "Bulgaria" };

function HeadlineFilter() {
  const [country, setCountry] = React.useState<string>("");
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value);
  };

  return (
    <Paper
      sx={{
        minWidth: 1 / 5,
        maxHeight: 350,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        pt: 4,
      }}
      elevation={3}
    >
      <Typography variant="h6">Filters</Typography>
      <TextField
        id="search-field"
        label="Search by phrase"
        variant="standard"
        sx={{ width: 1 / 2 }}
      />
      <FormControl variant="standard" sx={{ m: 1, width: 1 / 2 }}>
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
          {Object.values(countries).map((country: string, index: number) => {
            return (
              <MenuItem value={country} key={index}>
                {country}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box
        sx={{
          mt: 3,
          display: "flex",
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

export default HeadlineFilter;
