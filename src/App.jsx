import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import LoginBox from './components/LoginBox';
import RepairsList from './components/RepairsList';

function App({ isUserAuthenticated }) {
  return (
    <Router>
      <Layout isUserAuthenticated={isUserAuthenticated}>
        <Route
          exact
          path="/"
          render={() => <Redirect to={isUserAuthenticated ? '/repairs' : '/login'} />}
        />

        <Route
          path="/login"
          render={() => (isUserAuthenticated ? <Redirect to="/" /> : <LoginBox />)}
        />

        <PrivateRoute path="/repairs" component={RepairsList} />
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
