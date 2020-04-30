import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/auth/auth';
import Logout from './containers/auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount () {
    this.props.tryAutoLogin();
  }
  render() {
    let routers = (
      <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BugerBuilder}/>
          <Redirect to ="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routers = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BugerBuilder}/>
          <Redirect to ="/" />
        </Switch>
      )
    };
  
    return (
      <BrowserRouter>
        <Layout>
          {routers}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
