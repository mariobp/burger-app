import React from 'react';
import imgLogo from '../../../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{ height: props.height }}>
    <img alt="logo" src={imgLogo}/>
  </div>
);

export default logo;