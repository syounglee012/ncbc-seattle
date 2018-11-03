import React from 'react';
import Link from 'gatsby-link';

import style from './Nav.module.scss';

const Nav = () => (
  <nav className={style.component}>
    <ul>
      <li>
        <Link to="/about/">About</Link>
      </li>
      <li>
        <Link to="/ministries/">Ministries</Link>
      </li>
      <li>
        <Link to="/devotional/">Devotional</Link>
      </li>
      <li>
        <Link to="/location/">Location</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;