import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../Nav/Nav';
import logo from '../../img/logo.svg';

import style from './Header.module.scss';

const Header = ({ title, className }) => (
  <header className={`${className} ${style.component}`}>
    <div className={style.navContainer}>
      <div className={style.navBarBrandContainer}>
        <img src={logo} alt="NCBC Logo" className={style.logo} />
        <Link className={style.navBarBrand} to="/">{title}</Link>
      </div>
      <Nav />
    </div>
  </header>
);

Header.defaultProps = {
  className: undefined,
  title: 'New Covenant Baptist Church'
};

Header.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

export default Header;
