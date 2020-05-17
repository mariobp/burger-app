import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect, useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

const initialState = {
  purchasing: false,
  loading: false,
  error: false,
};

export const BurgerBuilder = props => {
  const [builderState, setBuilderState] = useState(initialState);

  const dispatch = useDispatch();
  const onIngredientRemoved = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
  const onIngredientAdded = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
  const onInitIngredient = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthenticationPath = (path) => dispatch(actions.setAuthRedirectPath(path));
  
    
  const buildState = useSelector(state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }));

  const { ings, price, error, isAuthenticated } = buildState;

  useEffect(() => {
    onInitIngredient();
  }, [onInitIngredient]);


  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(idKey => {
        return ingredients[idKey]; 
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setBuilderState(prevState => ({ ...prevState, purchasing: true }));
    } else {
      onSetAuthenticationPath('/checkout');
      props.history.push('/auth');
    };
  };

  const purchaseCancelHandler = () => {
    setBuilderState(prevState => ({ ...prevState, purchasing: false }));
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push( '/checkout');
  };

  const disabledInfo = {
    ...ings
  };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary =  null;
  if (builderState.loading) {
    orderSummary = <Spinner />
  }
  let burger = error ? <p>Ingredients can't be loaded.</p>: <Spinner />;

  if (ings) {
    burger =  (
      <Aux>
        <Burger ingredients={ings}/>
        <BuildControls 
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          price={price}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}/>
      </Aux>
    );

    orderSummary = (
      <OrderSummary
      ingredients={ings}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={price}/>
    );
  }
  return (
    <Aux>
      <Modal show={builderState.purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  )
}


export default withErrorHandler(BurgerBuilder, axios);