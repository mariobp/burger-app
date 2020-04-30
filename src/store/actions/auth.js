import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authSuccess = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};
export const checkAuthTimeout = (expirationTime) => {
  console.log(expirationTime);
  
  return dispatch => {
    setTimeout(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('expirationDate');
      sessionStorage.removeItem('userId');
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVFSArTKGrDWNCJK0gAIHrJ4WByIY9Y-4';
    if (isSignUp) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVFSArTKGrDWNCJK0gAIHrJ4WByIY9Y-4';
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        sessionStorage.setItem('token', response.data.idToken);
        sessionStorage.setItem('expirationDate', expirationDate);
        sessionStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      }).catch(error => {        
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const idToken = sessionStorage.getItem('token');
    if (!idToken) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(sessionStorage.getItem('expirationDate'));
      console.log(expirationDate < new Date());
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const localId = sessionStorage.getItem('userId');
        dispatch(authSuccess({ localId, idToken }));
        
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
