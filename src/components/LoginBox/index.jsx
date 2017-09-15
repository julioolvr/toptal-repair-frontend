import React from 'react';
import PropTypes from 'prop-types';

class LoginBox extends React.Component {
  state = {
    username: '',
    password: '',
  };

  login(e) {
    e.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <form onSubmit={e => this.login(e)}>
        <div>Login</div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={this.state.username}
          onChange={e => this.setState({ username: e.target.value })}
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

export default LoginBox;
