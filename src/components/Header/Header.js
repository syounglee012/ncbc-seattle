import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../Nav/Nav';
import logo from '../../img/svg/logo.svg';

import styles from './Header.module.scss';

const Header = ({ className }) => (
  <header className={`${className} ${styles.component}`}>
    <div className={styles.navContainer}>
      <div className={styles.brandContainer}>
        <img src={logo} alt="NCBC Logo" className={styles.logo} />
        <Link className={styles.brand} to="/">New Covenant Baptist Church</Link>
      </div>
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
