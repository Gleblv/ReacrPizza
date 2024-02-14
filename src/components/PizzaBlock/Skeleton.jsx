import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#e7f6ff"
    {...props}>
    <circle cx="135" cy="124" r="125" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="309" rx="10" ry="10" width="280" height="88" />
    <rect x="128" y="414" rx="22" ry="22" width="152" height="45" />
    <rect x="0" y="424" rx="10" ry="10" width="90" height="27" />
    <rect x="57" y="432" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
);

export default MyLoader;
