import { createTheme } from "@mui/material/styles";

export const darkNewsTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#357266",
      contrastText: "#fff",
    },
    secondary: {
      main: "#74C3B3",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontFamily: "Righteous-Regular",
    },
    h4: {
      fontSize: "2.875rem",
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
      fontSize: "2.25rem",
    },
  },
});
