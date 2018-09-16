import React from 'react';
import Link from 'gatsby-link';

import style from './Nav.scss';

const Nav = () => (
  <nav>
    <ul className={style.navItems}>
      <li className={style.navItem}>
        <Link to="/">Home</Link>
      </li>
      <li className={style.navItem}>
        <Link to="/about/">About</Link>
      </li>
      <li className={style.navItem}>
        <Link to="/ministries/">Ministries</Link>
      </li>
      <li className={style.navItem}>
        <Link to="/devotional/">Devotional</Link>
      </li>
      <li className={style.navItem}>
        <Link to="/directions/">Directions</Link>
      </li>
      <li className={style.navItem}>
        <Link to="/contact/">Contact</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;