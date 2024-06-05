import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import HeaderMenu from "./HeaderMenu";
import darkLogo from "../assets/images/dark-logo.svg";
import darkMoreBtn from "../assets/images/dark-more-btn.svg";
import darkCloseBtn from "../assets/images/dark-close-btn.svg";
import { DarkModeOutlined } from "@mui/icons-material";
import { ClassNames } from "@emotion/react";

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const filters = ["All", "General", "Business", "Tech", "More"];
  const webMenuStyles = { display: { md: "flex", xs: "none" } };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
                    btnColor="black"
                    clickHandler={handleCloseNavMenu}
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
              <img src={darkLogo} alt="NewsFeed logo" />
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
                  btnColor="white"
                  styles={webMenuStyles}
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
