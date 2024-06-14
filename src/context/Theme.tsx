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
  const [theme, setTheme] = useState<Theme>(darkNewsTheme);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme === "dark" ? darkNewsTheme : lightNewsTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
