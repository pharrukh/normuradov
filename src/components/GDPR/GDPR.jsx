import React from "react";
import "./gdpr.scss";


const GDPR = props => {

  const message = () => {
    <p className="message">
      Please update the subscription list below to reflect the information
      you would like to receive from us in the future and press confirm.  
    </p>
  }

  const emailSub = () => {
    
  }

  const optionsForm = () => {
    
  }

  const submit = () => {
    <button>
      Confirm
    </button>
  }

  return (
    <div id="gdpr">
      {message()}
      {emailSub()}
      {optionsForm()}
      {submit()}
    </div>
  );
};

export default GDPR;
