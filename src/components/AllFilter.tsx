import React from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";

function AllFilter() {
  const today = moment();
  const [dateValue, setDateValue] = React.useState<moment.Moment | null>(today);

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
        sx={{ width: 2 / 3 }}
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="MM/DD/YYYY"
          value={dateValue}
          onChange={(newValue) => setDateValue(newValue)}
          sx={{ width: 2 / 3 }}
        />
      </LocalizationProvider>
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

export default AllFilter;
