import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../Nav/Nav';
import logo from '../../img/logo.svg';

import styles from './Header.module.scss';

const Header = ({ siteTitle }) => (
  <header className={styles.component}>
    <div className={styles.navBarBrandContainer}>
      <img src={logo} alt="NCBC Logo" className={styles.logo} />
      <Link className={styles.navBarBrand} to="/">{siteTitle}</Link>
    </div>
    <Nav />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
};

export default Header;
