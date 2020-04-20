import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    email: '',
    name: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,

  };

  orderHandler = (event) => {
    event.preventDefault();
     const data = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      constumer: {
        name: 'Mario Barrios',
        address: {
          street: 'Teststreet 1',
          zipCode: '122111',
          country: 'Colombia'
        },
        email: 'mariobarrpach@gmail.com'
      }
    };
    this.setState({ loading: true });
    axios.post('/orders.json', data)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render () {
    let form = <Spinner />;
    if (!this.state.loading) {
      form = (
        <form>
          <input type="text" name="name" placeholder="Your Name"/>
          <input type="email" name="email" placeholder="Your Email"/>
          <input type="text" name="street" placeholder="Street"/>
          <input type="text" name="postalcode" placeholder="Postal Code"/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      );
    }
    return (
      <div className={classes.ContantData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;