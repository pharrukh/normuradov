// ! component uses IconSystem, do not forget to include

import React from "react";
import "./socials.scss";

import { links } from "./links";

const Socials = () => (
  <div className="socials">
    {links.map( (link, i) => (
      <a href={links.link}>
        <svg className="icon">
          <use href={link.icon} />
        </svg>
      </a>
    ))}
  </div>
);

export default Socials;