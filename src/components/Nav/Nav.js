import React from 'react';
import Link from 'gatsby-link';

import styles from './Nav.module.scss';

const Nav = () => (
  <div className={styles.component}>
    <button className={styles.linkToggle} aria-label="Nav">
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
      <span className={styles.hamburgerLine} />
    </button>
    <nav>
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
  </div>
);

export default Nav;
