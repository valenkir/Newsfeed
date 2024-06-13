import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import HeaderMenu from "./HeaderMenu";
import useSearchParamsContext from "../hooks/useSearchParamsContext";
import { OtherFilters } from "../interfaces/FilterInterfaces";
import darkLogo from "../assets/images/dark-logo.svg";
import { Avatar, Button } from "@mui/material";

export const filters = ["All", "Business", "Technology", "Science", "More"];
export const moreFilters = ["Health", "Sports", "Entertainment"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { searchParams, setSearchParams } = useSearchParamsContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
  };

  const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    const page: OtherFilters = {};
    page.page = 1;
    setSearchParams(page as URLSearchParams);
  };

  const webMenuStyles = { display: { md: "flex", xs: "none" } };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ p: 2 }}>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "none",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 10,
                },
              }}
            >
              <Typography>NewsFeed</Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: "flex",
                    md: "none",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  },
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleOpenNavMenu}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-header"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <HeaderMenu
                    filters={filters}
                    moreFilters={moreFilters}
                    btnColor="black"
                    clickHandler={handleClickFilter}
                  />
                </Menu>
                <LightModeIcon sx={{ fontSize: 36 }} />
                <ModeNightIcon sx={{ fontSize: 36 }} />
              </Box>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                },
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={
                  <Avatar src={darkLogo} component={NavLink} to={`/`} />
                }
              ></Button>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>NewsFeed</Typography>
                <HeaderMenu
                  filters={filters}
                  moreFilters={moreFilters}
                  btnColor="white"
                  styles={webMenuStyles}
                  clickHandler={handleClickFilter}
                />
              </Box>
              <LightModeIcon sx={{ fontSize: 36 }} />
              <ModeNightIcon sx={{ fontSize: 36 }} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
