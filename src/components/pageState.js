const pageState = (switchLang = null) => {
  // language
  if (switchLang) {
    switchLang(
      localStorage.getItem("lastChosenLang") ||
      document.documentElement.getAttribute("lang") ||
      "en"
    );
  }

  // theme
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("lastChosenTheme") || "light"
  );

}

export default pageState;