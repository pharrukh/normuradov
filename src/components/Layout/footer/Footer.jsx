import React from "react";
import { Link } from "gatsby";

import "./footer.scss";

import Socials from "components/socials/Socials";
import LangSwitcher from "components/langSwitcher/LangSwitcher";

const Footer = (props) => (
  <footer>
    <Socials />
    <div className="copyright">
      <span>Copyright © {new Date().getFullYear()}, </span>
      <span>Farrukh Normuradov</span> 
    </div>
    <div className="language">
      <LangSwitcher switchLang={props.switchLang} />
    </div>
  </footer>
);

export default Footer;