import React, { useState, useEffect } from "react";
import "./gdpr.scss";


const GDPR = props => {

  const [ hidden, setHidden ] = useState(false);

  const handleButton = event => {
    // event.preventDefaut();
    setHidden(!hidden);
    document.body.classList.remove("body--darkened");
    console.log(event.target.value);
  }

  useEffect(() => {
    (!hidden) 
    ? document.body.classList.add("body--darkened")
    : document.body.classList.remove("body--darkened");
  });

  const header = () => (
    <div className="gdpr-header">
      <h3>This website uses cookies</h3>
      <h4>Cookie declaration last updated
        <time dateTime="29-08-2019"> 29/08/2019</time>      
      </h4>
    </div>    
  );

  const message = () => (
    <div className="gdpr-info">
      <p>
        To be effective I need to know what how many people attend to read my blog.
        For that reason I use Google Analytics.
        The tool, though, is anonymizing your data so that it is impossible to identify a person.
        You can learn more <a href="https://blog.mailchimp.com/gdpr-tools-from-mailchimp/">here</a>.
      </p>
      <p>
        The private data is limited to emails and that is maintained by GDPR complianed service, MailChimp.
      </p>
    </div>
  );

  const acceptance = () => (
    <div className="gdpr-allowence">
      <div className="buttons">
        <button onClick={handleButton} value="true">Allow</button>
        <button onClick={handleButton} value="false">Refuse</button>
      </div>      
    </div>
  );

  const form = () => (
    <div className="gdpr-form">
      <fieldset>
        <legend>Change your cookie settings:</legend>
        <form>
          <input id="gdpr-mail" type="checkbox"></input>
          <label htmlFor="gdpr-mail"></label>
          <p>email</p>          
        </form>
      </fieldset>
    </div>
  );

  return (
    <div id="gdpr" className={ (hidden) ? "gdpr--hidden" : "" }>
      {header()}
      {message()}
      {acceptance()}
      {form()}
    </div>
  );
};

export default GDPR;
