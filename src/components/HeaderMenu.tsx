import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";
import useSearchParamsContext from "../hooks/useSearchParamsContext";

interface headerMenuProps {
  filters: string[];
  styles?: SxProps<Theme>;
  clickHandler?: any;
}
function HeaderMenu({ filters, styles = [], clickHandler }: headerMenuProps) {
  const { searchParams, setSearchParams } = useSearchParamsContext();

  const setMenuItemsColor = () => {
    return localStorage.getItem("theme") === "dark"
      ? "primary.contrastText"
      : "primary.main";
  };

  return (
    <Box sx={[...(Array.isArray(styles) ? styles : [styles])]}>
      {filters.map((filter) => (
        <Button
          key={filter}
          sx={{
            my: 2,
            color: { md: "primary.contrastText", xs: setMenuItemsColor() },
            display: "block",
            textAlign: "center",
          }}
          onClick={clickHandler}
          component={NavLink}
          to={`feed?page=1&category=${filter === "All" ? "general" : filter}`}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
}

export default HeaderMenu;
