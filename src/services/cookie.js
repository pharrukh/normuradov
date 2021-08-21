export const deleteCookie = (document, name, path, domain) => {
  if (containsCookie(document, name)) {
    document.cookie = name + "=" +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}


export const getCookieValue = (document, name) => {
  if (!containsCookie(document, name)) {
    return undefined
  }
  const cookieNameAndValue = document.cookie.split(';').find(c => c.trim().startsWith(name + '='));
  const [, value] = cookieNameAndValue.split('=')
  return value
}

const containsCookie = (document, name) => {
  return document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}