import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
  ingredients:  null,
  totalPrice: 4,
  error: null,
  building: false,
};

const INGREDIENS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
}

const addIngredient = (state, action) => {
  const ingredients = {
    ...state.ingredients,
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const totalPrice = state.totalPrice + INGREDIENS_PRICES[action.ingredientName];
  return updatedObject(state, { ingredients, totalPrice, building: true });
};

const removeIngredient = (state, action) => {
  const ingredientsUpdated = {
    ...state.ingredients,
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
  };
  const totalPriceUpdated = state.totalPrice - INGREDIENS_PRICES[action.ingredientName];
  return updatedObject(state, { ingredients: ingredientsUpdated, totalPrice: totalPriceUpdated, building: true });
}

const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false
  });
};

const reduce = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FECTH_INGREDIENTS_FAIL:
        return updatedObject(state, {error: true});
    default:
      return state;
  }
}

export default reduce;