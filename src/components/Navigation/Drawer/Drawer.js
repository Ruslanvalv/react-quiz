import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Styles from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
const links = [
  { to: '/', label: 'Список', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать тест', exact: false },
];
class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={Styles.active}
            onClick={this.clickHandler}>
            {link.label}{' '}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    const cls = [Styles.Drawer];
    if (!this.props.isOpen) {
      cls.push(Styles.close);
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    );
  }
}
export default Drawer;
