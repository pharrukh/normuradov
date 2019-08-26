// ! component uses IconSystem, do not forget to include

import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import "./header.scss";

import Socials from "components/socials/Socials";

const Header = ({ siteTitle }) => {

  const changeTheme = () => {
    const theme = document.documentElement.getAttribute("data-theme") || "light";

    document.documentElement.setAttribute(
      "data-theme",
      (theme === "light") ? "dark" : "light"
    );

    localStorage.setItem(
      "lastChosenItem",
      document.documentElement.getAttribute("data-theme")
    );

  }

  return (
    <header>
      <svg className="logo" onClick={changeTheme}>
        <use href="#icon-logo" />
      </svg>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
      <Socials />    
    </header>
  );  
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
