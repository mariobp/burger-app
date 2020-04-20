import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount () {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        totalPrice = param[1];
      } else {
        ingredients[param[0]] = +param[1]; // plus(+) sign to convert it into a number
      }
    }
    this.setState({ ingredients, totalPrice });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contant-data');
  }

  render () {
   return (
    <div>
      <CheckoutSummary
        ingredients={this.state.ingredients}
        checkoutCancelled={this.checkoutCancelledHandler}
        checkoutContinued={this.checkoutContinuedHandler}/>
        <Route
          path={this.props.match.path + '/contant-data'}
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
    </div>
   );
  }
}

export default Checkout;