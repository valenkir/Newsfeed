export interface newsTheme {
  name: string;
  palette: {};
  typography?: {};
}

export const darkNewsThemeOptions: newsTheme[] = [
  {
    name: "dark",
    palette: {
      primary: {
        main: "#357266",
        light: "#fff",
      },
      secondary: {
        main: "#74C3B3",
      },
    },
    typography: {
      h1: {
        fontSize: "2.25rem",
      },
    },
  },
];

export const lightNewsThemeOptions: newsTheme[] = [
  {
    name: "light",
    palette: {
      primary: {
        main: "#D0EBE6",
        contrastText: "#2B2D42",
      },
      secondary: {
        main: "#97C4BC",
      },
      typography: {
        h1: {
          fontSize: "2.25rem",
        },
      },
    },
  },
];
