import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

interface headerMenuProps {
  filters: string[];
  btnColor: string;
  styles?: SxProps<Theme>;
  clickHandler?: any;
}
function HeaderMenu({
  filters,
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
        <MenuItem onClick={handleMoreCategoriesClose}>Science</MenuItem>
        <MenuItem onClick={handleMoreCategoriesClose}>Sports</MenuItem>
        <MenuItem onClick={handleMoreCategoriesClose}>Health</MenuItem>
        <MenuItem onClick={handleMoreCategoriesClose}>Entertainment</MenuItem>
      </Menu>
    </Box>
  );
}

export default HeaderMenu;
