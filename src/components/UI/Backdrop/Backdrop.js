import React from 'react';
import Styles from './Backdrop.module.css';
const Backdrop = (props) => <div className={Styles.Backdrop} onClick={props.onClick} />;

export default Backdrop;
