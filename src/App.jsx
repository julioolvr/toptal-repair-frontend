import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'react-dates/lib/css/_datepicker.css';

import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import LoginBox from './components/LoginBox';
import AddRepair from './components/AddRepair';
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

        <PrivateRoute exact path="/repairs" component={RepairsList} />
        <PrivateRoute
          exact
          path="/repairs/add"
          render={({ history }) => <AddRepair onCancel={() => history.push('/repairs')} />}
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
