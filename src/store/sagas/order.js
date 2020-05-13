import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* fetchOrderSaga(action) {
  yield put(actions.fetchOrderStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'; 
  try {
    const response = yield axios.get('/orders.json' + queryParams);
    const fechedData = [];
    for (let key in response.data) {
      fechedData.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrderSuccess(fechedData));
  } catch (error) {
    yield put(actions.fetchOrderFail(error));
  }
};

export function* purchaseBurger(action) {
  yield put(actions.purchaseBurgerStart());
  const token = action.token;
  const orderData = action.orderData;
  try {
    const response = yield axios.post('/orders.json?auth=' + token, orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
};