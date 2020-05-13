import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type:  actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FECTH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrderFail = (error) => {
  return {
    type: actionTypes.FECTH_ORDERS_FAIL,
    error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FECTH_ORDERS_START
  };
};

export const fetchOrder = (token, userId) => {
  return {
    type: actionTypes.FECTH_ORDERS,
    token,
    userId
  };
};

