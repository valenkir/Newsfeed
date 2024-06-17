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
import { OtherFilters } from "../interfaces/FilterInterfaces";
import { Avatar, Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useThemeContext } from "../context/Theme";
import HeaderMenu from "./HeaderMenu";
import useSearchParamsContext from "../hooks/useSearchParamsContext";
import useResetTabOnNavToLanding from "../hooks/useResetTabOnNavToLanding";
import darkLogo from "../assets/images/dark-logo.svg";
import lightLogo from "../assets/images/light-logo.svg";

export const filters = [
  "All",
  "Business",
  "Technology",
  "Science",
  "Health",
  "Sports",
  "Entertainment",
];
//export const moreFilters = ["Health", "Sports", "Entertainment"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { changeTab, setSearchParams, tab } = useSearchParamsContext();
  useResetTabOnNavToLanding();
  const { theme, changeTheme } = useThemeContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
  };

  const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    const filter: OtherFilters = {};
    filter.page = 1;
    const categoryValue = event.currentTarget.textContent;
    if (categoryValue !== "All" && categoryValue) {
      filter.category = categoryValue;
    } else if (categoryValue === "All") {
      filter.category = "general";
    }
    if (categoryValue) {
      sessionStorage.setItem("categoryTab", categoryValue);
      changeTab(categoryValue);
    }
    setSearchParams(filter as URLSearchParams);
    localStorage.removeItem("countryName");
    localStorage.removeItem("q");
  };

  const handleThemeChange = (event: React.MouseEvent<HTMLElement>) => {
    const themeBtn = event.currentTarget.getAttribute("data-value");
    if (themeBtn) {
      changeTheme(themeBtn);
    }
  };

  const handleLogoClick = () => {
    changeTab(null);
  };

  const webMenuStyles = {
    display: { md: "flex", xs: "none" },
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ bgcolor: "primary.main", p: 2, boxSizing: "border-box" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
              <Typography
                variant="h1"
                color="primary.contrastText"
                component={NavLink}
                to={`/`}
              >
                NewsFeed
              </Typography>
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
                  color="secondary"
                  aria-label="menu"
                  onClick={handleOpenNavMenu}
                  sx={{ mr: 2, color: "primary.contrastText" }}
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
                    clickHandler={handleClickFilter}
                    tab={tab}
                    bgColor="secondary.light"
                  />
                </Menu>
                <ToggleButtonGroup
                  color="primary"
                  value={theme}
                  exclusive
                  onChange={handleThemeChange}
                  aria-label="Platform"
                >
                  <ToggleButton value="light" data-value="light">
                    <LightModeIcon
                      sx={{ fontSize: 36, color: "primary.contrastText" }}
                    />
                  </ToggleButton>
                  <ToggleButton value="dark" data-value="dark">
                    <ModeNightIcon
                      sx={{ fontSize: 36, color: "primary.contrastText" }}
                    />
                  </ToggleButton>
                </ToggleButtonGroup>
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
                component={NavLink}
                to={`/`}
                onClick={handleLogoClick}
                startIcon={
                  <Avatar
                    src={
                      localStorage.getItem("theme") === "dark"
                        ? darkLogo
                        : lightLogo
                    }
                    sx={{ width: 60, height: 60 }}
                  />
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
                <Typography variant="h1" color="primary.contrastText">
                  NewsFeed
                </Typography>
                <HeaderMenu
                  filters={filters}
                  styles={webMenuStyles}
                  clickHandler={handleClickFilter}
                  tab={tab}
                  bgColor="secondary.dark"
                />
              </Box>
              <ToggleButtonGroup
                color="primary"
                value={theme}
                exclusive
                onChange={handleThemeChange}
                aria-label="Platform"
              >
                <ToggleButton value="light" data-value="light">
                  <LightModeIcon
                    sx={{ fontSize: 36, color: "primary.contrastText" }}
                  />
                </ToggleButton>
                <ToggleButton value="dark" data-value="dark">
                  <ModeNightIcon
                    sx={{ fontSize: 36, color: "primary.contrastText" }}
                  />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
