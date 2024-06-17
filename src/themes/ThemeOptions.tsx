import { createTheme } from "@mui/material/styles";

export const darkNewsTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#357266",
      light: "#B2DFDB",
      contrastText: "#fff",
      dark: "#435654",
    },
    secondary: {
      main: "#fff",
      contrastText: "#5FCCB7",
    },
    text: {
      primary: "#fff",
      secondary: "#B2DFDB",
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
      main: "#795548",
      contrastText: "#fff",
      dark: "#583d33",
    },
    secondary: {
      main: "#2B2D42",
      contrastText: "#795548",
    },
    text: {
      primary: "#381D14",
      secondary: "#757575",
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
