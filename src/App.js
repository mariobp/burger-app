import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrder = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/auth/auth');
});

class App extends Component {
  componentDidMount () {
    this.props.tryAutoLogin();
  }
  render() {
    let routers = (
      <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BugerBuilder}/>
          <Redirect to ="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routers = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrder}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
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
