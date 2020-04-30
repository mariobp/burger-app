import React, { Component } from 'react';
import Aux from '../Auxiliary/auxiliary';
import clases from './Layout.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSiderDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSiderDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSiderDrawer: !prevState.showSiderDrawer };
    });
  }

  render () {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSiderDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={clases.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
