import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import g from 'glamorous';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LoginBox from './components/LoginBox';
import RepairsList from './components/RepairsList';

// TODO: Generic component for routes that require authentication
function App({ isUserAuthenticated }) {
  return (
    <Router>
      <g.Div
        height="100vh"
        padding="3em"
        boxSizing="border-box"
        backgroundColor="#99ddff"
        color="#333"
      >
        <Route
          path="/"
          render={() =>
            (isUserAuthenticated ? (
              <Redirect to="/repairs" />
            ) : (
              <Redirect to="/login" />
            ))}
        />
        <Route path="/login" component={LoginBox} />

        <Route
          path="/repairs"
          render={() =>
            (isUserAuthenticated ? <RepairsList /> : <Redirect to="/login" />)}
        />
      </g.Div>
    </Router>
  );
}

App.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isUserAuthenticated: state.auth.isAuthenticated,
  };
}

export { App };
export default connect(mapStateToProps)(App);
