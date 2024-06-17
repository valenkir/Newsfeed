import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface headerMenuProps {
  filters: string[];
  styles?: SxProps<Theme>;
  clickHandler?: any;
  activeFilter: string | null;
}
function HeaderMenu({
  filters,
  styles = [],
  clickHandler,
  activeFilter,
}: headerMenuProps) {
  const setMenuItemsColor = () => {
    return localStorage.getItem("theme") === "dark"
      ? "primary.contrastText"
      : "primary.main";
  };

  const setTabBgColor = (filter: string) => {
    if (activeFilter) {
      return filter === activeFilter ? "primary.dark" : "transparent";
    } else if (sessionStorage.getItem("categoryTab")) {
      return filter === sessionStorage.getItem("categoryTab")
        ? "primary.dark"
        : "transparent";
    } else {
      return "transparent";
    }
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
            bgcolor: setTabBgColor(filter),
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
