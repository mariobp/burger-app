import React, { Component } from 'react';
import Aux from '../Auxiliary/auxiliary';
import clases from './Layout.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSiderDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={clases.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  };
}
export default Layout;
