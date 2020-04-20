import React from 'react';
import Aux from '../../hoc/Auxiliary/auxiliary';
import Button from '../UI/Button/Button';

const orderSummary = (props) => {
  const style = { textTransform: 'capitalize' };
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(idKey => {
      return (
        <li key={idKey}>
          <span style={style}>{idKey}</span>: {props.ingredients[idKey]}
        </li>);
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;