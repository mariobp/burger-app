import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  }
  return updatedObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    error: false,
    purchased: true
  });
};

const purchaseBurgerFail = (state) => {
  return updatedObject(state, {
    loading: false,
    error: true,
  });
};

const fecthOrdersSuccess = (state, action) => {
  return updatedObject(state, {
    orders: action.orders,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: 
      return updatedObject(state, {purchased: false});
    case actionTypes.PURCHASE_BURGER_START:
      return updatedObject(state, {loading: true});
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.FECTH_ORDERS_START:
      return updatedObject(state, {loading: true});
    case actionTypes.FECTH_ORDERS_SUCCESS:
      return fecthOrdersSuccess(state, action);
    case actionTypes.FECTH_ORDERS_FAIL:
      return  updatedObject({loading: false});
    default:
      return state;
  }
};

export default reducer;