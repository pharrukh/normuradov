import React from "react"
import "./noPostsMessage.scss"
import { translations } from '../../constants/translation'
const noPostsMessage = ({ language }) => {
  return (
    <div id="no-posts-message">
      <p>{translations[language]['no-posts']}</p>
    </div>
  )
}

export default noPostsMessage
