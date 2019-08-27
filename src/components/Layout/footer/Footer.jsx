import React from "react";
import { Link } from "gatsby";

import "./footer.scss";

import Socials from "components/socials/Socials";
import LangSwitcher from "components/langSwitcher/LangSwitcher";

const Footer = (props) => (
  <footer>
    <Socials />
    <div className="copyright">
      Copyright © {new Date().getFullYear()}, Farrukh Normuradov
    </div>
    <div className="language">
      <LangSwitcher switchLang={props.switchLang} />
    </div>
  </footer>
);

export default Footer;