import React, { useState, useEffect } from "react"
import "./gdpr.scss"
import { deleteCookie } from '../../services/cookie'

const GDPR = props => {
  const [hidden, setHidden] = useState(false)
  const isBrowser = typeof window !== `undefined`

  const toggleGA = event => {
    document.body.classList.remove("body--darkened")

    setHidden(true)
    if (isBrowser) {
      const userDesitionForGoogleAnalytics = event.target.value
      let numWeeks = 1;
      let now = new Date();
      let oneWeekInFuture = now.setDate(now.getDate() + numWeeks * 7);

      const pluginCookieName = 'gatsby-plugin-google-analytics-gdpr_cookies-enabled'
      const userDecidedCookieName = 'user-decided'
      document.cookie = `${pluginCookieName}=${userDesitionForGoogleAnalytics}; expires=${oneWeekInFuture.toString()}; path=/`
      document.cookie = `${userDecidedCookieName}=true; expires=${oneWeekInFuture.toString()}; path=/`
      const domainName = window.location.hostname === 'localhost' ? 'localhost' : `www.${window.location.hostname}`;
      deleteCookie(document, '_ga', '/', domainName)
      deleteCookie(document, '_gid', '/', domainName)
    }
  }

  useEffect(() => {
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
        To be effective I want to know how many people attend and to read my blog. For that reason I use Google Analytics that is anonymizing your data so that it is impossible to identify a person. You can learn more {" "}<a href="https://privacy.google.com/intl/en_uk/businesses/compliance/">here</a>
      </p>
      <p>
        The private data is limited to emails and that is maintained by GDPR complianed service, MailChimp. You can learn more {" "} <a href="https://mailchimp.com/gdpr/">here</a>.
      </p>
    </div>
  )

  const acceptance = () => (
    <div className="gdpr-allowence">
      <div className="buttons">
        <button onClick={toggleGA} value={true}>
          allow
        </button>
        <button onClick={toggleGA} value={false}>
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
