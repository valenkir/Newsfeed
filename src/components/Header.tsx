import React from "react";
import Link from "@mui/material/Link";
import darkLogo from "../assets/images/dark-logo.svg";
import darkLightThemeBtn from "../assets/images/dark-light-theme-icon.svg";
import darkDarkThemeBtn from "../assets/images/dark-dark-theme-icon.svg";
import darkMoreBtn from "../assets/images/dark-more-btn.svg";
import "../assets/css/HeaderWeb.scss";

function Header() {
  const [moreCategories, setMoreCategories] = React.useState<boolean>(false);

  const handleMoreBtnClick = () => {
    setMoreCategories(moreCategories ? false : true);
  };

  return (
    <header className="Header-header">
      <ul className="d-flex justify-content-around">
        <li>
          <img src={darkLogo} />
        </li>
        <li className="d-flex flex-column gap-30 justify-content-center align-items-center">
          <h1>NewsFeed</h1>
          <ul className="d-flex gap-46 justify-content-center align-items-center">
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
              <Link href="#" underline="always">
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
        <li className="Header-mobile-filters-btn">
          <Link href="#" underline="always">
            {"Filters"}
          </Link>
        </li>
      </ul>
      <ul className="HeaderWeb-more-categories-dropdown d-none">
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
      </ul>
    </header>
  );
}

export default Header;
