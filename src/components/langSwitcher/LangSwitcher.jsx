import React from "react";

import "./langSwitcher.scss";

const LangSwitcher = (props) => {

  const languages = [
    "en", "de", "ru", "uz"
  ];  

  const handleChange = event => {
    event.preventDefault();
    //
    const root = document.documentElement;
    const option = event.target.value;
    //    
    root.setAttribute("lang", option);
    // 
    localStorage.setItem("lastChosenLang", option);
    props.switchLang(option);
  }

  return (
    <div id="lang-switcher">
      <label htmlFor="lang-switcher-form">Language:</label>
      <select
        if="lang-switcher-form"
        onChange={ handleChange }
        defaultValue={
          localStorage.getItem("lastChosenLang") ||
          document.documentElement.getAttribute("lang") ||
          "en"
        }
      >
        {languages.map( (option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );  
};

export default LangSwitcher;
