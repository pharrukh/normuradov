import React from "react";
import "./noPostsMessage.scss";

const noPostsMessage = () => {

  /* const emptyMessage = {
    "de": "",
    "en": "",
    "ru": "",
    "uz": "",
  } */

  return (
    <div id="no-posts-message">
      <p>I don't have posts in this language yet.</p>
      <svg>
        <use href="#icon-notepad" />
      </svg>
      <p>Work in progress!</p>
      <p>Come back later!</p>
    </div>
  );
};

export default noPostsMessage;
