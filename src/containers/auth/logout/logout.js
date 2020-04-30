import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

  componentDidMount() {
    this.props.onLogout();
  }

  render () {
    return <Redirect to="/" />;
  }
};

const mapDispacthToProps = dispatch=> {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispacthToProps)(Logout);