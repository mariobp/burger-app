import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';

const Logout = props => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispacthToProps = dispatch=> {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispacthToProps)(Logout);