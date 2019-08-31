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
  const permission = localStorage.getItem("GA-allowance")
  if (permission === "false") {
    window['ga-disable-GA_MEASUREMENT_ID'] = true;
  }
}

export default pageState;