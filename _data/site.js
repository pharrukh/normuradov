const isDev = process.env.ELEVENTY_ENV === 'development';

const baseUrl = isDev ? `localhost:8080` : `https://www.normuradov.com/`;

const site = {
  title: "normuradov farrukh's personal blog",
  description: 'thoughts of a problem solver from Samarkand',
  baseUrl,
}

module.exports = site;
