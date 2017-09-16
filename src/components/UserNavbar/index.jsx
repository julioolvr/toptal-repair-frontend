import React from 'react';
import { connect } from 'react-redux';

import userPropType from '../../proptypes/user';

function UserNavbar({ user }) {
  return <div>Oh hi {user.email}</div>;
}

UserNavbar.propTypes = {
  user: userPropType.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export { UserNavbar };
export default connect(mapStateToProps)(UserNavbar);
