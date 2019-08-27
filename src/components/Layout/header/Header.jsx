// ! component uses IconSystem, do not forget to include

import React, { useState } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import "./header.scss";

import { useScrollPosition } from "components/Layout/upButton/scroll.js";

const Header = ({ siteTitle }) => {

  const [ hidden, setHidden ] = useState(false);
  
  // hiding mobile header
  useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y < prevPos.y;
    if (isShow !== hidden) { setHidden(isShow) }
  }, [hidden]); 

  // changing theme: light <-> dark
  const changeTheme = event => {
    event.preventDefault();
    const theme = document.documentElement.getAttribute("data-theme") || "light";

    document.documentElement.setAttribute(
      "data-theme",
      (theme === "light") ? "dark" : "light"
    );

    localStorage.setItem(
      "lastChosenTheme",
      document.documentElement.getAttribute("data-theme")
    );

  }

  // header links data
  const linksData = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Archives",
      path: "/archives",
    },
    {
      name: "About",
      path: "/about",
    }
  ]

  const logo = () => (
    <svg className="logo" onClick={changeTheme}>
      <use href="#icon-logo" />
    </svg>
  );

  const title = () => (
    <h1>
      <Link to="/">
        {siteTitle}
      </Link>
    </h1>
  );

  const links = data => (
    <nav>
      {data.map((link, i) => 
        <Link to={link.path} key={i}>
          {link.name}
        </Link>
      )}
    </nav>
  );

  return (
    <header className={(hidden) ? "header-mobile--hidden" : ""} >
      {logo()}
      {title()}
      {links(linksData)} 
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
