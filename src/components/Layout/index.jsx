import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';

import UserNavbar from '../UserNavbar';

function Layout({ isUserAuthenticated, children }) {
  return (
    <g.Div
      height="100vh"
      padding="3em"
      boxSizing="border-box"
      backgroundColor="#99ddff"
      color="#333"
    >
      {isUserAuthenticated ? <UserNavbar /> : null}
      {children}
    </g.Div>
  );
}

Layout.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Layout;
