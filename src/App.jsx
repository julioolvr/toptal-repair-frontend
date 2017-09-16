import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout';
import LoginBox from './components/LoginBox';
import RepairsList from './components/RepairsList';

// TODO: Generic component for routes that require authentication
function App({ isUserAuthenticated }) {
  return (
    <Router>
      <Layout isUserAuthenticated={isUserAuthenticated}>
        <Route
          exact
          path="/"
          render={() =>
            (isUserAuthenticated ? <Redirect to="/repairs" /> : <Redirect to="/login" />)}
        />

        <Route
          path="/login"
          render={() => (isUserAuthenticated ? <Redirect to="/" /> : <LoginBox />)}
        />

        <Route
          path="/repairs"
          render={() => (isUserAuthenticated ? <RepairsList /> : <Redirect to="/login" />)}
        />
      </Layout>
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
