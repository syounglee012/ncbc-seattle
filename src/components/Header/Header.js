import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../Nav/Nav';

import styles from './Header.module.scss';

const Header = ({ siteTitle }) => (
  <header className={styles.component}>
    <Link to="/">{siteTitle}</Link>
    <Nav />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
};

export default Header;
