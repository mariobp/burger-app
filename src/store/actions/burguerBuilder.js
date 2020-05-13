import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  }  
};


export const fecthIngredientsFail = () => {
  return {
    type: actionTypes.FECTH_INGREDIENTS_FAIL,
  }  
};

export const initIngredients = () => {
  return {
    type: actionTypes.FECTH_INGREDIENTS
  };
};