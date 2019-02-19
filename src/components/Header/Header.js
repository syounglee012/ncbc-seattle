import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../Nav/Nav';
import Logo from '../../img/svg/logo.svg';

import styles from './Header.module.scss';

const Header = ({ className }) => (
  <header className={`${styles.component} ${className}`.trim()}>
    <div className={styles.navContainer}>
      <div className={styles.brandContainer}>
        <Link className={styles.brand} to="/">
          <Logo className={styles.logo} />
          <span className={styles.brandName}>New Covenant Baptist Church</span>
        </Link>
      </div>
      <Nav />
    </div>
  </header>
);

Header.defaultProps = {
  className: ''
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
