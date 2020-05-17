import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BugerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/auth/logout/logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Order = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/auth/auth');
});

const App = props => {
  const { tryAutoLogin } = props;
  useEffect(() => {
    tryAutoLogin();

  }, [tryAutoLogin]);

  let routers = (
    <Switch>
        <Route path="/auth" render={(props) => <Auth {...props}/>}/>
        <Route path="/" exact component={BugerBuilder}/>
        <Redirect to ="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routers = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
        <Route path="/orders" render={(props) => <Order {...props}/>}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" render={(props) => <Auth {...props}/>}/>
        <Route path="/" exact component={BugerBuilder}/>
        <Redirect to ="/" />
      </Switch>
    )
  };

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routers}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
  
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
