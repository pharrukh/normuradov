// ! component uses IconSystem, do not forget to include

import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import "./header.scss"

const Header = ({ siteTitle }) => {
  const [hidden, setHidden] = useState(false)


  // changing theme: light <-> dark
  const changeTheme = event => {
    event.preventDefault()
    const theme = document.documentElement.getAttribute("data-theme") || "light"

    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "dark" : "light"
    )

    localStorage.setItem(
      "lastChosenTheme",
      document.documentElement.getAttribute("data-theme")
    )
  }

  // header links data
  const linksData = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "archives",
      path: "/archives",
    },
    {
      name: "about",
      path: "/about",
    },
  ]

  const logo =
    <svg className="logo" onClick={changeTheme}>
      <use href="#icon-logo" />
    </svg>


  const title = <h1>
    <Link to="/">{siteTitle}</Link>
  </h1>


  const links = data =>
    <nav>
      {data.map(({ path, name }, i) => (
        <Link to={path} activeClassName="nav-active" key={i}>
          {name}
        </Link>
      ))}
    </nav>


  return (
    <header className={hidden ? "header-mobile--hidden" : ""}>
      {logo}
      {title}
      {links(linksData)}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
