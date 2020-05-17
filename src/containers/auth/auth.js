import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.css';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updatedObject, checkValidity } from '../../shared/utility';

const initialState = {
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

const Auth = props => {
  const [formState, setFormState] = useState(initialState);
  const { buildingBurger,  onSetAuthenticationPath } = props;
  
  useEffect(() => {
    if (!buildingBurger) {
      onSetAuthenticationPath();
    }
  }, [buildingBurger, onSetAuthenticationPath]);

  const formElementArray = () => {
    const form = formState.controls;
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

  
  const isFormValid = (formData) => {
    const findInvalidValue = Object.keys(formData)
      .find(key => formData[key].valid === false);
    return findInvalidValue === undefined;
  };

  const onchangeHandler = (event, inputIndetifier) => {
    const updatedControls = updatedObject(formState.controls, {
      [inputIndetifier]: updatedObject(formState.controls[inputIndetifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, formState.controls[inputIndetifier].validation),
        touched: true
      }),
    });
    const formIsValid = isFormValid(updatedControls);
    setFormState(prevState => ({...prevState, controls: updatedControls, formIsValid }));
  };


  const submitHandler = (event) => {
    event.preventDefault();
    const email = formState.controls.email.value;
    const password = formState.controls.password.value;
    const isSignup = formState.isSignup;
    props.onAuth(email, password, isSignup);
  };

  const switchAuthModeHandler = () => {
    setFormState(preveState => ({...preveState, isSignup: !formState.isSignup }));
  };

  const renderFormInput = () => {
    const formArray = formElementArray();
    return formArray.map(element => (
      <Input
        key={element.id}
        changed={(event) => onchangeHandler(event, element.id)}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        value={element.config.value}
        touched={element.config.touched}/>
    ));
  };

  const errorMessage = () => {
    if (props.error) {
      return <p>{props.error.message}</p>;
    }
    return null;
  };

  let form = (
    <form onSubmit={submitHandler}>
      {renderFormInput()}
      <Button btnType="Success" disabled={!formState.formIsValid}>SUBMIT</Button>
    </form>
  );
  if (formState.loading) {
    form = <Spinner />
  }

  const authRedirect = props.isAuthenticated ? <Redirect to={props.redirectPath} /> : null; 

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage()}
      {form}
      <Button
        btnType="Danger"
        clicked={switchAuthModeHandler}>
        SWITCH TO {formState.isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
  
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    redirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthenticationPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);