import React from "react"

import "./langSwitcher.scss"

const LangSwitcher = props => {
  const languages = ["en", "de", "ru", "uz"]

  // need during build time...
  const isBrowser = typeof window !== `undefined`

  const handleChange = event => {
    event.preventDefault()
    const root = document.documentElement
    const option = event.target.value
    root.setAttribute("lang", option)
    if (isBrowser) localStorage.setItem("lastChosenLang", option)
    props.switchLang(option)
  }

  return (
    <div id="lang-switcher">
      <label htmlFor="lang-switcher-form">Language:</label>
      <select
        if="lang-switcher-form"
        onChange={handleChange}
        defaultValue={
          isBrowser
            ? localStorage.getItem("lastChosenLang") ||
              document.documentElement.getAttribute("lang") ||
              "en"
            : "en"
        }
      >
        {languages.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LangSwitcher
