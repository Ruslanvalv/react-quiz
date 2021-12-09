import React from 'react';
import Styles from './Select.module.css';
const Select = (props) => {
  const htmlFor = `${props.label} - ${Math.random()}`;
  return (
    <div className={Styles.Select}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <select id={htmlFor} value={props.value} onChange={props.onChange}>
        {props.options.map((option, index) => {
          return (
            <option value={option.value} key={option.value + index}>
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
