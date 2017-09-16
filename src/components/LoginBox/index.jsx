import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../ducks/auth';

class LoginBox extends React.Component {
  state = {
    email: '',
    password: '',
  };

  login(e) {
    e.preventDefault();
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    return (
      <form onSubmit={e => this.login(e)}>
        <div>Login</div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button>Sign in</button>
      </form>
    );
  }
}

LoginBox.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onLogin: login,
};

export { LoginBox };
export default connect(null, mapDispatchToProps)(LoginBox);
