import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HeadlinesList from "../components/HeadlinesList";

function Landing() {
  return (
    <Box sx={{ m: 5 }}>
      <Typography variant="h4">Headlines</Typography>
      <HeadlinesList />
    </Box>
  );
}

export default Landing;
