import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import SEO from "components/seo"
import Layout from "components/Layout/layoutMain/LayoutMain"

import pageState from "components/pageState"

import "styles/pages/404.scss"

const NotFoundPage = () => {
  const [language, switchLang] = useState("en")

  useEffect(() => pageState(switchLang))

  const Illustration = () => (
    <svg viewBox="0 0 1545.2343 537.28125" className="page-404-illustration">
      <g transform="translate(-304.48 -524.22)" stroke-width=".8069">
        <path
          d="m1055.4 524.63c-66.913 9.0682-243.64 32.504-265.71 66.969-16.228 25.338 239.81 48.54 114.29 78.13-155.34 36.619-364.51 56.346-540 113.47-277.61 90.374 507.36 226.79 625.71 267.87l860 2.8953c-517.66-100.74-1329-204.58-1151.4-257.75 178.26-53.364 210.37-60.113 374.29-113.47 119.41-38.872-179.97-75.833-214.29-94.872-52.841-29.313 160.33-53.109 212.09-62.703z"
          fill="#333"
          stroke="#000"
        />
        <path
          d="m1061.4 525.29c-22.438 2.9834-44.852 6.1552-67.223 9.6106-27.334 4.2218-54.619 8.8144-81.73 14.327-12.44 2.5297-24.846 5.2536-37.153 8.3933l-9e-5 2e-5c-10.046 2.5625-20.057 5.3581-29.813 8.9326l-4e-5 1e-5c-3.7349 1.3683-7.4386 2.857-11.027 4.6121-2.7282 1.3324-5.4244 2.8162-7.8597 4.7046-1.6862 1.2921-3.3282 2.8502-4.2648 4.8983-0.36149 0.80037-0.5764 1.684-0.57348 2.5922 0.01 0.91279 0.24301 1.8017 0.63558 2.6l3e-5 5e-5c0.39414 0.78287 0.97079 1.3998 1.5584 1.9125 0.83112 0.73952 1.7393 1.3582 2.6556 1.9209 2.6623 1.6381 5.5018 2.9222 8.3392 4.1231 3.9098 1.657 7.8898 3.1267 11.884 4.5278l1e-4 3e-5c4.8972 1.718 9.8301 3.3246 14.775 4.8814 11.785 3.7101 23.65 7.1472 35.517 10.549 12.976 3.7191 25.967 7.3744 38.928 11.118 12.336 3.5629 24.65 7.1882 36.864 11.104 9.9022 3.1756 19.757 6.4699 29.295 10.493 3.4447 1.454 6.8369 2.9898 10.052 4.8048v3e-5c2.2118 1.2617 4.3551 2.5535 5.9671 4.2844 0.5213 0.56965 0.9738 1.1354 1.2012 1.7304 0.1664 0.43977 0.2437 0.89906 0.1382 1.2595v6e-5c-0.075 0.4223-0.4063 0.85461-0.8083 1.2736-0.5939 0.59351-1.3855 1.0566-2.2422 1.4948-0.9272 0.46628-1.9467 0.83651-3.0034 1.2229v1e-5c-1.679 0.61021-3.385 1.1709-5.1036 1.7206-5.2281 1.6718-10.509 3.2046-15.804 4.7169-16.68 4.7636-33.454 9.2173-50.242 13.638-48.619 12.804-97.374 25.099-146.14 37.353l-4e-5 1e-5c-50.738 12.749-101.51 25.376-152.27 38.034-19.308 4.8146-38.618 9.6302-57.918 14.493-11.615 2.9264-23.253 5.825-34.854 8.9349-7.3062 1.9558-14.594 4.2108-21.665 7.1554l-9e-5 4e-5c-5.0186 2.0788-10.033 4.5464-14.556 7.9345-1.6908 1.2674-3.318 2.7066-4.7708 4.373l-3e-5 4e-5c-1.2161 1.3904-2.2929 2.9767-3.1015 4.7585l-5e-5 1.1e-4c-0.72004 1.5972-1.1724 3.3331-1.295 5.1278-0.11148 1.7955 0.10606 3.5677 0.58803 5.2363 1.1859 3.9753 3.5048 7.3108 6.0735 10.079 3.4907 3.8264 7.5152 6.9984 11.626 9.8355 5.3694 3.7193 11.01 6.9588 16.723 9.9539 7.0322 3.6896 14.224 7.0252 21.475 10.163l4e-5 2e-5c18.235 7.8906 36.916 14.625 55.69 20.915l1e-4 3e-5c23.157 7.7595 46.54 14.79 70.005 21.456l9e-5 2e-5c56.206 15.966 112.95 29.906 169.83 43.101 62.324 14.459 124.87 27.914 187.51 40.845 59.467 12.275 119.03 24.054 178.65 35.549 47.715 9.2005 95.463 18.192 143.2 27.203l1e-4 1e-4c16.673 3.1474 33.339 6.292 49.982 9.5149 6.0486 1.1714 12.089 2.3521 18.116 3.5657 4.3409 0.8742 8.6596 1.7561 12.944 2.6995l2.1252-9.7716c-4.3879-0.9427-8.7693-1.8149-13.133-2.6704-6.0698-1.1904-12.14-2.3453-18.206-3.4883-16.69-3.145-33.386-6.2085-50.074-9.2719-47.784-8.7714-95.564-17.52-143.3-26.476-59.644-11.19-119.23-22.662-178.72-34.629-62.664-12.607-125.22-25.734-187.54-39.863-56.883-12.897-113.59-26.524-169.74-42.169l-5e-5 -1e-5c-23.439-6.5316-46.768-13.418-69.85-21.024l-1e-4 -3e-5c-18.722-6.1708-37.287-12.755-55.352-20.468l-9e-5 -4e-5c-7.1808-3.0659-14.268-6.308-21.163-9.8836-5.6069-2.9094-11.079-6.0094-16.219-9.5382-3.9422-2.7162-7.6865-5.6104-10.79-9.0091-2.2395-2.5-4.1947-5.1463-4.9839-8.0247-0.33464-1.1651-0.49716-2.3611-0.42176-3.5087 0.0641-1.1449 0.36642-2.304 0.84622-3.3969 0.53965-1.241 1.3475-2.4199 2.2947-3.5345l6e-5 -7e-5c1.1431-1.3394 2.5083-2.547 3.9842-3.6764 3.9826-3.0494 8.6299-5.3371 13.446-7.3876l9e-5 -4e-5c6.7657-2.8646 13.84-5.0866 21.019-7.0529 11.53-3.1534 23.132-6.1046 34.74-9.0917l1e-4 -3e-5c19.268-4.9581 38.55-9.87 57.834-14.782 50.699-12.913 101.41-25.795 152.09-38.801l1e-4 -2e-5c48.709-12.5 97.414-25.044 145.99-38.097 16.77-4.5064 33.539-9.0495 50.225-13.905 5.2945-1.5407 10.592-3.1077 15.853-4.8189 1.7285-0.56208 3.4612-1.1416 5.1833-1.7769 1.0597-0.38864 2.1611-0.80054 3.2474-1.3471l1e-4 -2e-5c0.972-0.48173 1.9587-1.091 2.826-1.9312 0.6404-0.60394 1.1821-1.4188 1.4406-2.4183v-7e-5c0.2012-0.94632 0.082-1.8789-0.2612-2.6808-0.4178-0.97604-1.0283-1.7777-1.6757-2.4404-1.9283-2.0026-4.2587-3.4232-6.5348-4.6778l-1e-4 -5e-5c-3.3422-1.8615-6.8188-3.4174-10.308-4.8668-9.6627-4.0163-19.592-7.2822-29.527-10.411-12.266-3.8643-24.615-7.433-36.975-10.935l-4e-5 -1e-5c-12.988-3.6805-25.998-7.2706-38.987-10.923-11.882-3.3409-23.75-6.7142-35.531-10.358-4.9433-1.529-9.8692-3.106-14.755-4.7925-3.9869-1.3764-7.9467-2.8156-11.826-4.4371-2.8228-1.1816-5.6089-2.4208-8.183-3.991-0.88459-0.54072-1.7348-1.1098-2.4826-1.7729-0.5266-0.47707-1.0068-0.96078-1.27-1.5154-0.31819-0.64793-0.51246-1.354-0.51782-2.0526s0.16254-1.4084 0.45392-2.0745c0.75987-1.7624 2.2729-3.174 3.8746-4.4486 2.3221-1.8255 4.9426-3.28 7.6291-4.6135 3.5283-1.7488 7.1888-3.2407 10.895-4.6205l9e-5 -4e-5c9.6826-3.6042 19.648-6.4402 29.667-9.0505 12.271-3.1963 24.65-5.9796 37.069-8.5703 27.065-5.6459 54.32-10.374 81.63-14.733 22.351-3.5674 44.748-6.8518 67.17-9.948z"
          fill="#fff"
          stroke="#fff"
        />
      </g>
    </svg>
  )

  return (
    <div id="page-404">
      <Layout>
        <SEO title="404: Not found" />
        <h2>Nothing useful here!</h2>
        <Illustration />
        <p>It was the wrong turn, I guess...</p>
        <p>
          You may find what you was looking for in{" "}
          <Link to="/archives">archives</Link>!
        </p>
      </Layout>
    </div>
  )
}

export default NotFoundPage
