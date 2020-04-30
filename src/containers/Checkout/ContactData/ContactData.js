import React, { Component } from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updatedObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZipCode'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: '', displayValue: '---' },
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    const orderForm = this.state.orderForm;
    const formData = Object.keys(orderForm)
      .reduce((acc, cur) => {
        acc[cur] = orderForm[cur].value;
        return acc;
      }, {});
    
    const orderData = {
      ...formData,
      ingredients: this.props.ingredients,
      price: this.props.price,
      userId: this.props.userId
    };

    this.props.onOderBurger(orderData, this.props.token);
  }

  isFormValid(formData) {
    const findInvalidValue = Object.keys(formData)
      .find(key => formData[key].valid === false);
    return findInvalidValue === undefined;
  }

  onchangeHandler = (event, inputIndetifier) => {
   
    const value = event.target.value;
    const updatedFormElement = updatedObject(this.state.orderForm[inputIndetifier], {
      value: value,
      valid: checkValidity(value, this.state.orderForm[inputIndetifier].validation),
      touched: true,
    });
    const updateOrderForm = updatedObject(this.state.orderForm, {
      [inputIndetifier]: updatedFormElement,
    });
    const formIsValid = this.isFormValid(updateOrderForm);
    this.setState({ orderForm: updateOrderForm, formIsValid });
  }

  formElementArray = () => {
    const orderForm = this.state.orderForm;
    const formElementArray = Object.keys(orderForm)
      .reduce((acc, cur) => {
        acc.push({
          id: cur,
          config: orderForm[cur]
        });
        return acc;
      }, []);
    return formElementArray;
  }

  renderForm = () => {
    const formElementArray = this.formElementArray();
    return formElementArray.map(element => (
      <Input
        key={element.id}
        changed={(event) => this.onchangeHandler(event, element.id)}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        value={element.config.value}
        touched={element.config.touched}/>
    ));
  }

  render () {
    let form = <Spinner />;
    if (!this.props.loading) {
      form = (
        <form>
          {this.renderForm()}
          <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispacthToProps = dispatch => {
  return {
    onOderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  }
};

export default connect(mapStateToProps, mapDispacthToProps)(withErrorHandler(ContactData, axios));