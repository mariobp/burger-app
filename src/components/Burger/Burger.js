import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformIngredient = Object.keys(props.ingredients)
    .map(idKey => {
      return [...Array(props.ingredients[idKey])].map((_,i) => {
        return <BurgerIngredient key={idKey + i} type={idKey} />
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformIngredient.length === 0) {
    transformIngredient = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformIngredient}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

export default burger;