import React from 'react';
import classes from './Input.css';

const Options = (props) => (
  props.config.map((option, index) => {
    return <option key={index} value={option.value}>{option.displayValue}</option>;
  })
);

const defineClasses = (props) => {
  const inputClases = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClases.push(classes.Invalid);
  }
  return inputClases.join(' ');
};

const input = (props) => {
  let inputElement = null;
  const inputClases = defineClasses(props);

  switch (props.elementType) {
    case 'input':
      inputElement = <input
        className={inputClases}
        onChange={props.changed}
        value={props.value}
        {...props.elementConfig}/>;
      break;
    case 'textarea':
      inputElement = <textarea
      className={inputClases}
      onChange={props.changed}
      value={props.value}
      {...props.elementConfig}/>
      break;
    case 'select':
      inputElement = (
        <select 
          className={inputClases}
          onChange={props.changed}
          value={props.value}>
            <Options config={props.elementConfig.options}/>
        </select>
      );
      break;
    default:
      inputElement = <input
      className={inputClases}
      onChange={props.changed}
      value={props.value}
      {...props.elementConfig}/>
      break;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;