import React from "react";
import { Link } from "gatsby";

import "./footer.scss";

import LangSwitcher from "components/langSwitcher/LangSwitcher";

const Footer = (props) => (
  <footer>
    <div className="copyright">
      Copyright © {new Date().getFullYear()}, Farrukh Normuradov
    </div>
    <div className="links">
      <LangSwitcher switchLang={props.switchLang} />
    </div>
  </footer>
);

export default Footer;