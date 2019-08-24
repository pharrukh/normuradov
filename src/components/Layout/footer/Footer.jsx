import React from "react";
import { Link } from "gatsby";

import "./footer.scss";

const Footer = () => (
  <footer>
    <div className="copyright">
      Copyright © {new Date().getFullYear()}, Farrukh Normuradov
    </div>
    <div className="links">
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </footer>
);

export default Footer;