import React from 'react';
import Styles from './MenuToggle.module.css';
const MenuToggle = (props) => {
  const cls = [Styles.menuToggle, 'fa'];
  if (props.isOpen) {
    cls.push('fa-times');
    cls.push(Styles.open);
  } else {
    cls.push('fa-bars');
  }
  return <i className={cls.join(' ')} onClick={props.onToggle}></i>;
};

export default MenuToggle;
