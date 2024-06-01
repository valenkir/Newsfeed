import React from "react";
import Link from "@mui/material/Link";
import darkLogo from "../assets/images/dark-logo.svg";
import darkLightThemeBtn from "../assets/images/dark-light-theme-icon.svg";
import darkDarkThemeBtn from "../assets/images/dark-dark-theme-icon.svg";
import darkMoreBtn from "../assets/images/dark-more-btn.svg";
import darkMenuBtn from "../assets/images/dark-mobile-menu-icon.svg";
import darkCloseBtn from "../assets/images/dark-close-btn.svg";
import "../assets/css/HeaderWeb.scss";

function Header() {
  const [moreCategories, setMoreCategories] = React.useState<boolean>(false);
  const [mobileCategories, setMobileCategories] =
    React.useState<boolean>(false);

  const handleMoreBtnClick = () => {
    setMoreCategories(moreCategories ? false : true);
  };

  const handleMenuBtnClick = () => {
    setMobileCategories(mobileCategories ? false : true);
    setMoreCategories(false);
  };

  return (
    <header className="Header-header">
      <ul className="d-flex justify-content-around flex-wrap">
        <li className="Header-logo">
          <img src={darkLogo} />
        </li>
        <li className="d-flex flex-column gap-30 justify-content-center align-items-center">
          <h1>NewsFeed</h1>
          <button
            type="button"
            className="icon-btn Header-menu-btn"
            onClick={handleMenuBtnClick}
          >
            <img src={darkMenuBtn} alt="Hamburger menu button" />
          </button>
          <Link
            href="#"
            underline="always"
            className="Header-mobile-filters-btn"
          >
            {"Filters"}
          </Link>
          <ul
            className={`gap-30 align-items-center ${
              mobileCategories
                ? "Header-categories-list-mobile"
                : window.innerWidth < 500
                ? "d-none"
                : "d-flex justify-content-center"
            }`}
          >
            <li>
              <Link href="#" underline="hover">
                {"All"}
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover">
                {"General"}
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover">
                {"Business"}
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover">
                {"Tech"}
              </Link>
            </li>
            <li>
              <Link href="#" underline="always" onClick={handleMoreBtnClick}>
                {"More"}
              </Link>
              <button
                type="button"
                className="icon-btn"
                onClick={handleMoreBtnClick}
              >
                <img src={darkMoreBtn} />
              </button>
            </li>
          </ul>
        </li>
        <li className="d-flex">
          <button type="button" className="icon-btn">
            <img src={darkLightThemeBtn} alt="Light theme icon" />
          </button>
          <button type="button" className="icon-btn">
            <img src={darkDarkThemeBtn} alt="Dark theme icon" />
          </button>
        </li>
      </ul>
      <ul
        className={
          moreCategories
            ? "Header-more-categories-dropdown d-flex flex-column gap-30"
            : "d-none"
        }
      >
        <li>
          <Link href="#" underline="hover">
            {"Science"}
          </Link>
        </li>
        <li>
          <Link href="#" underline="hover">
            {"Sports"}
          </Link>
        </li>
        <li>
          <Link href="#" underline="hover">
            {"Health"}
          </Link>
        </li>
        <li>
          <Link href="#" underline="hover">
            {"Entertainment"}
          </Link>
        </li>
        <button type="button" className="icon-btn" onClick={handleMoreBtnClick}>
          <img
            src={darkCloseBtn}
            alt="Close button"
            className="Header-more-categories-dropdown-close-btn"
          />
        </button>
      </ul>
    </header>
  );
}

export default Header;
