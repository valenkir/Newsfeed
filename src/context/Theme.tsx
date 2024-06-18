import React, { createContext, useState, useContext } from "react";
import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import { darkNewsTheme, lightNewsTheme } from "../themes/ThemeOptions";

interface ThemeContextProps {
  changeTheme: (theme: string) => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme") === "dark"
      ? darkNewsTheme
      : lightNewsTheme
    : darkNewsTheme;

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const changeTheme = (newTheme: string) => {
    if (newTheme && newTheme !== localStorage.getItem("theme")) {
      const themeValue = newTheme === "dark" ? darkNewsTheme : lightNewsTheme;
      setTheme(themeValue);
      localStorage.setItem("theme", newTheme);
    }
  };

  const getTheme = () => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
        ? darkNewsTheme
        : lightNewsTheme
      : theme;
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MuiThemeProvider theme={getTheme()}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
