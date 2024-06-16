import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useSearchParamsContext from "../hooks/useSearchParamsContext";
import { OtherFilters } from "../interfaces/FilterInterfaces";

interface headerMenuProps {
  filters: string[];
  moreFilters: string[];
  styles?: SxProps<Theme>;
  clickHandler?: any;
}
function HeaderMenu({
  filters,
  moreFilters,
  styles = [],
  clickHandler,
}: headerMenuProps) {
  const [moreCategories, setMoreCategories] =
    React.useState<null | HTMLElement>(null);
  const { searchParams, setSearchParams } = useSearchParamsContext();

  const openMoreCategories = Boolean(moreCategories);

  const handleMoreCategoriesClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMoreCategories(event.currentTarget);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreCategories(null);
    const filter: OtherFilters = {};
    filter.page = 1;
    const categoryValue = event.currentTarget.textContent;
    if (categoryValue !== "All" && categoryValue) {
      filter.category = categoryValue;
    } else if (categoryValue === "All") {
      filter.category = "general";
    } else if (!categoryValue) {
      filter.category = searchParams.get("category");
    }
    setSearchParams(filter as URLSearchParams);
    localStorage.removeItem("countryName");
    localStorage.removeItem("q");
  };

  const setSelectedCategoryStyles = (filter: string) => {
    if (filter === searchParams.get(filter)) {
      return 1;
    }
    return "none";
  };

  return (
    <Box sx={[...(Array.isArray(styles) ? styles : [styles])]}>
      {filters.map((filter, index, arr) =>
        index === arr.length - 1 ? (
          <Button
            key={filter}
            id="more-categories-btn"
            aria-controls={
              openMoreCategories ? "more-categories-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={openMoreCategories ? "true" : undefined}
            onClick={handleMoreCategoriesClick}
            sx={{
              my: 2,
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {filter}
            <ArrowDropDownIcon />
          </Button>
        ) : (
          <Button
            key={filter}
            sx={{
              my: 2,
              color: "primary.contrastText",
              display: "block",
              textAlign: "center",
              border: setSelectedCategoryStyles(filter),
            }}
            onClick={clickHandler}
            component={NavLink}
            to={`feed?page=1&category=${filter === "All" ? "general" : filter}`}
          >
            {filter}
          </Button>
        )
      )}
      <Menu
        id="more-categories-menu"
        anchorEl={moreCategories}
        open={openMoreCategories}
        onClose={handleCategoryClick}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {moreFilters.map((filter, index) => (
          <MenuItem
            onClick={handleCategoryClick}
            key={index}
            component={NavLink}
            to={`feed?page=1&category=${filter}`}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default HeaderMenu;
