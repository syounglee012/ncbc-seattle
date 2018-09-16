import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Nav from '../Nav/Nav';

import style from './Header.scss';

const Header = ({ siteTitle }) => (
  <header className={style.component}>
    <Link to="/">{siteTitle}</Link>
    <Nav />
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
};

export default Header;
