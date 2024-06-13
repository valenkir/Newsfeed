import moment from "moment";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

function Footer() {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "right",
        p: 3,
        bgcolor: "primary.main",
      }}
    >
      <Typography sx={{ color: "primary.contrastText" }}>
        All rights reserved {moment().year()}
      </Typography>
    </Box>
  );
}

export default Footer;
