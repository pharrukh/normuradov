export const deleteCookie = (name, path, domain) => {
  if (containsCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? ";path=" + path : "") +
      ((domain) ? ";domain=" + domain : "") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export const containsCookie = (name) => {
  return  document.cookie.split(';').some(c => c.trim().startsWith(name + '='));
}

export const getCookieValue = (name) => {
  if (!containsCookie(name)) {
    return undefined
  }
  const cookieNameAndValue = document.cookie.split(';').find(c => c.trim().startsWith(name + '='));
  const [, value] = cookieNameAndValue.split('=')
  return value
}