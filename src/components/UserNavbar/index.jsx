import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import userPropType from '../../proptypes/user';
import { logout } from '../../ducks/auth';

function UserNavbar({ user, onLogout }) {
  return (
    <div>
      Oh hi {user.email}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

UserNavbar.propTypes = {
  user: userPropType.isRequired,
  onLogout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

const mapDispatchToProps = {
  onLogout: logout,
};

export { UserNavbar };
export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);
