import React, { useState, useEffect } from "react"
import "./gdpr.scss"

const GDPR = props => {
  const [hidden, setHidden] = useState(false)
  // const [ allowed, setAllowed ] = useState(false);

  const isBrowser = typeof window !== `undefined`

  const allowanceGA = event => {
    document.body.classList.remove("body--darkened")

    setHidden(true)
    if (isBrowser) {
      const userDesitionForGoogleAnalytics = event.target.value
      // disable GA
      window["ga-disable-GA_MEASUREMENT_ID"] =
        userDesitionForGoogleAnalytics !== "allow"
      // remember the choice (here -> was it allowed or not)
      localStorage.setItem("GA-allowance", userDesitionForGoogleAnalytics)
    }
  }

  useEffect(() => {
    // if (localStorage.getItem("GA-allowance") === true) {
    //   setHidden(true);
    // }

    hidden
      ? document.body.classList.remove("body--darkened")
      : document.body.classList.add("body--darkened")
  })

  const header = () => (
    <div className="gdpr-header">
      <h3>This website uses cookies</h3>
      <h4>
        Cookie declaration last updated
        <time dateTime="29-08-2019"> 29/08/2019</time>
      </h4>
    </div>
  )

  const message = () => (
    <div className="gdpr-info">
      <p>
        To be effective I need to know what how many people attend to read my
        blog. For that reason I use Google Analytics. The tool, though, is
        anonymizing your data so that it is impossible to identify a person. You
        can learn more{" "}
        <a href="https://blog.mailchimp.com/gdpr-tools-from-mailchimp/">here</a>
        .
      </p>
      <p>
        The private data is limited to emails and that is maintained by GDPR
        complianed service, MailChimp.
      </p>
    </div>
  )

  const acceptance = () => (
    <div className="gdpr-allowence">
      <div className="buttons">
        <button onClick={allowanceGA} value={"allow"}>
          allow
        </button>
        <button onClick={allowanceGA} value={"disallow"}>
          refuse
        </button>
      </div>
    </div>
  )

  return (
    <div id="gdpr" className={hidden ? "" : "gdpr--show"}>
      {header()}
      {message()}
      {acceptance()}
    </div>
  )
}

export default GDPR
