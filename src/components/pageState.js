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

  // GA
  if (localStorage.getItem("GA-allowance") === "allow") {
    window['ga-disable-GA_MEASUREMENT_ID'] = false;
  }
}

export default pageState;