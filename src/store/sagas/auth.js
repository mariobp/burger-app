import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

export function* logoutSaga (action) {
  yield sessionStorage.removeItem('token');
  yield sessionStorage.removeItem('expirationDate');
  yield sessionStorage.removeItem('userId');
  yield put(actions.logoutSuccess());
};

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
};

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  if (action.isSignUp) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  }

  try {
    const response = yield axios.post(url, authData)
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    sessionStorage.setItem('token', response.data.idToken);
    sessionStorage.setItem('expirationDate', expirationDate);
    sessionStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
};

export function* authCheckSaga(action) {
  const idToken = sessionStorage.getItem('token');
  if (!idToken) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(sessionStorage.getItem('expirationDate'));
    if (expirationDate < new Date()) {
      yield put(actions.logout());
    } else {
      const localId = sessionStorage.getItem('userId');
      yield put(actions.authSuccess({ localId, idToken }));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}