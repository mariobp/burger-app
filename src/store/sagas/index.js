import { takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckSaga } from './auth';
import { fetchIngridientsSaga } from './burguerBuilder';
import { fetchOrderSaga, purchaseBurger } from './order';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckSaga)
};

export function* watchBurguerBuilder() {
  yield takeEvery(actionTypes.FECTH_INGREDIENTS, fetchIngridientsSaga);
};

export function* watchOrder() {
  yield takeLatest(actionTypes.FECTH_ORDERS, fetchOrderSaga);
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger);
};