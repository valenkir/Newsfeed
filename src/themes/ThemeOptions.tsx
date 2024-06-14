import { createTheme } from "@mui/material/styles";

export const darkNewsTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00796B",
      light: "#B2DFDB",
      contrastText: "#fff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontFamily: "Righteous-Regular",
    },
    h4: {
      fontSize: "1.875rem",
      fontFamily: "Righteous-Regular",
    },
  },
});

export const lightNewsTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D0EBE6",
      contrastText: "#2B2D42",
    },
    secondary: {
      main: "#97C4BC",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontFamily: "Righteous-Regular",
    },
    h4: {
      fontSize: "1.875rem",
      fontFamily: "Righteous-Regular",
    },
  },
});
