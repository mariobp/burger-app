import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updatedObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
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
          required: true,
          isEmail: true,
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        }
      },
    },
    formIsValid: false,
    isSignup: false,
  };
  
  componentDidMount() {
    if (!this.props.buildingBurger) {
      this.props.onSetAuthenticationPath();
    }
  }

  formElementArray = () => {
    const form = this.state.controls;
    const formElementArray = Object.keys(form)
      .reduce((acc, cur) => {
        acc.push({
          id: cur,
          config: form[cur]
        });
        return acc;
      }, []);
    return formElementArray;
  };

  onchangeHandler = (event, inputIndetifier) => {
    const updatedControls = updatedObject(this.state.controls, {
      [inputIndetifier]: updatedObject(this.state.controls[inputIndetifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[inputIndetifier].validation),
        touched: true
      }),
    });
    const formIsValid = this.isFormValid(updatedControls);
    this.setState({ controls: updatedControls, formIsValid });
  };

  isFormValid(formData) {
    const findInvalidValue = Object.keys(formData)
      .find(key => formData[key].valid === false);
    return findInvalidValue === undefined;
  };

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    const isSignup = this.state.isSignup;
    this.props.onAuth(email, password, isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  renderFormInput = () => {
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
  };

  errorMessage = () => {
    if (this.props.error) {
      return <p>{this.props.error.message}</p>;
    }
    return null;
  };



  render () {
    let form = (
      <form onSubmit={this.submitHandler}>
        {this.renderFormInput()}
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>SUBMIT</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }

    const authRedirect = this.props.isAuthenticated ? <Redirect to={this.props.redirectPath} /> : null; 

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {this.errorMessage()}
        {form}
        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    redirectPath: state.auth.authRedirectPath
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthenticationPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);