import React, { useState } from 'react';
import './upButton.scss';

import { useScrollPosition } from "./scroll.js";

const UpButton = () => {
  
  const [ hidden, setHidden ] = useState(true);
  
  useScrollPosition(({ prevPos, currPos }) => {
    const isShow = currPos.y > prevPos.y;
    if (isShow !== hidden) { setHidden(isShow) }
  }, [hidden]);  

  // smooth scroll to top
  const slideUp = () => {
    const speed = 15; // bigger -> slower
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(slideUp);
      window.scrollTo(0, c - c / speed);
    }    
  }
  
  return (
    <button
      className={`up-button ${(hidden) ? "up-button--hidden" : ""}`}
      onClick={slideUp}>
      <svg className="up-button-icon" viewBox="0 0 24 24">
        <path d="M13,18V10L16.5,13.5L17.92,12.08L12,6.16L6.08,12.08L7.5,13.5L11,10V18H13M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
      </svg>
    </button>
  );
}

export default UpButton;