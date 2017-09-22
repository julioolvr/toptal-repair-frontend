import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

function PrivateRoute({ isAuthenticated, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: routeProps.location },
              }}
            />
          );
        }

        return Component ? <Component {...routeProps} /> : render(routeProps);
      }}
    />
  );
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func,
  render: PropTypes.func,
};

PrivateRoute.defaultProps = {
  component: undefined,
  render: () => {
    throw new Error('Either `component` or `render` must be provided as prop');
  },
};

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
