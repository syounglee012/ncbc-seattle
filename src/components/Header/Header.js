import React from 'react';
import PropTypes from 'prop-types';
import Brand from '../Brand/Brand';
import Nav from '../Nav/Nav';

import style from './Header.module.scss';

const Header = ({ title, className }) => (
  <header className={`${className} ${style.component}`}>
    <div className={style.navContainer}>
      <Brand />
      <Nav />
    </div>
  </header>
);

Header.defaultProps = {
  className: undefined
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
