import React from 'react';
import Link from 'gatsby-link';

import styles from './Nav.module.scss';

const Nav = () => (
  <nav>
    <ul className={styles.navItems}>
      <li className={styles.navItem}>
        <Link to="/about/">About</Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/ministries/">Ministries</Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/devotional/">Devotional</Link>
      </li>
      <li className={styles.navItem}>
        <Link to="/location/">Location</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;