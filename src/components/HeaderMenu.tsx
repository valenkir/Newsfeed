import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface headerMenuProps {
  filters: string[];
  moreFilters: string[];
  btnColor: string;
  styles?: SxProps<Theme>;
  clickHandler?: any;
}
function HeaderMenu({
  filters,
  moreFilters,
  btnColor,
  styles = [],
  clickHandler,
}: headerMenuProps) {
  const [moreCategories, setMoreCategories] =
    React.useState<null | HTMLElement>(null);
  const openMoreCategories = Boolean(moreCategories);

  const handleMoreCategoriesClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMoreCategories(event.currentTarget);
  };

  const handleMoreCategoriesClose = () => {
    setMoreCategories(null);
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
            sx={{ my: 2, color: btnColor, display: "block" }}
          >
            {filter}
          </Button>
        ) : (
          <Button
            key={filter}
            sx={{ my: 2, color: btnColor, display: "block" }}
            onClick={clickHandler}
            component={NavLink}
            to={`${filter}`}
          >
            {filter}
          </Button>
        )
      )}
      <Menu
        id="more-categories-menu"
        anchorEl={moreCategories}
        open={openMoreCategories}
        onClose={handleMoreCategoriesClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {moreFilters.map((filter, index) => (
          <MenuItem
            onClick={handleMoreCategoriesClose}
            key={index}
            component={NavLink}
            to={`${filter}`}
          >
            {filter}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default HeaderMenu;
