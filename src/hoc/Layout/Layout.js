import React, { useState } from 'react';
import Aux from '../Auxiliary/auxiliary';
import clases from './Layout.css';
import Toolbar from '../../components/UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props =>  {
  const [showSiderDrawer, setShowSiderDrawer] = useState(false);


  const sideDrawerClosedHandler = () => {
    setShowSiderDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSiderDrawer((prevState) => !prevState.showSiderDrawer);
  }

  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer isAuth={props.isAuthenticated} open={showSiderDrawer} closed={sideDrawerClosedHandler}/>
      <main className={clases.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
